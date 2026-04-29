import Link from 'next/link';
import Image from 'next/image';

const CLUB_LINKS = [
  { label: 'Histoire', href: '/club/histoire' },
  { label: 'Équipe', href: '/equipe' },
  { label: 'Staff', href: '/club/staff' },
  { label: 'Nouste Camp', href: '/club/nouste-camp' },
];

const BOUTIQUE_LINKS = [
  { label: 'Maillots', href: '/boutique?cat=maillots' },
  { label: 'Lifestyle', href: '/boutique?cat=lifestyle' },
  { label: 'Junior', href: '/boutique?cat=junior' },
  { label: 'Personnalisation', href: '/boutique/personnalisation' },
];

const BILLETTERIE_LINKS = [
  { label: 'Matchs', href: '/billetterie' },
  { label: 'Abonnements', href: '/billetterie/abonnements' },
  { label: 'Cashless', href: '/billetterie/cashless' },
  { label: 'CGV billetterie', href: '/cgv-billetterie' },
];

const INFOS_LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'Presse', href: '/presse' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'RGPD', href: '/rgpd' },
  { label: 'Cookies', href: '/cookies' },
  { label: 'CGV', href: '/cgv' },
];

export default function Footer() {

  return (
    <footer className="bg-pau-night border-t border-white/10">
      <div className="px-6 md:px-12 py-20 md:py-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-white/40 mb-6">
              CLUB
            </h4>
            <ul className="flex flex-col gap-3">
              {CLUB_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-white/40 mb-6">
              BOUTIQUE
            </h4>
            <ul className="flex flex-col gap-3">
              {BOUTIQUE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-white/40 mb-6">
              BILLETTERIE
            </h4>
            <ul className="flex flex-col gap-3">
              {BILLETTERIE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-sans uppercase tracking-widest text-white/40 mb-6">
              INFOS
            </h4>
            <ul className="flex flex-col gap-3">
              {INFOS_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <Link href="/" aria-label="Pau FC — accueil">
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Pau FC"
                height={32}
                width={32}
                className="h-8 w-auto"
              />
            </Link>
            <nav aria-label="Réseaux sociaux" className="flex flex-wrap items-center gap-3 text-sm font-sans text-white/60">
              <Link href="https://instagram.com/paufootballclub" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                INSTAGRAM
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="https://facebook.com/paufc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                FACEBOOK
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="https://x.com/paufc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                X
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="https://youtube.com/@paufc" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 min-h-[44px] flex items-center">
                YOUTUBE
              </Link>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-sans text-white/40">
            <span>© 2026 Pau Football Club. Tous droits réservés.</span>
            <a
              href="mailto:contact@paufc.fr"
              className="hover:text-white/60 transition-colors duration-200"
            >
              contact@paufc.fr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
