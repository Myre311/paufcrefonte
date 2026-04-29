export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getArticles() {
  const rows = await prisma.article
    .findMany({ orderBy: { createdAt: 'desc' } })
    .catch(() => []);

  return rows.map((a) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    author: a.author,
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    status: a.publishedAt ? 'published' : 'pending',
  }));
}

export default async function ActualitesPage() {
  const rows = await getArticles();

  const columns = [
    { key: 'title', label: 'Titre' },
    { key: 'category', label: 'Categorie' },
    { key: 'author', label: 'Auteur' },
    { key: 'publishedAt', label: 'Publie le', render: (v) => formatDate(v) },
    { key: 'status', label: 'Statut', render: (v) => <StatusBadge status={v} /> },
  ];

  const cta = (
    <Link
      href="/admin/actualites/nouveau"
      className="bg-pau-yellow text-pau-night text-sm font-medium px-4 py-2 hover:bg-pau-yellow/90 transition-colors"
    >
      + Nouvel article
    </Link>
  );

  return (
    <>
      <PageHeader title="Actualites" subtitle={`${rows.length} articles`} actions={cta} />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
