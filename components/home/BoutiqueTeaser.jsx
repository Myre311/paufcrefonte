import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/animations/Reveal';

export default function BoutiqueTeaser() {
  return (
    <section className="border-t border-pau-night/10" aria-label="Boutique officielle">
      <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden bg-pau-primary">
          <Image
            src="/images/homepage/maillot-ext-dom.jpg"
            alt="Maillots saison 26/27"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pau-night/40" aria-hidden="true" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-white/60 mb-2">
              MAILLOTS 26/27
            </p>
            <h2 className="font-display uppercase text-2xl md:text-3xl text-pau-white leading-tight mb-3">
              COLLECTION OFFICIELLE
            </h2>
            <Link
              href="/boutique?cat=maillots"
              className="text-sm font-sans uppercase tracking-wider text-pau-yellow underline hover:text-white transition-colors duration-200"
            >
              VOIR LA COLLECTION →
            </Link>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-auto md:min-h-[500px] overflow-hidden bg-pau-primary">
          <Image
            src="/images/homepage/Boutique.png"
            alt="Personnalise ton maillot"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-pau-night/40" aria-hidden="true" />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
            <p className="text-xs font-sans uppercase tracking-[0.2em] text-white/60 mb-2">
              PERSONNALISE TON MAILLOT
            </p>
            <h2 className="font-display uppercase text-2xl md:text-3xl text-pau-white leading-tight mb-3">
              TON NOM. TON NUMÉRO.
            </h2>
            <Link
              href="/boutique/personnalisation"
              className="text-sm font-sans uppercase tracking-wider text-pau-yellow underline hover:text-white transition-colors duration-200"
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
