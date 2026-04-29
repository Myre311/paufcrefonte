import Link from 'next/link';
import Reveal from '@/components/animations/Reveal';

const STATS = [
  { value: '5 500', label: 'abonnés' },
  { value: '19', label: 'matchs domicile' },
  { value: '11 800', label: 'places' },
];

export default function BilletterieTeaser() {
  return (
    <section
      className="py-12 md:py-20 bg-pau-white"
      aria-label="Billetterie"
    >
      <Reveal>
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-4">
            BILLETTERIE OFFICIELLE
          </p>
          <h2 className="font-display uppercase text-3xl md:text-4xl text-pau-night leading-tight mb-4">
            ABONNEMENTS SAISON 26–27
          </h2>
          <p className="text-base font-sans text-pau-night/70 leading-relaxed max-w-md mb-6">
            Rejoins les supporters du Pau FC pour toute la saison. Accès prioritaire, tarifs avantageux
            et places garanties pour tous les matchs à domicile au Nouste Camp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/billetterie/abonnements"
              className="bg-pau-night text-pau-white px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:bg-pau-yellow hover:text-pau-night transition-colors duration-200 text-center"
            >
              ABONNEMENTS
            </Link>
            <Link
              href="/billetterie"
              className="border border-pau-night text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:bg-pau-night hover:text-pau-white transition-colors duration-200 text-center"
            >
              MATCH À L'UNITÉ
            </Link>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-pau-night/10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="py-8 first:pt-0 last:pb-0">
              <p className="font-display tabular-nums text-4xl md:text-5xl text-pau-yellow leading-none mb-2">
                {value}
              </p>
              <p className="text-sm font-sans uppercase tracking-widest text-pau-night/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
