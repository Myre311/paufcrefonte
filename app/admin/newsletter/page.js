export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import KpiCard from '@/components/admin/KpiCard';
import DataTable from '@/components/admin/DataTable';
import { Mail } from 'lucide-react';

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getNewsletterData() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, confirmed, unsubscribedThisMonth, subscribers] = await Promise.all([
    prisma.newsletterSubscriber.count().catch(() => 0),
    prisma.newsletterSubscriber.count({ where: { confirmedAt: { not: null }, unsubscribedAt: null } }).catch(() => 0),
    prisma.newsletterSubscriber.count({ where: { unsubscribedAt: { gte: startOfMonth } } }).catch(() => 0),
    prisma.newsletterSubscriber
      .findMany({ orderBy: { createdAt: 'desc' } })
      .catch(() => []),
  ]);

  const rows = subscribers.map((s) => ({
    id: s.id,
    email: s.email,
    source: s.source ?? '-',
    confirmedAt: s.confirmedAt ? s.confirmedAt.toISOString() : null,
    unsubscribedAt: s.unsubscribedAt ? s.unsubscribedAt.toISOString() : null,
    status: s.unsubscribedAt ? 'cancelled' : s.confirmedAt ? 'active' : 'pending',
  }));

  return { total, confirmed, unsubscribedThisMonth, rows };
}

export default async function NewsletterPage() {
  const { total, confirmed, unsubscribedThisMonth, rows } = await getNewsletterData();

  const columns = [
    { key: 'email', label: 'Email' },
    { key: 'source', label: 'Source' },
    { key: 'confirmedAt', label: 'Confirme le', render: (v) => formatDate(v) },
    {
      key: 'status',
      label: 'Statut',
      render: (v) => {
        const map = {
          active: 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30',
          pending: 'bg-white/10 text-white/80 border border-white/20',
          cancelled: 'bg-red-500/15 text-red-400 border border-red-500/30',
        };
        const labels = { active: 'Confirme', pending: 'En attente', cancelled: 'Desinscrit' };
        return (
          <span className={`inline-block px-2 py-0.5 text-xs uppercase tracking-wider ${map[v] ?? ''}`}>
            {labels[v] ?? v}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <PageHeader title="Newsletter" subtitle="Gestion des abonnes" />
      <div className="px-6 md:px-8 pb-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard label="Total abonnes" value={total.toLocaleString('fr-FR')} icon={Mail} />
          <KpiCard label="Abonnes actifs" value={confirmed.toLocaleString('fr-FR')} icon={Mail} />
          <KpiCard label="Desinscrits ce mois" value={unsubscribedThisMonth.toLocaleString('fr-FR')} />
        </div>

        <div className="bg-pau-primary border border-white/10">
          <DataTable columns={columns} rows={rows} />
        </div>
      </div>
    </>
  );
}
