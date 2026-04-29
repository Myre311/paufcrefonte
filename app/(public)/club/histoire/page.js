import Image from 'next/image';

export const metadata = {
  title: 'Histoire — Pau Football Club',
  description: 'L\'histoire du Pau Football Club depuis sa fondation en 1920.',
};

const JALONS = [
  {
    annee: '1920',
    titre: 'Fondation du club',
    texte:
      "Le Pau Football Club voit le jour dans la capitale du Béarn, à l'initiative d'un groupe de passionnés désireux d'offrir un club de football professionnel à la ville. Les premières années sont consacrées à bâtir les fondations sportives et institutionnelles du club.",
  },
  {
    annee: '1960',
    titre: 'Montée dans le professionnalisme',
    texte:
      "Après quarante ans d'efforts, le club accède pour la première fois au championnat professionnel. Une date gravée dans les mémoires des supporters béarnais, qui remplissent le stade à chaque rencontre.",
  },
  {
    annee: '1980',
    titre: 'Années de consolidation',
    texte:
      "Le Pau FC traverse une décennie de stabilisation, investissant dans la formation et les infrastructures. Le centre d'entraînement est agrandi, posant les bases d'une académie durable.",
  },
  {
    annee: '2000',
    titre: 'Retour aux racines',
    texte:
      "Après plusieurs saisons difficiles, une nouvelle direction prend les rênes du club avec un projet clair : ancrer le Pau FC dans son territoire, miser sur les jeunes locaux et retrouver progressivement les niveaux d'excellence passés.",
  },
  {
    annee: '2020',
    titre: 'Ligue 2 — Un siècle, une montée',
    texte:
      "Pour le centenaire du club, le Pau FC réalise l'un des exploits les plus marquants de son histoire en accédant à la Ligue 2. Une montée saluée à l'échelle nationale, fierté de toute la région Nouvelle-Aquitaine.",
  },
  {
    annee: '2022',
    titre: 'Rénovation du Nouste Camp',
    texte:
      "Le stade historique du club entre dans une nouvelle ère. La rénovation porte sa capacité à 11 800 places, améliore les hospitalités, la restauration et l'accessibilité PMR, tout en conservant l'âme d'une enceinte à taille humaine.",
  },
  {
    annee: '2026',
    titre: 'Saison actuelle — Ambitions affirmées',
    texte:
      "Le Pau FC entame la saison 2026-27 avec des ambitions claires : s'installer durablement dans l'élite, développer son académie et renforcer son ancrage dans les Pyrénées-Atlantiques. Le meilleur reste à venir.",
  },
];

export default function HistoirePage() {
  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-histoire.jpg"
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
            L'HISTOIRE
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <ol className="relative" aria-label="Frise historique Pau FC">
            {JALONS.map(({ annee, titre, texte }, i) => (
              <li key={annee} className="relative flex gap-8 md:gap-16 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-px bg-pau-yellow flex-1 mt-2"
                    aria-hidden="true"
                    style={{ minHeight: i < JALONS.length - 1 ? '100%' : '0' }}
                  />
                  <div className="w-3 h-3 bg-pau-yellow shrink-0" aria-hidden="true" />
                  {i < JALONS.length - 1 && (
                    <div className="w-px bg-pau-yellow flex-1" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="font-display text-4xl md:text-5xl text-pau-yellow leading-none block mb-3">
                    {annee}
                  </span>
                  <h2 className="font-display text-lg md:text-xl uppercase text-pau-night mb-2">
                    {titre}
                  </h2>
                  <p className="text-pau-night/70 leading-relaxed max-w-2xl text-sm">{texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
