import Image from 'next/image';

const ETAPES = [
  {
    numero: '01',
    titre: 'Recharge ton compte',
    texte:
      'Credite ton bracelet cashless en ligne avant le match ou aux bornes de recharge a l\'entree du stade. Montant minimum 10 €.',
  },
  {
    numero: '02',
    titre: 'Achete sans contact',
    texte:
      'Restauration, buvettes, boutique stade et stands partenaires : un simple effleurement de ton bracelet suffit.',
  },
  {
    numero: '03',
    titre: 'Recupere ton solde',
    texte:
      'Apres le match, le solde restant te sera rembourse sous 30 jours via le portail cashless ou reporte sur la prochaine rencontre.',
  },
];

const ZONES = [
  'Buvette Tribune Centrale',
  'Buvette Tribune Laterale',
  'Buvette Virage Nord',
  'Buvette Virage Sud',
  'Restauration VIP',
  'Boutique Nouste Camp',
  'Stands partenaires food',
  'Vestiaires juniors',
];

export default function CashlessPage() {
  return (
    <div className="bg-pau-white min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-billetterie.jpg"
          alt="Cashless Nouste Camp"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            PAIEMENT SANS CONTACT AU STADE
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            CASHLESS
          </h1>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            COMMENT CA MARCHE ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ETAPES.map((etape) => (
              <div key={etape.numero}>
                <p
                  className="font-display text-5xl md:text-6xl text-pau-night/10 leading-none mb-3"
                  aria-hidden="true"
                >
                  {etape.numero}
                </p>
                <h3 className="font-sans font-semibold uppercase tracking-wider text-pau-night mb-3">
                  {etape.titre}
                </h3>
                <p className="text-sm font-sans text-pau-night/70 leading-relaxed">
                  {etape.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            OU CA MARCHE ?
          </h2>
          <p className="text-sm font-sans text-pau-night/60 mb-8 uppercase tracking-widest">
            Zones acceptant le cashless au Nouste Camp
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {ZONES.map((zone) => (
              <li
                key={zone}
                className="border-t border-pau-night/10 py-4 text-sm font-sans text-pau-night/80 uppercase tracking-wider flex items-center gap-3"
              >
                <span className="w-1.5 h-1.5 bg-pau-yellow shrink-0" aria-hidden="true" />
                {zone}
              </li>
            ))}
            <li className="border-t border-pau-night/10 md:col-span-2" aria-hidden="true" />
          </ul>
        </div>
      </section>
    </div>
  );
}
