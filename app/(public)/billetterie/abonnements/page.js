import Image from 'next/image';
import Link from 'next/link';
import { Users, Star, Calendar, Tag } from 'lucide-react';

const RAISONS = [
  {
    icon: Calendar,
    titre: 'Tous les matchs a domicile',
    texte:
      'Acces garanti a chaque rencontre a Nouste Camp tout au long de la saison, sans te soucier des ventes de billets.',
  },
  {
    icon: Tag,
    titre: 'Le meilleur tarif',
    texte:
      'Jusqu\'a 40 % d\'economie par rapport aux billets au match. Plus tu es fidele, plus tu gagnes.',
  },
  {
    icon: Star,
    titre: 'Ta place reservee',
    texte:
      'Ton siege t\'appartient. Retrouve les memes voisins, le meme repere, match apres match.',
  },
  {
    icon: Users,
    titre: 'Priorite aux nouvelles rencontres',
    texte:
      'Acces prioritaire a la billetterie pour les coupes et les matchs exceptionnels avant l\'ouverture au grand public.',
  },
];

const FORMULES = [
  {
    nom: 'Tribune Centrale',
    prix: 250,
    avantages: [
      'Siege numerote en tribune centrale',
      'Acces a toutes les rencontres domicile',
      'Reduction 10 % en boutique',
      'Newsletter abonne en exclusivite',
    ],
  },
  {
    nom: 'Tribune Laterale',
    prix: 150,
    avantages: [
      'Siege numerote en tribune laterale',
      'Acces a toutes les rencontres domicile',
      'Reduction 5 % en boutique',
      'Newsletter abonne en exclusivite',
    ],
  },
  {
    nom: 'Virage',
    prix: 90,
    avantages: [
      'Acces en virage (placement libre)',
      'Acces a toutes les rencontres domicile',
      'Ambiance supporters garantie',
      'Newsletter abonne en exclusivite',
    ],
  },
];

const FAQ = [
  {
    q: 'Quand les abonnements sont-ils en vente ?',
    r: 'Les abonnements ouvrent generalement en juin pour la saison suivante. Inscris-toi a la newsletter pour etre prevenu en premier.',
  },
  {
    q: 'Puis-je changer de place en cours de saison ?',
    r: 'Un changement de place est possible en debut de saison sous reserve de disponibilite. Contacte-nous via le formulaire contact.',
  },
  {
    q: 'Mon abonnement est-il nominatif ?',
    r: 'Oui, l\'abonnement est nominatif et non cessible. Il te donne acces au stade via ton billet dematerialise personnel.',
  },
  {
    q: 'Comment puis-je renouveler mon abonnement ?',
    r: 'Les abonnes de la saison precedente beneficient d\'une periode de renouvellement prioritaire avant l\'ouverture au grand public.',
  },
  {
    q: 'Y a-t-il un abonnement jeunes ?',
    r: 'Les moins de 18 ans beneficient du tarif Virage a 50 € en presentant un justificatif lors du retrait de la carte.',
  },
];

export default function AbonnementsPage() {
  return (
    <div className="bg-pau-white min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-billetterie.jpg"
          alt="Abonnements Pau FC saison 2026-27"
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            SAISON 2026-27
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            ABONNEMENTS
          </h1>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            POURQUOI S'ABONNER
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {RAISONS.map((raison) => {
              const Icon = raison.icon;
              return (
                <div key={raison.titre} className="flex gap-6">
                  <div className="shrink-0">
                    <Icon size={20} className="text-pau-yellow mt-1" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold uppercase tracking-wider text-pau-night mb-2">
                      {raison.titre}
                    </h3>
                    <p className="text-sm font-sans text-pau-night/70 leading-relaxed">
                      {raison.texte}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            FORMULES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FORMULES.map((formule) => (
              <div
                key={formule.nom}
                className="border border-pau-night/10 p-8 hover:bg-pau-night/[0.02] transition-colors"
              >
                <h3 className="font-display text-xl uppercase text-pau-night mb-4">
                  {formule.nom}
                </h3>
                <p className="font-display text-4xl text-pau-night mb-4">
                  {formule.prix} €
                </p>
                <ul className="space-y-3 mb-8">
                  {formule.avantages.map((av) => (
                    <li key={av} className="flex gap-3 text-sm font-sans text-pau-night/70">
                      <span className="text-pau-yellow shrink-0 mt-0.5" aria-hidden="true">—</span>
                      {av}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact?sujet=abonnement"
                  className="block text-center bg-pau-yellow text-pau-night px-6 py-3 font-sans font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity"
                >
                  JE M'ABONNE
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            QUESTIONS FREQUENTES
          </h2>
          <dl className="space-y-0">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="border-t border-pau-night/10 group"
              >
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none hover:bg-pau-night/[0.02] px-0 transition-colors">
                  <span className="font-sans font-semibold text-pau-night uppercase tracking-wider text-sm">
                    {item.q}
                  </span>
                  <span
                    className="shrink-0 text-pau-night/40 text-lg leading-none group-open:rotate-45 transition-transform"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-6">
                  <p className="text-sm font-sans text-pau-night/70 leading-relaxed max-w-2xl">
                    {item.r}
                  </p>
                </div>
              </details>
            ))}
            <div className="border-t border-pau-night/10" aria-hidden="true" />
          </dl>
        </div>
      </section>
    </div>
  );
}
