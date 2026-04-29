export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR') + ' €';
}

async function getProducts() {
  const rows = await prisma.product
    .findMany({
      include: {
        category: true,
        variants: { include: { stockItem: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return rows.map((p) => ({
    id: p.id,
    image: p.images?.[0] ?? null,
    name: p.name,
    category: p.category?.name ?? '-',
    price: p.basePrice,
    stock: p.variants.reduce((sum, v) => sum + (v.stockItem?.onHand ?? 0), 0),
    status: p.status,
  }));
}

export default async function ProduitsPage() {
  const products = await getProducts();

  const columns = [
    {
      key: 'image',
      label: '',
      render: (v) =>
        v ? (
          <img src={v} alt="" width={40} height={40} className="w-10 h-10 object-cover bg-white/5" />
        ) : (
          <div className="w-10 h-10 bg-white/5" aria-hidden="true" />
        ),
    },
    { key: 'name', label: 'Produit' },
    { key: 'category', label: 'Categorie' },
    { key: 'price', label: 'Prix', render: (v) => formatPrice(v) },
    { key: 'stock', label: 'Stock total' },
    { key: 'status', label: 'Statut', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'id',
      label: '',
      render: (v) => (
        <Link href={`/admin/produits/${v}`} className="text-xs text-white/50 hover:text-pau-yellow underline">
          Voir
        </Link>
      ),
    },
  ];

  const cta = (
    <Link
      href="/admin/produits/nouveau"
      className="bg-pau-yellow text-pau-night text-sm font-medium px-4 py-2 hover:bg-pau-yellow/90 transition-colors"
    >
      + Nouveau produit
    </Link>
  );

  return (
    <>
      <PageHeader title="Produits" subtitle={`${products.length} produits`} actions={cta} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={products} />
        </div>
      </div>
    </>
  );
}
