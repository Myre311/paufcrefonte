import Image from 'next/image';
import JerseyCustomizer from '@/components/customizer/JerseyCustomizer';

export const dynamic = 'force-dynamic';

export default function PersonnalisationPage() {
  return (
    <div className="bg-pau-white text-pau-night min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-boutique.jpg"
          alt="Personnalise ton maillot Pau FC"
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            PERSONNALISE TON MAILLOT
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            CONFIGURATEUR
          </h1>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <JerseyCustomizer />
        </div>
      </section>
    </div>
  );
}
