import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import ArticleCard from '@/components/cards/ArticleCard';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Actualités — Pau Football Club',
  description: 'Toute l\'actualité du Pau FC : matchs, transferts, club et fondation.',
};

export default async function ActualitesPage() {
  const articles = await prisma.article
    .findMany({
      where: {
        publishedAt: { lte: new Date(), not: null },
      },
      orderBy: { publishedAt: 'desc' },
      take: 12,
    })
    .catch(() => []);

  const serialized = articles.map((a) => ({
    ...a,
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const [featured, ...rest] = serialized;

  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-actualites.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            JOURNAL DU CLUB
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            ACTUALITÉS
          </h1>
        </div>
      </section>

      {serialized.length === 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
            <p className="text-2xl text-pau-night/40 uppercase font-display">
              AUCUN ARTICLE PUBLIÉ
            </p>
          </div>
        </section>
      )}

      {featured && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <Reveal>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <ArticleCard article={featured} featured />
          </div>
          </Reveal>
        </section>
      )}

      {rest.length > 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <Reveal>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          </Reveal>
        </section>
      )}
    </>
  );
}
