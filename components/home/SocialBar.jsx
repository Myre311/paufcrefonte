import Image from 'next/image';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/paufootballclub',
    Icon: Instagram,
    handle: '@paufootballclub',
    image: '/images/hero-equipe.jpg',
    cta: 'Voir le feed',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/paufc',
    Icon: Facebook,
    handle: '/paufc',
    image: '/images/hero-stade.jpg',
    cta: 'Liker la page',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/paufc',
    Icon: Twitter,
    handle: '@paufc',
    image: '/images/hero-billetterie.jpg',
    cta: 'Suivre le compte',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@paufc',
    Icon: Youtube,
    handle: '@paufc',
    image: '/images/hero-academy.jpg',
    cta: 'Voir la chaîne',
  },
];

export default function SocialBar() {
  return (
    <section
      aria-label="Réseaux sociaux Pau FC"
      className="bg-pau-night border-t border-white/10 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div>
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-pau-yellow mb-4">
              SUIS-NOUS
            </p>
            <h2 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-[0.95]">
              RÉSEAUX SOCIAUX
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 font-sans max-w-md leading-relaxed">
            Toute l&apos;actualité du Pau FC, les coulisses du Nouste Camp et les
            réactions à chaud, en direct sur nos plateformes officielles.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SOCIALS.map(({ label, href, Icon, handle, image, cta }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pau FC sur ${label}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-pau-primary"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-105"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(4,9,29,0.92) 0%, rgba(4,9,29,0.55) 50%, rgba(4,9,29,0.20) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="absolute top-5 left-5 flex items-center justify-center w-11 h-11 border border-white/20 bg-pau-night/40 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-pau-yellow" aria-hidden="true" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                  <p className="text-[10px] font-sans uppercase tracking-[0.25em] text-pau-yellow mb-2">
                    {label}
                  </p>
                  <p className="font-display text-2xl uppercase text-pau-white leading-tight mb-1">
                    {handle}
                  </p>
                  <p className="text-xs text-white/60 font-sans tracking-wide group-hover:text-pau-yellow transition-colors duration-300">
                    {cta} →
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
