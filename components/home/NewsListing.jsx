import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';

const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

function formatArticleDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

function HeroCard({ article }) {
  return (
    <article className="md:col-span-2">
      <Link href={`/actualites/${article.slug}`} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden bg-pau-primary mb-5">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
          )}
        </div>
        <div>
          {article.category && (
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-pau-night/50 mb-2">
              {article.category}
            </p>
          )}
          <h3 className="font-display uppercase text-pau-night leading-tight mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            {article.title}
          </h3>
          {article.publishedAt && (
            <p className="font-display text-2xl text-pau-night/30 leading-none">
              {formatArticleDate(article.publishedAt)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

function SmallCard({ article }) {
  return (
    <article>
      <Link href={`/actualites/${article.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-pau-primary mb-3">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
          )}
        </div>
        <div>
          {article.category && (
            <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-night/50 mb-1.5">
              {article.category}
            </p>
          )}
          <h3 className="font-sans font-semibold uppercase tracking-wide text-pau-night text-sm leading-tight mb-2">
            {article.title}
          </h3>
          {article.publishedAt && (
            <p className="font-display text-xl text-pau-night/25 leading-none">
              {formatArticleDate(article.publishedAt)}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function NewsListing({ articles }) {
  if (!articles || articles.length === 0) return null;

  const [hero, ...rest] = articles;
  const small = rest.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-pau-white border-t border-pau-night/10" aria-label="Actualités">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-10 pb-6 border-b border-pau-night/10">
          <div>
            <p className="text-[11px] font-sans uppercase tracking-[0.25em] text-pau-night/50 mb-2">
              DERNIÈRES NOUVELLES
            </p>
            <h2 className="font-display uppercase text-3xl md:text-5xl text-pau-night leading-tight">
              ACTUALITÉS
            </h2>
          </div>
          <Link
            href="/actualites"
            className="text-xs font-sans text-pau-night/50 hover:text-pau-night transition-colors duration-200 uppercase tracking-wider shrink-0"
            aria-label="Voir toutes les actualités"
          >
            Toutes les actus →
          </Link>
        </div>

        <Reveal>
          {/* Hero card row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 mb-8">
            {hero && <HeroCard article={hero} />}
            {small.slice(0, 1).map((a) => (
              <SmallCard key={a.id} article={a} />
            ))}
          </div>

          {/* Border separator */}
          {small.length > 1 && <div className="border-t border-pau-night/10 mb-8" />}

          {/* 3 small cards row */}
          {small.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
              {small.slice(1, 4).map((a) => (
                <SmallCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
