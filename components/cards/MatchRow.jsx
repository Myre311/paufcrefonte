import Image from 'next/image';
import Link from 'next/link';

function pad(n) {
  return String(n).padStart(2, '0');
}

const DAYS_FR = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
const MONTHS_FR = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];

function formatDate(iso) {
  const d = new Date(iso);
  return `${DAYS_FR[d.getDay()]} ${pad(d.getDate())} ${MONTHS_FR[d.getMonth()]}`;
}

function formatTime(iso) {
  const d = new Date(iso);
  return `${pad(d.getHours())}H${pad(d.getMinutes())}`;
}

export default function MatchRow({ match }) {
  const score =
    match.homeScore !== null && match.awayScore !== null
      ? `${match.homeScore} - ${match.awayScore}`
      : null;

  const ticketHref = match.ticketUrl || '/billetterie';
  const isUpcoming = match.status === 'scheduled' || match.status === 'live';

  return (
    <div className="group flex items-center gap-4 border-t border-pau-night/10 py-4 hover:bg-pau-night/[0.02] transition-colors px-2">
      {/* Date/time */}
      <div className="shrink-0 w-28 hidden sm:block">
        <span className="font-display text-sm uppercase tracking-wider text-pau-night">
          {formatDate(match.kickoffAt)}
        </span>
        <span className="block text-xs font-sans text-pau-night/50 mt-0.5">
          {formatTime(match.kickoffAt)}
        </span>
      </div>

      {/* Logo pair with names */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Left side: Pau FC when home, opponent when away */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative shrink-0 bg-white p-0.5">
            {match.isHome !== false ? (
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Logo Pau FC"
                fill
                className="object-contain"
                sizes="40px"
              />
            ) : (
              <div className="w-full h-full bg-white border border-pau-night/10 flex items-center justify-center relative">
                {match.opponentLogo ? (
                  <Image
                    src={match.opponentLogo}
                    alt={`Logo ${match.opponent}`}
                    fill
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                ) : (
                  <span className="text-[8px] font-sans uppercase tracking-widest text-pau-night/50">
                    {match.opponent?.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
            )}
          </div>
          <span className="text-sm font-sans uppercase tracking-wider text-pau-night hidden sm:inline">
            {match.isHome !== false ? 'PAU FC' : match.opponent}
          </span>
        </div>

        <span className="text-[10px] font-sans text-pau-night/30 uppercase tracking-wider">vs</span>

        {/* Right side: opponent when home, Pau FC when away */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative shrink-0 bg-white p-0.5">
            {match.isHome !== false ? (
              <div className="w-full h-full bg-white border border-pau-night/10 flex items-center justify-center relative">
                {match.opponentLogo ? (
                  <Image
                    src={match.opponentLogo}
                    alt={`Logo ${match.opponent}`}
                    fill
                    className="object-contain p-0.5"
                    sizes="40px"
                  />
                ) : (
                  <span className="text-[8px] font-sans uppercase tracking-widest text-pau-night/50">
                    {match.opponent?.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
            ) : (
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Logo Pau FC"
                fill
                className="object-contain"
                sizes="40px"
              />
            )}
          </div>
          <span className="text-sm font-sans uppercase tracking-wider text-pau-night hidden sm:inline">
            {match.isHome !== false ? match.opponent : 'PAU FC'}
          </span>
        </div>
      </div>

      {/* Competition label */}
      <div className="flex-1 min-w-0">
        {match.competition && (
          <span className="text-xs font-sans text-pau-night/40 block truncate">
            {match.competition}
          </span>
        )}
      </div>

      {/* Venue */}
      {match.venue && (
        <div className="hidden md:block shrink-0">
          <span className="text-xs font-sans text-pau-night/50">{match.venue}</span>
        </div>
      )}

      {/* Score or ticket */}
      <div className="shrink-0 ml-auto">
        {score ? (
          <span className="font-display text-sm text-pau-night/80 uppercase">{score}</span>
        ) : isUpcoming && match.ticketUrl ? (
          <Link
            href={ticketHref}
            className="text-pau-yellow text-xs font-sans underline-offset-4 hover:underline uppercase tracking-wider"
          >
            BILLETS
          </Link>
        ) : null}
      </div>
    </div>
  );
}
