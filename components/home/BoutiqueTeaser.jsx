import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';

export default function BoutiqueTeaser() {
  return (
    <section className="border-t border-pau-night/10" aria-label="Boutique officielle">
      <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden bg-pau-primary group">
          <Image
            src="/images/homepage/maillot-ext-dom.jpg"
            alt="Maillots saison 26/27"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-pau-night/50" aria-hidden="true" />
          <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14">
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-white/60 mb-3">
              MAILLOTS 26/27
            </p>
            <h2 className="font-display uppercase text-4xl md:text-6xl text-pau-white leading-none mb-5">
              COLLECTION OFFICIELLE
            </h2>
            <Link
              href="/boutique?cat=maillots"
              className="inline-block text-sm font-sans uppercase tracking-wider text-pau-yellow border-b border-pau-yellow/40 hover:border-pau-yellow pb-0.5 transition-colors duration-200"
            >
              VOIR LA COLLECTION →
            </Link>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden bg-pau-primary group">
          <Image
            src="/images/homepage/Boutique.png"
            alt="Personnalise ton maillot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-pau-night/50" aria-hidden="true" />
          <div className="absolute bottom-10 left-10 md:bottom-14 md:left-14">
            <p className="text-xs font-sans uppercase tracking-[0.25em] text-white/60 mb-3">
              PERSONNALISE TON MAILLOT
            </p>
            <h2 className="font-display uppercase text-4xl md:text-6xl text-pau-white leading-none mb-5">
              TON NOM.<br />TON NUMÉRO.
            </h2>
            <Link
              href="/boutique/personnalisation"
              className="inline-block text-sm font-sans uppercase tracking-wider text-pau-yellow border-b border-pau-yellow/40 hover:border-pau-yellow pb-0.5 transition-colors duration-200"
            >
              PERSONNALISER →
            </Link>
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  );
}
