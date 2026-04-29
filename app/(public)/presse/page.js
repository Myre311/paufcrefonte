import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Espace Presse — Pau Football Club',
  description: 'Espace presse du Pau FC : accréditations, media kit, contacts pour les journalistes.',
};

const MEDIA_KIT = [
  { label: 'Logo HD (PNG, SVG)', href: '#' },
  { label: 'Charte graphique officielle', href: '#' },
  { label: 'Photos officielles saison 2026-27', href: '#' },
  { label: 'Communiqués de presse', href: '#' },
];

export default function PressePage() {
  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-accueil.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            PAU FC
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            PRESSE
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <h2 className="font-display text-2xl uppercase text-pau-night mb-4">
                ACCRÉDITATIONS
              </h2>
              <p className="text-pau-night/70 leading-relaxed mb-4">
                Le Pau FC accueille les journalistes et photographes accrédités lors de ses
                matchs à domicile au Nouste Camp. Les demandes d'accréditation sont à
                soumettre au minimum 72 heures avant chaque rencontre.
              </p>
              <p className="text-pau-night/70 leading-relaxed mb-10">
                Toute demande doit préciser le nom du média, la nature de la couverture souhaitée
                (écrite, photographique, audiovisuelle) et les coordonnées du journaliste.
                Le service presse du club se réserve le droit de refuser ou de limiter les
                accréditations en fonction des capacités de la tribune presse.
              </p>
              <Link
                href="/contact?sujet=presse"
                className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
              >
                DEMANDER UNE ACCRÉDITATION
              </Link>
            </div>
            <div className="border-t border-pau-night/10 md:border-t-0 md:border-l md:border-pau-night/10 pt-12 md:pt-0 md:pl-16">
              <h2 className="font-display text-2xl uppercase text-pau-night mb-4">
                PROCÉDURE
              </h2>
              <ol className="flex flex-col gap-6">
                {[
                  'Soumettre votre demande via le formulaire de contact, sujet Presse.',
                  'Joindre une copie de votre carte de presse ou justificatif de commande.',
                  'Recevoir la confirmation d\'accréditation par email sous 48h ouvrées.',
                  'Se présenter à l\'entrée presse du Nouste Camp le jour du match.',
                ].map((etape, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-display text-2xl text-pau-yellow shrink-0 leading-none mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-pau-night/70 text-sm leading-relaxed">{etape}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl uppercase text-pau-night mb-8">
            MEDIA KIT
          </h2>
          <p className="text-pau-night/70 text-sm mb-10 max-w-2xl">
            L'ensemble des ressources officielles du Pau Football Club est disponible
            ci-dessous. Ces fichiers sont exclusivement réservés à un usage éditorial et
            journalistique. Toute utilisation commerciale est interdite sans accord préalable.
          </p>
          <ul className="flex flex-col gap-4">
            {MEDIA_KIT.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-3 border border-pau-night/20 px-6 py-4 text-sm font-sans text-pau-night uppercase tracking-widest hover:bg-pau-night/[0.03] transition-colors duration-200"
                >
                  <span>{label}</span>
                  <span aria-hidden="true" className="text-pau-night/40 ml-auto">
                    &darr;
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl uppercase text-pau-night mb-8">
            CONTACT PRESSE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                EMAIL
              </p>
              <a
                href="mailto:presse@paufc.fr"
                className="text-sm text-pau-night/70 hover:opacity-70 transition-opacity duration-200"
              >
                presse@paufc.fr
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                TÉLÉPHONE PRESSE
              </p>
              <a
                href="tel:+33559275031"
                className="text-sm text-pau-night/70 hover:opacity-70 transition-opacity duration-200"
              >
                +33 5 59 27 50 31
              </a>
              <p className="text-xs text-pau-night/40 mt-2">Lundi — vendredi, 9h — 18h</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
