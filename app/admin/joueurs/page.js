export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

const POSITION_LABELS = {
  goalkeeper: 'Gardien',
  defender: 'Defenseur',
  midfielder: 'Milieu',
  forward: 'Attaquant',
};

async function getPlayers() {
  const rows = await prisma.player
    .findMany({ orderBy: [{ position: 'asc' }, { displayOrder: 'asc' }] })
    .catch(() => []);

  return rows.map((p) => ({
    id: p.id,
    photo: p.photoUrl,
    name: `${p.firstName} ${p.lastName}`,
    number: p.shirtNumber ?? '-',
    position: POSITION_LABELS[p.position] ?? p.role,
    active: p.active,
  }));
}

export default async function JoueursPage() {
  const rows = await getPlayers();

  const columns = [
    {
      key: 'photo',
      label: '',
      render: (v, row) =>
        v ? (
          <img src={v} alt={row.name} width={36} height={36} className="w-9 h-9 object-cover bg-white/5" />
        ) : (
          <div className="w-9 h-9 bg-white/5" aria-hidden="true" />
        ),
    },
    { key: 'number', label: 'N' },
    { key: 'name', label: 'Joueur' },
    { key: 'position', label: 'Poste' },
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

  const cta = (
    <Link
      href="/admin/joueurs/nouveau"
      className="bg-pau-yellow text-pau-night text-sm font-medium px-4 py-2 hover:bg-pau-yellow/90 transition-colors"
    >
      + Nouveau
    </Link>
  );

  return (
    <>
      <PageHeader title="Joueurs" subtitle={`${rows.length} joueurs`} actions={cta} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
