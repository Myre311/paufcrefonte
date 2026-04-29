export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

function formatValue(type, value) {
  if (type === 'percent') return `${value} %`;
  return (value / 100).toLocaleString('fr-FR') + ' €';
}

async function getCoupons() {
  const rows = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);

  return rows.map((c) => ({
    id: c.id,
    code: c.code,
    type: c.type,
    value: formatValue(c.type, c.value),
    uses: `${c.usesCount}${c.maxUses ? ' / ' + c.maxUses : ''}`,
    startsAt: c.startsAt ? c.startsAt.toISOString() : null,
    endsAt: c.endsAt ? c.endsAt.toISOString() : null,
    active: c.active ? 'Actif' : 'Inactif',
  }));
}

export default async function CodesPromoPage() {
  const rows = await getCoupons();

  const columns = [
    { key: 'code', label: 'Code' },
    { key: 'value', label: 'Remise' },
    { key: 'uses', label: 'Utilisations' },
    { key: 'startsAt', label: 'Debut', render: (v) => formatDate(v) },
    { key: 'endsAt', label: 'Fin', render: (v) => formatDate(v) },
    {
      key: 'active',
      label: 'Statut',
      render: (v) => (
        <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider ${v === 'Actif' ? 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          {v}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Codes promo" subtitle={`${rows.length} coupon(s)`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
