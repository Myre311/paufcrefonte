export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

const CATEGORY_LABELS = {
  match_highlights: 'Highlights',
  interviews: 'Interviews',
  training: 'Entrainement',
  behind_scenes: 'Coulisses',
  academy: 'Academie',
  other: 'Autre',
};

async function getVideos() {
  const rows = await prisma.video
    .findMany({ orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  return rows.map((v) => ({
    id: v.id,
    title: v.title,
    category: CATEGORY_LABELS[v.category] ?? v.category,
    provider: v.provider,
    publishedAt: v.publishedAt ? v.publishedAt.toISOString() : null,
    published: v.published,
  }));
}

export default async function VideosPage() {
  const rows = await getVideos();

  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'category', label: 'Categorie' },
    { key: 'provider', label: 'Source' },
    { key: 'publishedAt', label: 'Publie le', render: (v) => formatDate(v) },
    {
      key: 'published',
      label: 'Statut',
      render: (v) => (
        <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider ${v ? 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30' : 'bg-white/5 text-white/40 border border-white/10'}`}>
          {v ? 'Publie' : 'Brouillon'}
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Videos" subtitle={`${rows.length} video(s)`} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
