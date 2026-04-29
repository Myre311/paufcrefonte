'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlide from './HeroSlide';

function buildMatchTitle(match) {
  if (!match) return 'PROCHAIN MATCH À CONFIRMER';
  const away = match.opponent || match.awayTeam || match.adversaire || 'ADVERSAIRE';
  return `PAU FC vs ${away.toUpperCase()}`;
}

function buildMatchSubtitle(match) {
  if (!match) return null;
  const date = match.kickoffAt
    ? new Date(match.kickoffAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;
  const time = match.kickoffAt
    ? new Date(match.kickoffAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : null;
  const venue = match.venue || match.stade || 'Nouste Camp';
  return [date, time ? `${time}` : null, venue].filter(Boolean).join(' · ');
}

function buildSlides(featuredMatch, featuredArticle) {
  const matchTicketUrl = featuredMatch?.ticketUrl || '/billetterie';

  const slide1 = {
    background: '/videos/header-nc.mp4',
    video: true,
    eyebrow: 'PROCHAIN MATCH',
    title: buildMatchTitle(featuredMatch),
    subtitle: buildMatchSubtitle(featuredMatch),
    matchLogos: featuredMatch
      ? {
          opponent: featuredMatch.opponent || 'Adversaire',
          opponentLogo: featuredMatch.opponentLogo || null,
          isHome: featuredMatch.isHome !== false,
        }
      : null,
    ctas: [{ label: 'RÉSERVER MES PLACES', href: matchTicketUrl, primary: true }],
  };

  const slide2 = {
    background: '/images/homepage/maillot-ext-dom.jpg',
    video: false,
    eyebrow: 'MAILLOTS 2026–27',
    title: 'LA NOUVELLE COLLECTION',
    subtitle: 'Domicile · Extérieur · Third',
    ctas: [
      { label: 'DÉCOUVRIR', href: '/boutique', primary: true },
      { label: 'PERSONNALISER', href: '/boutique/personnalisation', primary: false },
    ],
  };

  const hasArticle = featuredArticle && featuredArticle.slug;
  const slide3 = {
    background: hasArticle ? (featuredArticle.coverImageUrl || null) : null,
    video: false,
    eyebrow: hasArticle ? (featuredArticle.category || 'DERNIÈRE ACTUALITÉ') : null,
    title: hasArticle ? featuredArticle.title : 'BIENVENUE AU NOUSTE CAMP',
    subtitle: hasArticle ? (featuredArticle.excerpt || null) : null,
    ctas: hasArticle
      ? [{ label: "LIRE L'ARTICLE", href: `/actualites/${featuredArticle.slug}`, primary: true }]
      : [{ label: 'DÉCOUVRIR LE CLUB', href: '/club', primary: true }],
  };

  return [slide1, slide2, slide3];
}

const TOTAL = 3;
const INTERVAL_MS = 6000;

export default function Hero({ featuredMatch = null, featuredArticle = null }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const sectionRef = useRef(null);

  const slides = buildSlides(featuredMatch, featuredArticle);

  const goTo = useCallback((index) => {
    setActiveIndex(((index % TOTAL) + TOTAL) % TOTAL);
  }, []);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // Detect prefers-reduced-motion once on mount
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, reducedMotion]);

  // Pause on visibility change
  useEffect(() => {
    const handler = () => setIsPaused(document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // Keyboard navigation (arrow keys when section focused)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [goPrev, goNext],
  );

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only horizontal swipe (not a scroll attempt)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel principal Pau FC"
      className="relative min-h-[70vh] overflow-hidden bg-pau-night focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <HeroSlide
          key={i}
          index={i}
          active={activeIndex === i}
          background={slide.background}
          video={slide.video}
          eyebrow={slide.eyebrow}
          title={slide.title}
          subtitle={slide.subtitle}
          ctas={slide.ctas}
          matchLogos={slide.matchLogos}
        />
      ))}

      {/* Prev arrow */}
      <button
        onClick={() => { goPrev(); }}
        aria-label="Slide précédente"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 text-white/60 hover:text-white/100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow"
      >
        <ChevronLeft size={32} aria-hidden="true" />
      </button>

      {/* Next arrow */}
      <button
        onClick={() => { goNext(); }}
        aria-label="Slide suivante"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-11 h-11 text-white/60 hover:text-white/100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow"
      >
        <ChevronRight size={32} aria-hidden="true" />
      </button>

      {/* Dot indicators */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3"
        role="tablist"
        aria-label="Navigation du carousel"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={activeIndex === i}
            aria-label={`Aller à la slide ${i + 1}`}
            aria-current={activeIndex === i ? 'true' : undefined}
            onClick={() => goTo(i)}
            className="flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow focus-visible:outline-offset-2"
            style={{ minWidth: 44, minHeight: 44, background: 'transparent', borderRadius: 0 }}
          >
            {/* Visual dot inset inside the 44px touch target */}
            <span
              className={[
                'block w-2 h-2 transition-colors duration-300',
                activeIndex === i ? 'bg-pau-yellow' : 'bg-white/30 hover:bg-white/60',
              ].join(' ')}
              style={{ borderRadius: 0 }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
