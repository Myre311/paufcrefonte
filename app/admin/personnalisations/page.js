export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getCustomizations() {
  const rows = await prisma.jerseyCustomization
    .findMany({
      include: {
        orderItem: { include: { order: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return rows.map((c) => ({
    id: c.id,
    date: c.createdAt.toISOString(),
    orderNumber: c.orderItem?.order?.number ?? '-',
    name: c.name ?? '-',
    number: c.number ?? '-',
    font: c.font,
    status: c.orderItem?.order?.status ?? 'pending',
  }));
}

export default async function PersonnalisationsPage() {
  const rows = await getCustomizations();

  const columns = [
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'orderNumber', label: 'Commande' },
    { key: 'name', label: 'Nom flocage' },
    { key: 'number', label: 'Numero' },
    { key: 'font', label: 'Police' },
    { key: 'status', label: 'Statut', render: (v) => <StatusBadge status={v} /> },
  ];

  return (
    <>
      <PageHeader title="Personnalisations" subtitle="Maillots a floquer" />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
