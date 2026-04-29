import { prisma } from '@/lib/prisma';
import Hero from '@/components/home/Hero';
import MatchFeatured from '@/components/home/MatchFeatured';
import NewsListing from '@/components/home/NewsListing';
import BoutiqueTeaser from '@/components/home/BoutiqueTeaser';
import BilletterieTeaser from '@/components/home/BilletterieTeaser';
import PartnersTiers from '@/components/home/PartnersTiers';
import SocialBar from '@/components/home/SocialBar';
import NewsletterInline from '@/components/home/NewsletterInline';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Pau Football Club — Site officiel',
  description: 'Site officiel du Pau FC. Billetterie, boutique, actualites, equipe et calendrier. Ligue 2 BKT.',
};

function serializeMatch(match) {
  if (!match) return null;
  return {
    ...match,
    kickoffAt: match.kickoffAt.toISOString(),
    createdAt: match.createdAt.toISOString(),
    updatedAt: match.updatedAt.toISOString(),
  };
}

function serializeArticle(article) {
  return {
    ...article,
    publishedAt: article.publishedAt ? article.publishedAt.toISOString() : null,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };
}

export default async function HomePage() {
  const nextMatch = await prisma.match
    .findFirst({
      where: {
        isHome: true,
        kickoffAt: { gte: new Date() },
        status: { in: ['scheduled', 'live'] },
      },
      orderBy: { kickoffAt: 'asc' },
    })
    .catch(() => null);

  const featuredArticleRaw = await prisma.article
    .findFirst({
      where: { publishedAt: { not: null, lte: new Date() } },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    .catch(() => null);

  const articles = await prisma.article
    .findMany({
      where: { publishedAt: { not: null } },
      orderBy: { publishedAt: 'desc' },
      take: 6,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    .catch(() => []);

  const serializedMatch = serializeMatch(nextMatch);
  const serializedArticles = (articles || []).map(serializeArticle);
  const serializedFeaturedArticle = featuredArticleRaw ? serializeArticle(featuredArticleRaw) : null;

  return (
    <>
      <Hero featuredMatch={serializedMatch} featuredArticle={serializedFeaturedArticle} />
      <MatchFeatured match={serializedMatch} />
      <NewsListing articles={serializedArticles} />
      <BoutiqueTeaser />
      <BilletterieTeaser />
      <PartnersTiers />
      <SocialBar />
      <NewsletterInline />
    </>
  );
}
