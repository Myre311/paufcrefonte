export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import KpiCard from '@/components/admin/KpiCard';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { ShoppingCart, TrendingUp, Users, Newspaper } from 'lucide-react';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR') + ' €';
}

function formatDate(d) {
  if (!d) return '-';
  return new Date(d).toLocaleDateString('fr-FR');
}

async function getKpis() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [orderCount, revenueAgg, newClients, publishedCount] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfMonth } } }).catch(() => 0),
    prisma.order
      .aggregate({ _sum: { total: true }, where: { createdAt: { gte: startOfMonth }, status: { in: ['paid', 'preparing', 'shipped', 'delivered'] } } })
      .catch(() => ({ _sum: { total: 0 } })),
    prisma.user.count({ where: { role: 'customer', createdAt: { gte: startOfMonth } } }).catch(() => 0),
    prisma.article.count({ where: { publishedAt: { not: null } } }).catch(() => 0),
  ]);

  return {
    orderCount,
    revenue: revenueAgg._sum.total ?? 0,
    newClients,
    publishedCount,
  };
}

async function getUpcomingMatches() {
  const rows = await prisma.match
    .findMany({
      where: { status: 'scheduled' },
      orderBy: { kickoffAt: 'asc' },
      take: 5,
    })
    .catch(() => []);

  return rows.map((m) => ({
    id: m.id,
    competition: m.competition,
    opponent: m.opponent,
    date: m.kickoffAt.toISOString(),
    lieu: m.isHome ? 'Domicile' : 'Exterieur',
    status: m.status,
  }));
}

async function getRecentOrders() {
  const rows = await prisma.order
    .findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
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

export default async function AdminDashboard() {
  const [kpis, matches, orders] = await Promise.all([
    getKpis(),
    getUpcomingMatches(),
    getRecentOrders(),
  ]);

  const matchColumns = [
    { key: 'competition', label: 'Competition' },
    { key: 'opponent', label: 'Adversaire' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'lieu', label: 'Lieu' },
    {
      key: 'status',
      label: 'Statut',
      render: (v) => <StatusBadge status={v} />,
    },
  ];

  const orderColumns = [
    { key: 'number', label: 'Numero' },
    { key: 'date', label: 'Date', render: (v) => formatDate(v) },
    { key: 'client', label: 'Client' },
    { key: 'items', label: 'Articles' },
    { key: 'total', label: 'Total', render: (v) => formatPrice(v) },
    {
      key: 'status',
      label: 'Statut',
      render: (v) => <StatusBadge status={v} />,
    },
  ];

  return (
    <>
      <PageHeader title="Tableau de bord" subtitle="Vue d'ensemble de l'activite ce mois-ci" />

      <div className="px-6 md:px-8 pb-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <KpiCard
            label="Commandes ce mois"
            value={kpis.orderCount.toLocaleString('fr-FR')}
            icon={ShoppingCart}
          />
          <KpiCard
            label="CA ce mois"
            value={formatPrice(kpis.revenue)}
            icon={TrendingUp}
          />
          <KpiCard
            label="Nouveaux clients"
            value={kpis.newClients.toLocaleString('fr-FR')}
            icon={Users}
          />
          <KpiCard
            label="Articles publies"
            value={kpis.publishedCount.toLocaleString('fr-FR')}
            icon={Newspaper}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <section aria-labelledby="section-matches">
            <h2 id="section-matches" className="text-xs uppercase tracking-widest text-white/40 px-4 pb-3">
              Prochains matchs
            </h2>
            <div className="bg-pau-primary border border-white/10">
              <DataTable columns={matchColumns} rows={matches} />
            </div>
          </section>

          <section aria-labelledby="section-orders">
            <h2 id="section-orders" className="text-xs uppercase tracking-widest text-white/40 px-4 pb-3">
              Commandes recentes
            </h2>
            <div className="bg-pau-primary border border-white/10">
              <DataTable columns={orderColumns} rows={orders} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
