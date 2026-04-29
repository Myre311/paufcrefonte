import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/animations/Reveal';

export const metadata = {
  title: 'Le Club — Pau Football Club',
  description: 'Découvrez le Pau Football Club : histoire, valeurs, staff et Nouste Camp.',
};

const VALEURS = [
  {
    titre: 'Collectif',
    texte:
      'Ici, chaque titre, chaque montée, chaque exploit est l\'œuvre d\'un groupe. Le club avant les individus, toujours.',
  },
  {
    titre: 'Excellence',
    texte:
      'L\'exigence au quotidien : à l\'entraînement, en match et dans toutes les structures du club. Progresser ne s\'arrête pas.',
  },
  {
    titre: 'Territoire',
    texte:
      'Pau FC est ancré dans le Béarn et les Pyrénées-Atlantiques. La fierté régionale est notre carburant.',
  },
  {
    titre: 'Intégrité',
    texte:
      'Un club qui dit ce qu\'il fait et fait ce qu\'il dit. Respect des adversaires, des arbitres, des supporters, de l\'institution.',
  },
];

const STAFF_PLACEHOLDER = [
  { nom: 'Prénom Nom', role: 'Entraîneur principal' },
  { nom: 'Prénom Nom', role: 'Entraîneur adjoint' },
  { nom: 'Prénom Nom', role: 'Préparateur physique' },
];

export default function ClubPage() {
  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-club.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            DEPUIS 1920
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            LE CLUB
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
                NOTRE HISTOIRE
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-6">
                PLUS D'UN SIÈCLE DE FOOTBALL
              </h2>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                Fondé en 1920 au pied des Pyrénées, le Pau Football Club a traversé un siècle
                d'histoire sportive avec la même passion : représenter fièrement le Béarn sur tous
                les terrains de France. De la Division d'Honneur aux portes de la Ligue 2, le club
                a su forger une identité forte, construite sur la fidélité à ses valeurs et
                l'attachement à son territoire.
              </p>
              <p className="text-pau-night/70 leading-relaxed mb-10">
                La rénovation du Nouste Camp en 2022 et les ambitions affichées pour la saison
                2026-27 témoignent d'un projet de club sérieux et ambitieux, ancré dans le présent
                et tourné vers l'avenir.
              </p>
              <Link
                href="/club/histoire"
                className="text-sm uppercase tracking-widest text-pau-night underline hover:opacity-70 transition-opacity duration-200"
              >
                Découvrir l'histoire &rarr;
              </Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden bg-pau-primary">
              <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            NOS ENGAGEMENTS
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            NOS VALEURS
          </h2>
          <ul className="flex flex-col divide-y divide-pau-night/10">
            {VALEURS.map(({ titre, texte }) => (
              <li key={titre} className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-20">
                <h3 className="font-display text-xl uppercase text-pau-night md:w-56 shrink-0">
                  {titre}
                </h3>
                <p className="text-pau-night/70 leading-relaxed max-w-2xl">{texte}</p>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            L'ENCADREMENT
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            STAFF SPORTIF
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 mb-8">
            {STAFF_PLACEHOLDER.map(({ nom, role }) => (
              <div key={role} className="flex flex-col">
                <div className="aspect-[3/4] bg-pau-primary mb-4" aria-hidden="true" />
                <p className="font-sans font-semibold text-sm uppercase tracking-wider text-pau-night">
                  {nom}
                </p>
                <p className="text-xs text-pau-night/50 mt-1">{role}</p>
              </div>
            ))}
          </div>
          <Link
            href="/club/staff"
            className="text-sm uppercase tracking-widest text-pau-night underline hover:opacity-70 transition-opacity duration-200"
          >
            Voir le staff complet &rarr;
          </Link>
        </div>
        </Reveal>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="relative overflow-hidden bg-pau-primary min-h-[320px] flex items-center justify-center">
            <div className="relative z-10 text-center px-6 py-16">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 font-sans">
                NOTRE ENCEINTE
              </p>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-pau-white mb-6">
                NOUSTE CAMP
              </h2>
              <Link
                href="/club/nouste-camp"
                className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
              >
                DÉCOUVRIR LE STADE
              </Link>
            </div>
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}
