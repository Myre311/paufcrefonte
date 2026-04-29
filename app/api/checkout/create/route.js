import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const itemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().nullable().optional(),
  name: z.string().min(1),
  unitPriceCents: z.number().int().positive(),
  quantity: z.number().int().min(1).max(10),
  customizationId: z.string().nullable().optional(),
  customizationLabel: z.string().nullable().optional(),
});

const shippingSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  country: z.enum(['FR', 'BE', 'CH']),
  phone: z.string().min(1),
});

const bodySchema = z.object({
  items: z.array(itemSchema).min(1),
  coupon: z
    .object({
      code: z.string(),
      discountCents: z.number().int().nonnegative(),
    })
    .nullable()
    .optional(),
  shipping: shippingSchema,
});

function generateOrderNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 900000) + 100000;
  return `PAU-${year}-${rand}`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: 'Corps de requête invalide.' },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: 'Données invalides.', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { items, coupon, shipping } = parsed.data;

  const subtotal = items.reduce((acc, i) => acc + i.unitPriceCents * i.quantity, 0);
  const discountTotal = coupon?.discountCents ?? 0;
  const total = Math.max(0, subtotal - discountTotal);

  const shippingAddress = {
    firstName: shipping.firstName,
    lastName: shipping.lastName,
    line1: shipping.address,
    postalCode: shipping.postalCode,
    city: shipping.city,
    country: shipping.country,
    phone: shipping.phone,
  };

  let orderNumber = generateOrderNumber();

  try {
    const existing = await prisma.order
      .findUnique({ where: { number: orderNumber } })
      .catch(() => null);
    if (existing) {
      orderNumber = generateOrderNumber();
    }
  } catch {
    // non-fatal
  }

  try {
    // Resolve valid variantIds against the DB — items with unknown variants
    // (e.g. jersey-home demo IDs) are attached as metadata-only (no FK row).
    const variantIds = items
      .map((i) => i.variantId)
      .filter((id) => typeof id === 'string' && id.length > 0);

    const existingVariants = variantIds.length
      ? await prisma.productVariant
          .findMany({ where: { id: { in: variantIds } }, select: { id: true } })
          .catch(() => [])
      : [];

    const validVariantSet = new Set(existingVariants.map((v) => v.id));

    // Only create OrderItem rows when the variantId exists in DB
    const validItems = items.filter(
      (i) => i.variantId && validVariantSet.has(i.variantId)
    );

    const order = await prisma.order.create({
      data: {
        number: orderNumber,
        guestEmail: shipping.email,
        status: 'pending',
        subtotal,
        shippingCost: 0,
        discountTotal,
        taxTotal: 0,
        total,
        currency: 'EUR',
        shippingAddress,
        billingAddress: shippingAddress,
        couponCode: coupon?.code ?? null,
        ...(validItems.length > 0
          ? {
              items: {
                create: validItems.map((item) => {
                  const row = {
                    variantId: item.variantId,
                    productName: item.name,
                    variantLabel: item.customizationLabel ?? null,
                    unitPrice: item.unitPriceCents,
                    quantity: item.quantity,
                  };
                  // Only attach customizationId if it looks like a real cuid (not demo-)
                  if (
                    item.customizationId &&
                    !item.customizationId.startsWith('demo-')
                  ) {
                    return { ...row, customizationId: item.customizationId };
                  }
                  return row;
                }),
              },
            }
          : {}),
      },
    });

    return Response.json({ ok: true, orderNumber: order.number });
  } catch (err) {
    console.error('[api/checkout/create] error:', err);
    return Response.json(
      { ok: false, error: 'Erreur lors de la création de la commande. Réessaie.' },
      { status: 500 }
    );
  }
}
