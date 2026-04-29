import Image from 'next/image';
import Link from 'next/link';

export default function PlayerCard({ player }) {
  const { slug, firstName, lastName, shirtNumber, position, photoUrl, staffTitle } = player;

  const positionLabel = {
    goalkeeper: 'Gardien',
    defender: 'Défenseur',
    midfielder: 'Milieu',
    forward: 'Attaquant',
  }[position] ?? staffTitle ?? '';

  return (
    <Link href={`/equipe/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-pau-primary">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:opacity-80 transition-opacity duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
        )}
      </div>
      <div className="mt-4">
        {shirtNumber != null && (
          <span className="font-display text-2xl text-pau-yellow leading-none">
            {shirtNumber}
          </span>
        )}
        <p className="text-sm uppercase tracking-wider mt-2 text-pau-night">
          {firstName} {lastName}
        </p>
        {positionLabel && (
          <p className="text-xs text-pau-night/50 mt-1">{positionLabel}</p>
        )}
      </div>
    </Link>
  );
}
