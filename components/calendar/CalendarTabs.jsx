'use client';

import { useState } from 'react';
import Image from 'next/image';

function formatDateFR(iso) {
  return new Date(iso)
    .toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .replace(/\./g, '');
}

function formatTimeFR(iso) {
  return new Date(iso).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function CalendarTabs({ matches }) {
  const [tab, setTab] = useState('upcoming');
  const now = new Date();

  const upcoming = matches.filter(
    (m) => m.status === 'scheduled' || m.status === 'live' || new Date(m.kickoffAt) >= now
  );
  const past = matches.filter(
    (m) => (m.status === 'played' || m.status === 'cancelled' || m.status === 'postponed') && new Date(m.kickoffAt) < now
  );

  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <div>
      <div className="flex items-center gap-4 mb-8" role="tablist" aria-label="Onglets calendrier">
        <button
          role="tab"
          aria-selected={tab === 'upcoming'}
          onClick={() => setTab('upcoming')}
          className={[
            'text-sm font-sans uppercase tracking-wider transition-colors',
            tab === 'upcoming'
              ? 'text-pau-yellow border-b border-pau-yellow pb-0.5'
              : 'text-pau-night/50 hover:text-pau-night',
          ].join(' ')}
        >
          A VENIR
        </button>
        <span className="text-pau-night/30 font-sans" aria-hidden="true">·</span>
        <button
          role="tab"
          aria-selected={tab === 'past'}
          onClick={() => setTab('past')}
          className={[
            'text-sm font-sans uppercase tracking-wider transition-colors',
            tab === 'past'
              ? 'text-pau-yellow border-b border-pau-yellow pb-0.5'
              : 'text-pau-night/50 hover:text-pau-night',
          ].join(' ')}
        >
          RESULTATS
        </button>
      </div>

      {displayed.length === 0 ? (
        <p className="text-center text-2xl font-display uppercase text-pau-night/40 py-20">
          CALENDRIER NON PUBLIE
        </p>
      ) : (
        <ul role="tabpanel" aria-label={tab === 'upcoming' ? 'Matchs à venir' : 'Résultats'}>
          {displayed.map((match) => {
            const isUpcoming = tab === 'upcoming';
            const score =
              match.homeScore !== null && match.awayScore !== null
                ? `${match.homeScore} - ${match.awayScore}`
                : null;

            return (
              <li
                key={match.id}
                className="group relative border-t border-pau-night/10 hover:bg-pau-night/[0.02] transition-colors"
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-pau-yellow scale-y-0 origin-top group-hover:scale-y-100 transition-transform"
                  aria-hidden="true"
                />
                <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-4 py-5 items-center">
                  <div>
                    <span className="font-display text-sm uppercase tracking-wider text-pau-night">
                      {formatDateFR(match.kickoffAt)} · {formatTimeFR(match.kickoffAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Pau FC logo + name */}
                    <div className={`flex items-center gap-2 ${match.isHome === false ? 'order-last' : 'order-first'}`}>
                      <div className="w-10 h-10 relative shrink-0 bg-white p-0.5">
                        <Image
                          src="/images/homepage/Logo-Pau-FC-2023.png"
                          alt="Logo Pau FC"
                          fill
                          className="object-contain"
                          sizes="40px"
                        />
                      </div>
                      <span className="text-sm font-sans uppercase tracking-wider text-pau-night">
                        PAU FC
                      </span>
                    </div>
                    <span className="text-xs font-sans text-pau-night/40">vs</span>
                    {/* Opponent logo + name */}
                    <div className={`flex items-center gap-2 ${match.isHome === false ? 'order-first' : 'order-last'}`}>
                      <div className="w-10 h-10 relative shrink-0 bg-white border border-pau-night/10 p-0.5">
                        {match.opponentLogo ? (
                          <Image
                            src={match.opponentLogo}
                            alt={`Logo ${match.opponent}`}
                            fill
                            className="object-contain"
                            sizes="40px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[8px] font-sans uppercase tracking-widest text-pau-night/50">
                              {match.opponent?.slice(0, 3).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-sans uppercase tracking-wider text-pau-night">
                        {match.opponent}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <span className="font-sans text-sm text-pau-night/60">
                      {match.venue}
                    </span>
                  </div>
                  <div className="hidden md:flex justify-end">
                    {isUpcoming && match.ticketUrl ? (
                      <a
                        href={match.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pau-yellow text-sm font-sans underline-offset-4 hover:underline uppercase tracking-wider"
                      >
                        BILLETS →
                      </a>
                    ) : score ? (
                      <span className="font-display text-sm text-pau-night/80 uppercase">
                        {score}
                      </span>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
