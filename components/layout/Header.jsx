'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import useCart, { useCartCount } from '@/lib/cart';

// ---------------------------------------------------------------------------
// NAV DATA — multi-column mega-menu structure
// ---------------------------------------------------------------------------

const NAV = [
  {
    label: 'CLUB',
    root: '/club',
    mega: {
      columns: [
        {
          heading: 'À propos',
          links: [
            { label: 'Identité', href: '/club' },
            { label: 'Histoire', href: '/club/histoire' },
            { label: 'Staff & dirigeants', href: '/club/staff' },
            { label: 'Nouste Camp', href: '/club/nouste-camp' },
          ],
        },
        {
          heading: 'Communication',
          links: [
            { label: 'Presse', href: '/presse' },
            { label: 'Galerie', href: '/galerie' },
            { label: 'Vidéos', href: '/videos' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          editorial: true,
          image: '/images/homepage/Logo-Pau-FC-2023.png',
          caption: 'LE CLUB',
          title: 'Découvre notre identité',
          cta: { label: 'En savoir plus', href: '/club' },
        },
      ],
    },
  },
  {
    label: 'ÉQUIPES',
    root: '/equipe',
    mega: {
      columns: [
        {
          heading: 'Équipe pro',
          links: [
            { label: 'Joueurs & staff', href: '/equipe' },
            { label: 'Centre de formation', href: '/club/academie' },
          ],
        },
        {
          heading: 'Académie',
          links: [
            { label: 'Le parcours', href: '/club/academie' },
            { label: 'Nouste Camp', href: '/club/nouste-camp' },
          ],
        },
        {
          editorial: true,
          image: '/images/homepage/maillot-ext-dom.jpg',
          caption: 'EFFECTIF 2026 — 27',
          title: 'Notre effectif',
          cta: { label: "Voir l'effectif", href: '/equipe' },
        },
      ],
    },
  },
  {
    label: 'MATCHS',
    root: '/calendrier',
    mega: {
      columns: [
        {
          heading: 'Saison',
          links: [
            { label: 'Calendrier & résultats', href: '/calendrier' },
          ],
        },
        {
          heading: 'Au stade',
          links: [
            { label: 'Billetterie matchs', href: '/billetterie' },
            { label: 'Abonnements', href: '/billetterie/abonnements' },
            { label: 'Cashless', href: '/billetterie/cashless' },
          ],
        },
        {
          editorial: true,
          image: '/images/homepage/billetterie-enfant.jpg',
          caption: 'PROCHAIN MATCH',
          title: 'Réserve ta place',
          cta: { label: 'Voir le calendrier', href: '/calendrier' },
        },
      ],
    },
  },
  {
    label: 'BOUTIQUE',
    root: '/boutique',
    mega: {
      columns: [
        {
          heading: 'Maillots & équipement',
          links: [
            { label: 'Tous les maillots', href: '/boutique?cat=maillots' },
            { label: 'Junior', href: '/boutique?cat=junior' },
            { label: 'Personnalisation', href: '/boutique/personnalisation' },
          ],
        },
        {
          heading: 'Lifestyle',
          links: [
            { label: 'Lifestyle', href: '/boutique?cat=lifestyle' },
            { label: 'Accessoires', href: '/boutique?cat=accessoires' },
          ],
        },
        {
          editorial: true,
          image: '/images/homepage/maillot-ext-dom.jpg',
          caption: 'NOUVELLE COLLECTION',
          title: 'Maillots 2026 — 27',
          cta: { label: 'Voir la collection', href: '/boutique' },
        },
      ],
    },
  },
  {
    label: 'ACTUALITÉS',
    root: '/actualites',
    href: '/actualites',
  },
  {
    label: 'PARTENAIRES',
    root: '/partenaires',
    mega: {
      columns: [
        {
          heading: 'Programme',
          links: [
            { label: 'Nos partenaires', href: '/partenaires' },
            { label: 'Devenir partenaire', href: '/contact?sujet=partenariat' },
          ],
        },
        {
          editorial: true,
          image: '/images/homepage/billetterie-enfant.jpg',
          caption: 'PROGRAMME 2026',
          title: 'Soutiens le club',
          cta: { label: 'En savoir plus', href: '/partenaires' },
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// EditorialCard — image placeholder column inside mega-menu
// ---------------------------------------------------------------------------

function EditorialCard({ image, caption, title, cta }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/3] bg-pau-primary overflow-hidden relative">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 33vw, 380px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-pau-night/85 via-pau-night/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 gap-1">
          {caption && (
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-yellow">
              {caption}
            </span>
          )}
          {title && (
            <span className="font-display text-lg uppercase leading-tight text-pau-white">
              {title}
            </span>
          )}
        </div>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-1.5 text-sm font-sans uppercase tracking-wider text-pau-yellow hover:text-pau-white transition-colors duration-200"
        >
          {cta.label}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MegaPanel — full-width dropdown panel
// ---------------------------------------------------------------------------

function MegaPanel({ mega, id, onMouseEnter, onMouseLeave }) {
  const colCount = mega.columns.length;
  const gridClass =
    colCount === 2 ? 'md:grid-cols-2' : colCount === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4';

  return (
    <div
      id={id}
      role="region"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="fixed left-0 right-0 top-20 bg-pau-night border-t border-white/10 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] z-40"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className={`grid grid-cols-1 ${gridClass} gap-8`}>
          {mega.columns.map((col, idx) => {
            if (col.editorial) {
              return (
                <EditorialCard
                  key={idx}
                  image={col.image}
                  caption={col.caption}
                  title={col.title}
                  cta={col.cta}
                />
              );
            }
            return (
              <div key={idx} className="flex flex-col gap-3">
                {col.heading && (
                  <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-pau-yellow border-b border-white/10 pb-2">
                    {col.heading}
                  </p>
                )}
                <ul className="flex flex-col">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-2 py-2 text-sm font-sans text-pau-white/90 hover:text-pau-yellow transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DesktopNav — centre nav with mega-menu hover behaviour
// ---------------------------------------------------------------------------

function DesktopNav({ nav, pathname }) {
  const [openIndex, setOpenIndex] = useState(null);
  const leaveTimer = useRef(null);

  function handleEnter(i) {
    clearTimeout(leaveTimer.current);
    setOpenIndex(i);
  }

  function handleLeave() {
    leaveTimer.current = setTimeout(() => setOpenIndex(null), 150);
  }

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  useEffect(() => {
    setOpenIndex(null);
    clearTimeout(leaveTimer.current);
  }, [pathname]);

  return (
    <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
      {nav.map((item, i) => {
        const active =
          pathname === item.root ||
          pathname.startsWith(item.root + '/') ||
          (item.root === '/club' && pathname === '/presse');
        const hasMega = !!item.mega;
        const isOpen = openIndex === i;

        const linkClass = [
          'flex items-center gap-1 px-3 py-2 text-sm font-sans uppercase tracking-wider transition-colors duration-200 min-h-[44px] relative',
          active
            ? 'text-pau-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-pau-yellow'
            : 'text-white/80 hover:text-pau-white',
        ].join(' ');

        return (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={handleLeave}
          >
            {hasMega ? (
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-controls={`megamenu-${i}`}
                className={linkClass}
              >
                {item.label}
                <ChevronDown
                  className={[
                    'h-3.5 w-3.5 transition-transform duration-150',
                    isOpen ? 'rotate-180' : '',
                  ].join(' ')}
                  aria-hidden="true"
                />
              </button>
            ) : (
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={linkClass}
              >
                {item.label}
              </Link>
            )}

            {hasMega && isOpen && (
              <MegaPanel
                mega={item.mega}
                id={`megamenu-${i}`}
                onMouseEnter={() => handleEnter(i)}
                onMouseLeave={handleLeave}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// SearchBar — inline toggle in utility bar
// ---------------------------------------------------------------------------

function SearchToggle() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="flex items-center gap-2">
      {open && (
        <input
          ref={inputRef}
          type="search"
          placeholder="Rechercher..."
          aria-label="Rechercher sur le site"
          className="bg-transparent border-b border-white/30 text-sm font-sans text-white placeholder-white/40 outline-none py-0.5 w-40 transition-all duration-200"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
            }
          }}
        />
      )}
      <button
        type="button"
        aria-label="Rechercher"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 min-h-[36px] min-w-[36px]"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LanguageToggle — FR / EN placeholder
// ---------------------------------------------------------------------------

function LanguageToggle() {
  const [lang, setLang] = useState('FR');

  return (
    <button
      type="button"
      onClick={() => setLang((v) => (v === 'FR' ? 'EN' : 'FR'))}
      aria-label={lang === 'FR' ? 'Switch to English' : 'Passer en francais'}
      className="text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200 min-h-[36px]"
    >
      {lang === 'FR' ? 'FR / EN' : 'EN / FR'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// TopBar — utility layer (desktop only)
// ---------------------------------------------------------------------------

function TopBar() {
  return (
    <div className="hidden lg:flex items-center justify-end gap-6 h-9 px-8 bg-black/40 border-b border-white/10">
      <Link
        href="/application"
        className="text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
      >
        Application mobile
      </Link>
      <Link
        href="/supporters"
        className="text-xs font-sans uppercase tracking-widest text-white/60 hover:text-white transition-colors duration-200"
      >
        Supporters
      </Link>
      <span className="border-l border-white/10 h-3" aria-hidden="true" />
      <SearchToggle />
      <LanguageToggle />
    </div>
  );
}

// ---------------------------------------------------------------------------
// MobileMenu — fullscreen overlay with accordion
// ---------------------------------------------------------------------------

function MobileMenu({ nav, pathname, onClose }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggleAccordion(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  useEffect(() => {
    setOpenIndex(null);
  }, [pathname]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navigation"
      className="fixed inset-0 z-50 bg-pau-night overflow-y-auto"
    >
      {/* Mobile menu header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 sticky top-0 bg-pau-night z-10">
        <Link href="/" onClick={onClose} aria-label="Pau FC — accueil">
          <Image
            src="/images/homepage/Logo-Pau-FC-2023.png"
            alt="Pau FC"
            height={36}
            width={36}
            className="h-9 w-auto"
          />
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer le menu"
          className="flex items-center justify-center min-h-[44px] min-w-[44px] text-pau-white"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Nav accordion */}
      <nav aria-label="Navigation mobile" className="px-6 pt-6 pb-4">
        <ul className="flex flex-col divide-y divide-white/10">
          {nav.map((item, i) => {
            const active =
              pathname === item.root || pathname.startsWith(item.root + '/');
            const hasMega = !!item.mega;
            const isOpen = openIndex === i;

            const topLevelClass = [
              'flex w-full items-center justify-between py-5 font-display text-3xl uppercase transition-colors duration-200 min-h-[44px]',
              active ? 'text-pau-yellow' : 'text-pau-white',
            ].join(' ');

            return (
              <li key={item.label}>
                {hasMega ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(i)}
                      aria-expanded={isOpen}
                      aria-controls={`mobile-submenu-${i}`}
                      className={topLevelClass}
                    >
                      {item.label}
                      <ChevronDown
                        className={[
                          'h-5 w-5 transition-transform duration-150 shrink-0',
                          isOpen ? 'rotate-180' : '',
                        ].join(' ')}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <ul
                        id={`mobile-submenu-${i}`}
                        className="flex flex-col gap-0 pb-5 pl-4"
                      >
                        {item.mega.columns
                          .filter((col) => !col.editorial)
                          .flatMap((col) => col.links)
                          .map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="flex items-center py-3 text-base font-sans uppercase tracking-wider text-white/70 hover:text-pau-white transition-colors duration-150 min-h-[44px]"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={topLevelClass}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile menu footer CTAs */}
      <div className="sticky bottom-0 bg-pau-night border-t border-white/10 px-6 py-5 flex flex-col gap-3">
        <Link
          href="/billetterie"
          onClick={onClose}
          className="flex items-center justify-center w-full bg-pau-yellow text-pau-night font-sans font-semibold uppercase tracking-wider text-sm py-4 min-h-[44px] hover:bg-white transition-colors duration-200"
        >
          BILLETTERIE
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/connexion"
            onClick={onClose}
            className="flex items-center gap-2 flex-1 justify-center py-3 text-sm font-sans uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-200 min-h-[44px]"
          >
            <User className="h-4 w-4" aria-hidden="true" />
            Mon compte
          </Link>
          <span className="border-l border-white/10 h-5" aria-hidden="true" />
          <Link
            href="/panier"
            onClick={onClose}
            aria-label="Voir le panier"
            className="flex items-center gap-2 flex-1 justify-center py-3 text-sm font-sans uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-200 min-h-[44px]"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Panier
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header — root export
// ---------------------------------------------------------------------------

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef(null);
  const cartCount = useCartCount();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // ESC closes mobile menu and returns focus to burger
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-pau-night">
        {/* Layer 1 — top utility bar */}
        <TopBar />

        {/* Layer 2 — main bar */}
        <div className="flex items-center justify-between px-6 md:px-8 h-20 border-b border-white/10">
          {/* Logo */}
          <Link href="/" aria-label="Pau FC — accueil" className="shrink-0">
            <Image
              src="/images/homepage/Logo-Pau-FC-2023.png"
              alt="Pau FC"
              height={48}
              width={48}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Centre nav — desktop */}
          <DesktopNav nav={NAV} pathname={pathname} />

          {/* Right actions — desktop */}
          <div className="hidden lg:flex items-center gap-1 ml-4">
            <Link
              href="/connexion"
              aria-label="Mon compte"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/80 hover:text-pau-yellow transition-colors duration-200"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/panier"
              aria-label={
                cartCount > 0
                  ? `Panier — ${cartCount} article${cartCount > 1 ? 's' : ''}`
                  : 'Voir le panier'
              }
              onClick={(e) => {
                e.preventDefault();
                useCart.getState().setOpen(true);
              }}
              className="relative flex items-center justify-center min-h-[44px] min-w-[44px] text-white/80 hover:text-pau-yellow transition-colors duration-200"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-pau-yellow text-pau-night text-[10px] font-sans font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/billetterie"
              className="ml-3 bg-pau-yellow text-pau-night px-6 py-3 font-sans font-semibold uppercase tracking-wider text-sm hover:bg-white transition-colors duration-200"
            >
              BILLETTERIE
            </Link>
          </div>

          {/* Burger — mobile/tablet */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/panier"
              aria-label={
                cartCount > 0
                  ? `Panier — ${cartCount} article${cartCount > 1 ? 's' : ''}`
                  : 'Voir le panier'
              }
              onClick={(e) => {
                e.preventDefault();
                useCart.getState().setOpen(true);
              }}
              className="relative flex items-center justify-center min-h-[44px] min-w-[44px] text-white/80"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-pau-yellow text-pau-night text-[10px] font-sans font-semibold leading-none rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-pau-white hover:text-white/60 transition-colors duration-200"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <MobileMenu nav={NAV} pathname={pathname} onClose={closeMenu} />
      )}
    </>
  );
}
