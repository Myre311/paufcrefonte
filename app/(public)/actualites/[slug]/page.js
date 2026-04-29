import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ArticleCard from '@/components/cards/ArticleCard';

export const dynamic = 'force-dynamic';

const CATEGORY_LABELS = {
  matchday: 'Match',
  club: 'Club',
  transfer: 'Transfert',
  foundation: 'Fondation',
  other: 'Actualité',
};

function formatDate(iso) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export async function generateMetadata({ params }) {
  const article = await prisma.article
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null);
  if (!article) return { title: 'Article introuvable — Pau FC' };
  return {
    title: `${article.title} — Pau FC`,
    description: article.excerpt?.slice(0, 155),
    openGraph: article.coverImageUrl
      ? { images: [{ url: article.coverImageUrl }] }
      : undefined,
  };
}

export default async function ArticlePage({ params }) {
  const article = await prisma.article
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null);

  if (!article || !article.publishedAt) notFound();

  const related = await prisma.article
    .findMany({
      where: {
        category: article.category,
        publishedAt: { lte: new Date(), not: null },
        slug: { not: params.slug },
      },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    })
    .catch(() => []);

  const serializedRelated = related.map((a) => ({
    ...a,
    publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const categoryLabel = CATEGORY_LABELS[article.category] ?? 'Actualité';

  return (
    <>
      <section className="relative bg-pau-white border-b border-pau-night/10 py-12 md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 w-full">
          <span className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 block font-sans">
            {categoryLabel}
          </span>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-night max-w-4xl leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-6 text-xs text-pau-night/50 uppercase tracking-wider">
            {article.publishedAt && (
              <time dateTime={article.publishedAt.toISOString()}>
                {formatDate(article.publishedAt)}
              </time>
            )}
            <span>{article.author}</span>
          </div>
          {article.coverImageUrl && (
            <div className="relative aspect-[16/9] mt-8 overflow-hidden">
              <Image
                src={article.coverImageUrl}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
                priority
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10">
        <div
          className="prose prose-sm max-w-3xl mx-auto px-6 py-16"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </section>

      {serializedRelated.length > 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <h2 className="font-display text-3xl uppercase text-pau-night mb-12">
              À LIRE AUSSI
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-16">
              {serializedRelated.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
