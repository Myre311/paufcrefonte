import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/paufootballclub',
    Icon: Instagram,
    handle: '@paufootballclub',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/paufc',
    Icon: Facebook,
    handle: '/paufc',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/paufc',
    Icon: Twitter,
    handle: '@paufc',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@paufc',
    Icon: Youtube,
    handle: '@paufc',
  },
];

export default function SocialBar() {
  return (
    <section
      aria-label="Réseaux sociaux Pau FC"
      className="bg-pau-night border-t border-white/10 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10">
          <div>
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-pau-yellow mb-3">
              SUIS-NOUS
            </p>
            <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-white leading-tight">
              RÉSEAUX SOCIAUX
            </h2>
          </div>
          <p className="text-sm text-white/60 font-sans max-w-md">
            Toute l&apos;actualité du Pau FC, les coulisses du Nouste Camp et les
            réactions à chaud, en direct sur nos plateformes officielles.
          </p>
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {SOCIALS.map(({ label, href, Icon, handle }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pau FC sur ${label}`}
                className="group flex flex-col gap-4 bg-pau-night p-6 md:p-8 min-h-[140px] hover:bg-white/[0.04] transition-colors duration-200"
              >
                <Icon
                  className="h-6 w-6 text-pau-yellow group-hover:text-white transition-colors duration-200"
                  aria-hidden="true"
                />
                <div className="mt-auto">
                  <p className="font-display text-lg uppercase text-pau-white">
                    {label}
                  </p>
                  <p className="text-xs text-white/50 font-sans tracking-wide mt-1">
                    {handle}
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
