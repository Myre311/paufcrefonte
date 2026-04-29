import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  const { slug, name, basePrice, images } = product;
  const mainImage = images?.[0] ?? null;
  const price = `${(basePrice / 100).toLocaleString('fr-FR')} €`;

  return (
    <Link href={`/boutique/${slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-pau-night/[0.04]">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-opacity group-hover:opacity-80"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs font-sans uppercase tracking-wider text-pau-night/30">
              Sans image
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-sans uppercase tracking-wider text-pau-night leading-snug">
          {name}
        </p>
        <p className="mt-1 text-sm font-sans font-semibold text-pau-night/80">
          {price}
        </p>
      </div>
    </Link>
  );
}
