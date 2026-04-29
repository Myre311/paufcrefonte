'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/animations/Reveal';

const DAYS_FR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const MONTHS_FR = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${DAYS_FR[d.getDay()]} ${pad(d.getDate())} ${MONTHS_FR[d.getMonth()]}`;
}

function formatTime(iso) {
  const d = new Date(iso);
  return `${pad(d.getHours())}H${pad(d.getMinutes())}`;
}

function computeCountdown(iso) {
  const diff = new Date(iso) - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

function TeamBlock({ logoSrc, name, alignRight }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${alignRight ? 'md:items-end' : 'md:items-start'}`}>
      <div className="w-24 h-24 md:w-32 md:h-32 relative">
        {logoSrc ? (
          <Image src={logoSrc} alt={`Logo ${name}`} fill className="object-contain" sizes="128px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-pau-night/[0.04] border border-pau-night/10">
            <span className="font-display text-2xl text-pau-night/50">
              {name?.slice(0, 3).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="font-display text-xl md:text-2xl uppercase text-pau-night text-center">
        {name}
      </span>
    </div>
  );
}

export default function MatchFeatured({ match }) {
  const [countdown, setCountdown] = useState(match ? computeCountdown(match.kickoffAt) : null);

  useEffect(() => {
    if (!match) return;
    const interval = setInterval(() => {
      setCountdown(computeCountdown(match.kickoffAt));
    }, 30000);
    return () => clearInterval(interval);
  }, [match]);

  if (!match) {
    return (
      <section className="border-t border-pau-night/10 bg-pau-white py-12 md:py-20">
        <p className="text-xl text-pau-night/40 text-center font-sans">
          Prochain match à confirmer.
        </p>
      </section>
    );
  }

  const ticketHref = match.ticketUrl || '/billetterie';
  const homeFirst = match.isHome !== false;
  const left = homeFirst
    ? { name: 'PAU FC', logo: '/images/homepage/Logo-Pau-FC-2023.png' }
    : { name: match.opponent, logo: match.opponentLogo };
  const right = homeFirst
    ? { name: match.opponent, logo: match.opponentLogo }
    : { name: 'PAU FC', logo: '/images/homepage/Logo-Pau-FC-2023.png' };

  return (
    <section className="border-t border-pau-night/10 py-12 md:py-20 bg-pau-white" aria-label="Prochain match">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative h-8 w-20 md:h-10 md:w-28 shrink-0">
                <Image
                  src="/logos/ligue-2-bkt.png"
                  alt="Ligue 2 BKT"
                  fill
                  className="object-contain object-left invert"
                  sizes="112px"
                />
              </div>
              <div className="border-l border-pau-night/10 pl-4">
                <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-pau-night/50">
                  Prochain match {match.isHome === false ? '· Extérieur' : '· Domicile'}
                </p>
                {match.competition && (
                  <p className="text-sm font-sans uppercase tracking-wider text-pau-night mt-0.5">
                    {match.competition}
                  </p>
                )}
              </div>
            </div>
            <Link
              href="/calendrier"
              className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/60 hover:text-pau-night transition-colors duration-200"
            >
              Calendrier complet →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center border-y border-pau-night/10 py-10 md:py-14">
            <TeamBlock logoSrc={left.logo} name={left.name} alignRight={false} />

            <div className="flex flex-col items-center gap-3 px-4">
              <span className="font-display text-3xl md:text-4xl text-pau-night/30 leading-none">VS</span>
              <p className="font-display uppercase text-2xl md:text-3xl text-pau-night leading-tight text-center">
                {formatDate(match.kickoffAt)}
              </p>
              <p className="text-xl md:text-2xl font-sans font-semibold text-pau-night text-center">
                {formatTime(match.kickoffAt)}
              </p>
              {match.venue && (
                <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-pau-night/50 text-center">
                  {match.venue}
                </p>
              )}
            </div>

            <TeamBlock logoSrc={right.logo} name={right.name} alignRight />
          </div>

          {countdown && (
            <div className="flex items-center justify-center gap-8 md:gap-12 mt-8">
              <div className="flex flex-col items-center">
                <span className="font-display tabular-nums text-4xl md:text-5xl text-pau-night leading-none">
                  {pad(countdown.days)}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-night/40 mt-2">
                  Jours
                </span>
              </div>
              <span className="font-display text-3xl text-pau-night/20 leading-none">:</span>
              <div className="flex flex-col items-center">
                <span className="font-display tabular-nums text-4xl md:text-5xl text-pau-night leading-none">
                  {pad(countdown.hours)}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-night/40 mt-2">
                  Heures
                </span>
              </div>
              <span className="font-display text-3xl text-pau-night/20 leading-none">:</span>
              <div className="flex flex-col items-center">
                <span className="font-display tabular-nums text-4xl md:text-5xl text-pau-night leading-none">
                  {pad(countdown.minutes)}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-night/40 mt-2">
                  Minutes
                </span>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={ticketHref}
              className="bg-pau-yellow text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider text-sm hover:bg-pau-night hover:text-pau-white transition-colors duration-200 min-h-[44px] inline-flex items-center"
            >
              Réserver mes places
            </Link>
            <Link
              href="/calendrier"
              className="border border-pau-night/20 text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider text-sm hover:border-pau-night transition-colors duration-200 min-h-[44px] inline-flex items-center"
            >
              Voir le calendrier
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
