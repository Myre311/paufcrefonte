import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';

const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function formatArticleDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

function ArticleCard({ article }) {
  return (
    <article>
      <Link href={`/actualites/${article.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-pau-primary mb-4">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:opacity-80 transition-opacity duration-200"
            />
          ) : (
            <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
          )}
        </div>
        <div>
          {article.publishedAt && (
            <p className="text-xs font-sans uppercase tracking-widest text-pau-night/40 mb-2">
              {formatArticleDate(article.publishedAt)}
            </p>
          )}
          <h3 className="font-sans font-semibold uppercase tracking-wider text-pau-night mb-2 leading-tight">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="text-sm font-sans text-pau-night/60 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function NewsListing({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-pau-white" aria-label="Actualités">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-2">
              DERNIÈRES NOUVELLES
            </p>
            <h2 className="font-display uppercase text-3xl md:text-4xl text-pau-night leading-tight">
              ACTUALITÉS
            </h2>
          </div>
          <Link
            href="/actualites"
            className="text-sm font-sans text-pau-night/50 hover:text-pau-night transition-colors duration-200 uppercase tracking-wider shrink-0"
            aria-label="Voir toutes les actualités"
          >
            Toutes les actus →
          </Link>
        </div>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
