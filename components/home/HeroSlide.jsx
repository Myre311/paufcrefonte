import Image from 'next/image';
import Link from 'next/link';

export default function HeroSlide({ background, video, eyebrow, title, subtitle, ctas, active, index, matchLogos }) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${index + 1} sur 3`}
      aria-hidden={!active}
      className={[
        'absolute inset-0 flex flex-col justify-end pb-32 md:pb-40',
        'transition-opacity duration-700 ease-out',
        active ? 'opacity-100 z-10' : 'opacity-0 z-0',
      ].join(' ')}
      style={{
        transform: active ? 'translateX(0)' : 'translateX(20px)',
        transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Background */}
      {video ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={background}
          aria-hidden="true"
        />
      ) : background ? (
        <Image
          src={background}
          alt=""
          fill
          priority={index === 0}
          className="object-cover"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-pau-night/60"
        style={{ background: 'linear-gradient(to top, rgba(4,9,29,0.85) 0%, rgba(4,9,29,0.60) 50%, rgba(4,9,29,0.40) 100%)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-5xl">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow font-sans mb-3">
            {eyebrow}
          </p>
        )}

        {matchLogos && (
          <div
            className={`flex items-center gap-4 mb-5 ${matchLogos.isHome === false ? 'flex-row-reverse justify-end' : 'flex-row'}`}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 relative shrink-0">
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Logo Pau FC"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <span className="font-display text-2xl md:text-3xl text-white/40">vs</span>
            <div className="w-12 h-12 md:w-14 md:h-14 relative shrink-0">
              {matchLogos.opponentLogo ? (
                <Image
                  src={matchLogos.opponentLogo}
                  alt={`Logo ${matchLogos.opponent}`}
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-white/20">
                  <span className="text-[10px] font-sans uppercase tracking-wider text-white/70">
                    {matchLogos.opponent?.slice(0, 3).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <h1
          className="font-display uppercase text-pau-white"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.02em', lineHeight: '0.85' }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/70 font-sans line-clamp-1">
            {subtitle}
          </p>
        )}

        {ctas && ctas.length > 0 && (
          <div className="relative z-20 flex flex-col sm:flex-row items-start gap-3 mt-8">
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                tabIndex={active ? 0 : -1}
                className={[
                  'px-7 py-3.5 font-sans font-semibold uppercase tracking-wider min-h-[44px] flex items-center transition-colors duration-200 text-sm',
                  cta.primary
                    ? 'bg-pau-yellow text-pau-night hover:bg-white shadow-[0_0_40px_rgba(255,204,0,0.30)]'
                    : 'border border-white/20 text-pau-white hover:border-white/60',
                ].join(' ')}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
