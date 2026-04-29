export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR') + ' €';
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getOrders() {
  const rows = await prisma.order
    .findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return rows.map((o) => ({
    id: o.id,
    number: o.number,
    date: o.createdAt.toISOString(),
    client: o.user?.email ?? o.guestEmail ?? '-',
    items: o.items.length,
    total: o.total,
    status: o.status,
  }));
}

export default async function CommandesPage() {
  const orders = await getOrders();

  const columns = [
    { key: 'number', label: 'Numero' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'client', label: 'Client' },
    { key: 'items', label: 'Articles' },
    { key: 'total', label: 'Total', render: (v) => formatPrice(v) },
    { key: 'status', label: 'Statut', render: (v) => <StatusBadge status={v} /> },
    {
      key: 'id',
      label: '',
      render: (_v, row) => (
        <Link href={`/admin/commandes/${row.number}`} className="text-xs text-white/50 hover:text-pau-yellow underline">
          Voir
        </Link>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Commandes" subtitle={`${orders.length} commandes`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={orders} />
        </div>
      </div>
    </>
  );
}
