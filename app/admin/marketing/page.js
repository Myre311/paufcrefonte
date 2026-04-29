export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import KpiCard from '@/components/admin/KpiCard';
import { Mail, Tag, Newspaper } from 'lucide-react';

async function getMarketingKpis() {
  const now = new Date();

  const [newsletterTotal, activeCoupons, popularArticles] = await Promise.all([
    prisma.newsletterSubscriber.count({ where: { confirmedAt: { not: null }, unsubscribedAt: null } }).catch(() => 0),
    prisma.coupon.count({ where: { active: true, OR: [{ endsAt: null }, { endsAt: { gte: now } }] } }).catch(() => 0),
    prisma.article.count({ where: { publishedAt: { not: null }, featured: true } }).catch(() => 0),
  ]);

  return { newsletterTotal, activeCoupons, popularArticles };
}

export default async function MarketingPage() {
  const kpis = await getMarketingKpis();

  return (
    <>
      <PageHeader title="Marketing" subtitle="Vue agregee" />
      <div className="px-6 md:px-8 pb-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <KpiCard label="Abonnes newsletter actifs" value={kpis.newsletterTotal.toLocaleString('fr-FR')} icon={Mail} />
          <KpiCard label="Codes promo actifs" value={kpis.activeCoupons.toLocaleString('fr-FR')} icon={Tag} />
          <KpiCard label="Articles mis en avant" value={kpis.popularArticles.toLocaleString('fr-FR')} icon={Newspaper} />
        </div>

        <div className="bg-pau-primary border border-white/10 p-8 text-sm text-white/50">
          Campagnes et segments a venir.
        </div>
      </div>
    </>
  );
}
