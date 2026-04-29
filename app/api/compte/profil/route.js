import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getSupabaseServer } from '@/lib/supabase/server';

const schema = z.object({
  firstName: z.string().min(1, 'Prenom requis.'),
  lastName: z.string().min(1, 'Nom requis.'),
  phone: z.string().optional(),
  line1: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional().default('FR'),
});

export async function POST(request) {
  let supabase;
  try {
    supabase = await getSupabaseServer();
  } catch {
    return Response.json({ ok: false, error: 'Non autorise.' }, { status: 401 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ ok: false, error: 'Non autorise.' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Corps de requete invalide.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { firstName, lastName, phone, line1, postalCode, city, country } = parsed.data;

  try {
    const dbUser = await prisma.user.upsert({
      where: { authUserId: user.id },
      update: {
        firstName,
        lastName,
        phone: phone ?? null,
      },
      create: {
        authUserId: user.id,
        email: user.email,
        firstName,
        lastName,
        phone: phone ?? null,
      },
    });

    if (line1 || postalCode || city) {
      await prisma.address.upsert({
        where: {
          id: (
            await prisma.address.findFirst({
              where: { userId: dbUser.id, type: 'shipping', isDefault: true },
              select: { id: true },
            })
          )?.id ?? 'no-match',
        },
        update: {
          line1: line1 ?? '',
          postalCode: postalCode ?? '',
          city: city ?? '',
          country: country ?? 'FR',
        },
        create: {
          userId: dbUser.id,
          type: 'shipping',
          firstName,
          lastName,
          line1: line1 ?? '',
          postalCode: postalCode ?? '',
          city: city ?? '',
          country: country ?? 'FR',
          isDefault: true,
        },
      });
    }

    return Response.json({ ok: true, user: { id: dbUser.id, firstName, lastName } });
  } catch (err) {
    console.error('[api/compte/profil] error:', err);
    return Response.json({ ok: false, error: 'Erreur interne.' }, { status: 500 });
  }
}
