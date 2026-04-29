import Image from 'next/image';
import Link from 'next/link';

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

export default function ArticleCard({ article, featured = false }) {
  const { slug, title, excerpt, coverImageUrl, category, publishedAt } = article;
  const categoryLabel = CATEGORY_LABELS[category] ?? 'Actualité';

  if (featured) {
    return (
      <article className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-pau-night">
        <div className="relative aspect-[16/10] overflow-hidden bg-pau-primary">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:opacity-80 transition-opacity duration-300"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col justify-center px-8 md:px-12 py-8">
          <span className="text-xs uppercase tracking-widest text-pau-yellow mb-4">
            {categoryLabel}
          </span>
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="text-xs text-white/40 uppercase tracking-wider mb-3"
            >
              {formatDate(publishedAt)}
            </time>
          )}
          <h2 className="font-sans font-semibold text-xl md:text-2xl text-pau-white uppercase leading-tight mb-3">
            {title}
          </h2>
          <p className="text-sm text-white/70 line-clamp-3 mb-6">{excerpt}</p>
          <Link
            href={`/actualites/${slug}`}
            className="text-sm uppercase tracking-widest text-pau-white underline hover:opacity-80 transition-opacity duration-200 self-start"
          >
            LIRE L'ARTICLE &rarr;
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/actualites/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-pau-primary mb-4">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
          )}
        </div>
        <div>
          {publishedAt && (
            <time
              dateTime={publishedAt}
              className="text-xs text-pau-night/40 uppercase tracking-wider"
            >
              {formatDate(publishedAt)}
            </time>
          )}
          <h3 className="font-sans font-semibold text-base uppercase text-pau-night mt-2 mb-2 leading-snug group-hover:opacity-70 transition-opacity duration-200">
            {title}
          </h3>
          <p className="text-sm text-pau-night/60 line-clamp-3">{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
