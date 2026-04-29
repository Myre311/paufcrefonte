'use client';

import Image from 'next/image';

const KIT_BG = {
  home: { bg: '#1A1D38', text: '#FFFFFF', accent: '#FFCC00' },
  away: { bg: '#FFFFFF', text: '#04091D', accent: '#1A1D38' },
  third: { bg: '#FFCC00', text: '#04091D', accent: '#1A1D38' },
};

export default function JerseyPreview2D({ kit = 'home', name = '', number = '' }) {
  const palette = KIT_BG[kit] || KIT_BG.home;
  const displayName = (name || 'TON NOM').toUpperCase().slice(0, 12);
  const displayNumber = String(number || '10').slice(0, 2);

  return (
    <div className="relative w-full aspect-square bg-pau-night flex items-center justify-center overflow-hidden">
      <p className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-sans uppercase tracking-[0.25em] text-white/30 select-none pointer-events-none">
        APERÇU MAILLOT
      </p>

      {/* SVG maillot — silhouette + zones flocage */}
      <svg
        viewBox="0 0 400 480"
        className="w-[78%] h-[78%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
        aria-label={`Maillot ${kit} flocage ${displayName} ${displayNumber}`}
      >
        <defs>
          <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </linearGradient>
        </defs>
        {/* Body */}
        <path
          d="M120 60 L160 40 Q200 20 240 40 L280 60 L340 90 L360 160 L320 180 L320 440 Q320 460 300 460 L100 460 Q80 460 80 440 L80 180 L40 160 L60 90 Z"
          fill={palette.bg}
          stroke={palette.accent}
          strokeWidth="3"
        />
        <path
          d="M120 60 L160 40 Q200 20 240 40 L280 60 L340 90 L360 160 L320 180 L320 440 Q320 460 300 460 L100 460 Q80 460 80 440 L80 180 L40 160 L60 90 Z"
          fill="url(#shade)"
        />
        {/* Collar */}
        <path
          d="M160 40 Q200 70 240 40"
          fill="none"
          stroke={palette.accent}
          strokeWidth="4"
        />
        {/* Sleeve stripes */}
        <rect x="40" y="155" width="40" height="6" fill={palette.accent} opacity="0.85" />
        <rect x="320" y="155" width="40" height="6" fill={palette.accent} opacity="0.85" />

        {/* Numéro grand */}
        <text
          x="200"
          y="290"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="900"
          fontSize="170"
          fill={palette.text}
        >
          {displayNumber}
        </text>
        {/* Nom */}
        <text
          x="200"
          y="170"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="32"
          fill={palette.text}
          letterSpacing="2"
        >
          {displayName}
        </text>

        {/* Logo Pau FC zone */}
        <circle cx="135" cy="140" r="14" fill={palette.accent} />
      </svg>

      {/* Indicator pastille kit */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-white/40">
          {kit === 'home' ? 'DOMICILE' : kit === 'away' ? 'EXTÉRIEUR' : 'THIRD'}
        </span>
      </div>
    </div>
  );
}
