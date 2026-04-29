import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import CalendarTabs from '@/components/calendar/CalendarTabs';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

async function getMatches() {
  return prisma.match
    .findMany({
      orderBy: { kickoffAt: 'asc' },
    })
    .catch(() => []);
}

export default async function CalendrierPage() {
  const rawMatches = await getMatches();

  const matches = rawMatches.map((m) => ({
    id: m.id,
    competition: m.competition,
    season: m.season,
    kickoffAt: m.kickoffAt.toISOString(),
    isHome: m.isHome,
    opponent: m.opponent,
    venue: m.venue,
    status: m.status,
    homeScore: m.homeScore ?? null,
    awayScore: m.awayScore ?? null,
    ticketUrl: m.ticketUrl ?? null,
  }));

  return (
    <div className="bg-pau-white min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-calendrier.jpg"
          alt="Calendrier Pau FC saison 2026-27"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            SAISON
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            CALENDRIER 2026-27
          </h1>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <CalendarTabs matches={matches} />
        </div>
        </Reveal>
      </section>
    </div>
  );
}
