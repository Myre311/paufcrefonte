import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const POSITION_LABELS = {
  goalkeeper: 'Gardien',
  defender: 'Défenseur',
  midfielder: 'Milieu',
  forward: 'Attaquant',
};

function formatDate(dt) {
  if (!dt) return null;
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dt));
}

export async function generateMetadata({ params }) {
  const player = await prisma.player
    .findUnique({ where: { slug: params.slug } })
    .catch(() => null);
  if (!player) return { title: 'Joueur introuvable — Pau FC' };
  return {
    title: `${player.firstName} ${player.lastName} — Pau FC`,
    description: player.bio?.slice(0, 155) ?? `Fiche joueur ${player.firstName} ${player.lastName}, Pau Football Club.`,
  };
}

export default async function PlayerPage({ params }) {
  const player = await prisma.player
    .findUnique({
      where: { slug: params.slug },
      include: { stats: true },
    })
    .catch(() => null);

  if (!player) notFound();

  const {
    firstName,
    lastName,
    shirtNumber,
    position,
    photoUrl,
    nationality,
    heightCm,
    joinedAt,
    birthDate,
    bio,
    stats,
    staffTitle,
  } = player;

  const positionLabel = POSITION_LABELS[position] ?? staffTitle ?? '';

  return (
    <>
      <section className="bg-pau-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-pau-primary">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
                )}
              </div>
              {shirtNumber != null && (
                <span
                  className="absolute -top-6 -left-4 font-display text-9xl text-pau-yellow opacity-20 leading-none select-none"
                  aria-hidden="true"
                >
                  {shirtNumber}
                </span>
              )}
            </div>

            <div className="pt-4 md:pt-12">
              {positionLabel && (
                <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
                  {positionLabel}
                </p>
              )}
              <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night leading-tight mb-8">
                {firstName}
                <br />
                {lastName}
              </h1>

              <dl className="grid grid-cols-2 gap-6 border-t border-pau-night/10 pt-8 mb-10">
                {shirtNumber != null && (
                  <>
                    <dt className="text-xs uppercase tracking-widest text-pau-night/40">Numéro</dt>
                    <dd className="font-display text-2xl text-pau-yellow">{shirtNumber}</dd>
                  </>
                )}
                {nationality && (
                  <>
                    <dt className="text-xs uppercase tracking-widest text-pau-night/40">Nationalité</dt>
                    <dd className="text-sm text-pau-night">{nationality}</dd>
                  </>
                )}
                {birthDate && (
                  <>
                    <dt className="text-xs uppercase tracking-widest text-pau-night/40">Date de naissance</dt>
                    <dd className="text-sm text-pau-night">{formatDate(birthDate)}</dd>
                  </>
                )}
                {heightCm && (
                  <>
                    <dt className="text-xs uppercase tracking-widest text-pau-night/40">Taille</dt>
                    <dd className="text-sm text-pau-night">{heightCm} cm</dd>
                  </>
                )}
                {joinedAt && (
                  <>
                    <dt className="text-xs uppercase tracking-widest text-pau-night/40">Au club depuis</dt>
                    <dd className="text-sm text-pau-night">{formatDate(joinedAt)}</dd>
                  </>
                )}
              </dl>

              {stats ? (
                <div className="border-t border-pau-night/10 pt-8">
                  <h2 className="font-display text-lg uppercase text-pau-night mb-6">
                    STATISTIQUES {stats.season}
                  </h2>
                  <dl className="grid grid-cols-3 gap-6">
                    <div>
                      <dd className="font-display text-3xl text-pau-yellow">{stats.matchesPlayed}</dd>
                      <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Matchs</dt>
                    </div>
                    {position !== 'goalkeeper' && (
                      <>
                        <div>
                          <dd className="font-display text-3xl text-pau-yellow">{stats.goals}</dd>
                          <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Buts</dt>
                        </div>
                        <div>
                          <dd className="font-display text-3xl text-pau-yellow">{stats.assists}</dd>
                          <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Passes D</dt>
                        </div>
                      </>
                    )}
                    {position === 'goalkeeper' && (
                      <>
                        <div>
                          <dd className="font-display text-3xl text-pau-yellow">{stats.saves}</dd>
                          <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Arrêts</dt>
                        </div>
                        <div>
                          <dd className="font-display text-3xl text-pau-yellow">{stats.cleanSheets}</dd>
                          <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Clean sheets</dt>
                        </div>
                      </>
                    )}
                    <div>
                      <dd className="font-display text-3xl text-pau-yellow">{stats.minutesPlayed}</dd>
                      <dt className="text-xs uppercase tracking-wider text-pau-night/50 mt-1">Minutes</dt>
                    </div>
                  </dl>
                </div>
              ) : (
                <p className="text-sm text-pau-night/40 border-t border-pau-night/10 pt-8">
                  Statistiques à venir.
                </p>
              )}
            </div>
          </div>

          {bio && (
            <div className="border-t border-pau-night/10 mt-16 pt-16 max-w-3xl">
              <h2 className="font-display text-2xl uppercase text-pau-night mb-6">BIOGRAPHIE</h2>
              <p className="text-pau-night/70 leading-relaxed text-sm">{bio}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
