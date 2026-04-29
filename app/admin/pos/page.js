export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import PosTerminal from '@/components/admin/PosTerminal';

async function getPosProducts() {
  const variants = await prisma.productVariant
    .findMany({
      include: {
        product: true,
        stockItem: true,
      },
      where: {
        product: { status: 'active' },
      },
      orderBy: { product: { name: 'asc' } },
    })
    .catch(() => []);

  return variants.map((v) => ({
    variantId: v.id,
    name: v.product.name,
    sku: v.sku,
    variantLabel: [v.size, v.color].filter(Boolean).join(' · ') || null,
    price: v.priceOverride ?? v.product.basePrice,
    image: v.product.images?.[0] ?? null,
    stock: v.stockItem?.onHand ?? 0,
  }));
}

export default async function PosPage() {
  const products = await getPosProducts();

  return (
    <>
      <PageHeader title="Point de vente" subtitle="Interface caisse" />
      <PosTerminal initialProducts={products} />
    </>
  );
}
