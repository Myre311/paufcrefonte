export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

async function getMatches() {
  const rows = await prisma.match
    .findMany({ orderBy: { kickoffAt: 'desc' } })
    .catch(() => []);

  return rows.map((m) => ({
    id: m.id,
    competition: m.competition,
    opponent: m.opponent,
    date: m.kickoffAt.toISOString(),
    lieu: m.isHome ? 'Domicile' : 'Exterieur',
    score: m.homeScore !== null && m.awayScore !== null ? `${m.homeScore} - ${m.awayScore}` : '-',
    status: m.status,
  }));
}

export default async function MatchsPage() {
  const rows = await getMatches();

  const columns = [
    { key: 'competition', label: 'Competition' },
    { key: 'opponent', label: 'Adversaire' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'lieu', label: 'Lieu' },
    { key: 'score', label: 'Score' },
    { key: 'status', label: 'Statut', render: (v) => <StatusBadge status={v} /> },
  ];

  const cta = (
    <Link
      href="/admin/matchs/nouveau"
      className="bg-pau-yellow text-pau-night text-sm font-medium px-4 py-2 hover:bg-pau-yellow/90 transition-colors"
    >
      + Nouveau
    </Link>
  );

  return (
    <>
      <PageHeader title="Matchs" subtitle={`${rows.length} matchs`} actions={cta} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
