import Image from 'next/image';

export const metadata = {
  title: 'Nouste Camp — Pau Football Club',
  description: 'Découvrez le Nouste Camp, stade du Pau Football Club à Pau, rénové en 2022.',
};

const INFOS = [
  { label: 'Capacité', valeur: '11 800 places' },
  { label: 'Inauguration', valeur: '1967 — Rénové 2022' },
  { label: 'Pelouse', valeur: 'Gazon naturel' },
  { label: 'Adresse', valeur: 'Boulevard du Cami Salié, 64000 Pau' },
];

const ESPACES = [
  {
    titre: 'Tribunes',
    texte:
      'Quatre tribunes couvrant l\'intégralité du terrain : Tribune Centrale, Tribune Latérale, Virage Nord et Virage Sud. Chaque espace est pensé pour offrir une visibilité optimale et une acoustique naturelle propice à la ferveur.',
  },
  {
    titre: 'Hospitalités',
    texte:
      'Des loges et espaces VIP rénovés accueillent partenaires et invités dans un cadre premium, avec restauration sur place, vue directe sur le terrain et service dédié tout au long du match.',
  },
  {
    titre: 'Restauration',
    texte:
      'Buvettes réparties sur l\'ensemble du stade, points de vente alimentaires et stands partenaires food. Paiement exclusivement par cashless. Ouverture 1h30 avant le coup d\'envoi.',
  },
  {
    titre: 'Accessibilité',
    texte:
      'Le Nouste Camp est intégralement accessible aux personnes à mobilité réduite. Des places dédiées PMR sont disponibles dans chaque tribune, avec accès prioritaire aux ascenseurs et sanitaires adaptés.',
  },
];

export default function NousteCampPage() {
  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-stade.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            NOTRE ENCEINTE
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            NOUSTE CAMP
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-pau-night/10">
            {INFOS.map(({ label, valeur }) => (
              <div key={label} className="bg-pau-white px-8 py-10 flex flex-col">
                <dt className="text-xs uppercase tracking-widest text-pau-night/50 font-sans mb-3">
                  {label}
                </dt>
                <dd className="font-display text-xl md:text-2xl uppercase text-pau-night leading-snug">
                  {valeur}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            L'ENCEINTE
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-10">
            LES ESPACES
          </h2>
          <div className="flex flex-col divide-y divide-pau-night/10">
            {ESPACES.map(({ titre, texte }) => (
              <div
                key={titre}
                className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-20"
              >
                <h3 className="font-display text-xl uppercase text-pau-night md:w-56 shrink-0">
                  {titre}
                </h3>
                <p className="text-pau-night/70 leading-relaxed max-w-2xl">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            ACCÈS
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            VENIR AU STADE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                ADRESSE
              </p>
              <address className="not-italic text-sm text-pau-night/70 leading-relaxed">
                Stade Nouste Camp<br />
                Boulevard du Cami Salié<br />
                64000 Pau
              </address>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                EN TRANSPORTS
              </p>
              <p className="text-sm text-pau-night/70 leading-relaxed">
                Bus lignes 3 et 7 — arrêt Nouste Camp.<br />
                Gare de Pau à 15 min à pied.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-pau-night/50 mb-3 font-sans">
                EN VOITURE
              </p>
              <p className="text-sm text-pau-night/70 leading-relaxed">
                Parking gratuit sur place les jours de match.<br />
                Accès depuis le boulevard du Cami Salié.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
