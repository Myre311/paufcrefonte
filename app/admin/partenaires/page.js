export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

const TIER_LABELS = {
  premium: 'Principal',
  officiel: 'Officiel',
  local: 'Local',
};

const TIER_CLASSES = {
  premium: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
  officiel: 'bg-white/10 text-white/80 border border-white/20',
  local: 'bg-white/5 text-white/50 border border-white/10',
};

async function getPartners() {
  const rows = await prisma.partner
    .findMany({ orderBy: [{ tier: 'asc' }, { position: 'asc' }] })
    .catch(() => []);

  return rows.map((p) => ({
    id: p.id,
    name: p.name,
    tier: p.tier,
    website: p.websiteUrl ?? '-',
    active: p.active,
  }));
}

export default async function PartenairesPage() {
  const rows = await getPartners();

  const columns = [
    { key: 'name', label: 'Partenaire' },
    {
      key: 'tier',
      label: 'Tier',
      render: (v) => (
        <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider ${TIER_CLASSES[v] ?? 'bg-white/5 text-white/40 border border-white/10'}`}>
          {TIER_LABELS[v] ?? v}
        </span>
      ),
    },
    { key: 'website', label: 'Site web' },
    {
      key: 'active',
      label: 'Statut',
      render: (v) => (
        <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider ${v ? 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          {v ? 'Actif' : 'Inactif'}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Partenaires" subtitle={`${rows.length} partenaires`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
