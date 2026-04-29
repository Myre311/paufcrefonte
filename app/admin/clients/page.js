export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getClients() {
  const rows = await prisma.user
    .findMany({
      where: { role: 'customer' },
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  return rows.map((u) => ({
    id: u.id,
    name: [u.firstName, u.lastName].filter(Boolean).join(' ') || '-',
    email: u.email,
    orders: u._count.orders,
    createdAt: u.createdAt.toISOString(),
  }));
}

export default async function ClientsPage() {
  const rows = await getClients();

  const columns = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'orders', label: 'Commandes' },
    { key: 'createdAt', label: 'Inscrit le', render: (v) => formatDate(v) },
    {
      key: 'id',
      label: '',
      render: (v) => (
        <Link href={`/admin/clients/${v}`} className="text-xs text-white/50 hover:text-pau-yellow underline">
          Voir
        </Link>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Clients" subtitle={`${rows.length} clients`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
