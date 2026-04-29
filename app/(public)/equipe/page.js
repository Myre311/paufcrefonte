import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PlayerCard from '@/components/cards/PlayerCard';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Équipe — Pau Football Club',
  description: 'Découvrez l\'effectif professionnel du Pau FC pour la saison 2026-27.',
};

const POSITION_LABELS = {
  goalkeeper: 'GARDIENS',
  defender: 'DÉFENSEURS',
  midfielder: 'MILIEUX',
  forward: 'ATTAQUANTS',
};

const POSITION_ORDER = ['goalkeeper', 'defender', 'midfielder', 'forward'];

export default async function EquipePage() {
  const players = await prisma.player
    .findMany({
      where: { active: true, role: 'player' },
      orderBy: [{ position: 'asc' }, { displayOrder: 'asc' }, { shirtNumber: 'asc' }],
    })
    .catch(() => []);

  const grouped = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = players.filter((p) => p.position === pos);
    return acc;
  }, {});

  const hasPlayers = players.length > 0;

  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-equipe.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            EFFECTIF 2026–27
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            L'ÉQUIPE
          </h1>
        </div>
      </section>

      {!hasPlayers && (
        <section className="bg-pau-white border-t border-pau-night/10 py-32">
          <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
            <p className="font-display text-3xl text-pau-night/40 uppercase">
              EFFECTIF EN COURS DE MISE À JOUR
            </p>
          </div>
        </section>
      )}

      {hasPlayers &&
        POSITION_ORDER.map((pos) => {
          const group = grouped[pos];
          if (!group || group.length === 0) return null;
          return (
            <section key={pos} className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
              <Reveal>
              <div className="mx-auto max-w-7xl px-4 md:px-8">
                <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
                  {POSITION_LABELS[pos]}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                  {group.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </div>
              </Reveal>
            </section>
          );
        })}
    </>
  );
}
