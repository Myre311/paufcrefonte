import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Académie — Pau Football Club',
  description:
    'Découvrez le centre de formation du Pau Football Club : philosophie, parcours U13 à U19, encadrement et infrastructures.',
};

const PARCOURS = [
  {
    categorie: 'U13',
    titre: 'Les bases du jeu',
    texte:
      'Dès 11 ans, les jeunes recrues intègrent un programme axé sur la technique individuelle, la coordination et le plaisir du jeu. L\'accent est mis sur la découverte des fondamentaux tactiques dans un environnement bienveillant et stimulant.',
  },
  {
    categorie: 'U15',
    titre: 'Construction collective',
    texte:
      'La catégorie U15 marque l\'entrée dans une phase de structuration collective. Les jeunes joueurs approfondissent leur compréhension du jeu en équipe, développent leur intelligence tactique et sont initiés aux exigences de la haute performance.',
  },
  {
    categorie: 'U17',
    titre: 'Affirmation du style',
    texte:
      'En U17, chaque joueur est accompagné dans l\'affirmation de son profil sportif. L\'intensité des entraînements augmente, les compétitions régionales et nationales deviennent le terrain d\'expression d\'un collectif déjà exigeant.',
  },
  {
    categorie: 'U19',
    titre: 'Tremplin professionnel',
    texte:
      'Dernière étape avant le monde professionnel, la catégorie U19 prépare les talents à intégrer le groupe pro ou à rejoindre des clubs partenaires. Rigueur, régularité et maturité sont les maîtres-mots de cette saison charnière.',
  },
];

const POLE = [
  {
    titre: 'Encadrement',
    texte:
      'L\'académie s\'appuie sur un staff de formateurs diplômés d\'État, assistants coordinateurs et préparateurs physiques dédiés. Chaque éducateur est recruté pour sa compétence technique et sa capacité à accompagner des jeunes dans leur développement global. Les bilans individuels sont réalisés chaque trimestre en lien direct avec les familles.',
  },
  {
    titre: 'Infrastructures',
    texte:
      'Les jeunes du centre de formation bénéficient d\'un accès prioritaire aux pelouses d\'entraînement du complexe sportif annexe du Nouste Camp. Les installations comprennent deux terrains en gazon naturel, un terrain synthétique éclairé, une salle de musculation adaptée aux mineurs et un espace vidéo dédié à l\'analyse tactique.',
  },
  {
    titre: 'Suivi scolaire',
    texte:
      'La réussite scolaire est une condition non négociable au sein de l\'académie. Un partenariat avec plusieurs établissements palois permet d\'aménager les emplois du temps, d\'assurer un tutorat régulier et de faciliter les déplacements en compétition. Un coordinateur scolaire dédié fait le lien entre le club, les enseignants et les familles.',
  },
];

export default function AcademiePage() {
  return (
    <>
      <section
        className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10"
        aria-label="En-tête académie"
      >
        <Image
          src="/images/hero-academy.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            FORMATION
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            ACADÉMIE PAU FC
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
                PRÉSENTATION
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-6">
                FORMER LES TALENTS DE DEMAIN
              </h2>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                L'académie du Pau Football Club est bien plus qu'un simple centre de formation.
                C'est un projet éducatif global, pensé pour accompagner des jeunes joueurs dans
                leur développement sportif, humain et scolaire. Depuis sa création, elle a pour
                mission de révéler les talents du Béarn et des Pyrénées-Atlantiques, tout en
                accueillant les meilleurs profils nationaux capables de s'épanouir dans notre
                culture de club.
              </p>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                Notre philosophie de formation repose sur trois piliers indissociables : la
                maîtrise technique individuelle, l'intelligence collective et la construction du
                caractère. Nous croyons fermement qu'un grand joueur est d'abord un grand
                compétiteur, capable de se dépasser dans l'adversité et de porter les valeurs
                du groupe au-delà de sa propre performance.
              </p>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                L'encadrement est assuré par des éducateurs diplômés d'État, choisis autant pour
                leur expertise footballistique que pour leur capacité à transmettre et à élever
                les jeunes. Chaque entraîneur inscrit son travail dans le projet de jeu du club
                professionnel, garantissant une continuité pédagogique de l'U13 jusqu'au groupe
                professionnel.
              </p>
              <p className="text-pau-night/70 leading-relaxed">
                L'objectif est clair : faire émerger des joueurs formés localement capables
                d'intégrer l'effectif professionnel ou de rejoindre des clubs de haut niveau.
                Plusieurs anciens pensionnaires de l'académie évoluent aujourd'hui en Ligue 2
                et en National, preuve que la méthode Pau FC porte ses fruits.
              </p>
            </div>
            <div
              className="aspect-[4/3] bg-pau-primary"
              role="img"
              aria-label="Centre de formation Pau FC"
            />
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-6 font-sans">
            LES CATÉGORIES
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            PARCOURS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-pau-night/10">
            {PARCOURS.map(({ categorie, titre, texte }) => (
              <article
                key={categorie}
                className="bg-pau-white p-8 md:p-10 flex flex-col"
              >
                <span className="font-display text-3xl text-pau-yellow mb-2 leading-none">
                  {categorie}
                </span>
                <h3 className="font-display text-lg uppercase text-pau-night mb-4 tracking-wide">
                  {titre}
                </h3>
                <p className="text-pau-night/60 text-sm leading-relaxed">{texte}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-6 font-sans">
            NOS RESSOURCES
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            PÔLE FORMATION
          </h2>
          <div className="flex flex-col divide-y divide-pau-night/10">
            {POLE.map(({ titre, texte }) => (
              <div
                key={titre}
                className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-20"
              >
                <h3 className="font-display text-xl uppercase text-pau-night md:w-64 shrink-0">
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
          <div className="bg-pau-primary px-8 md:px-16 py-16 md:py-20">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-sans">
              INTÉGRER L'ACADÉMIE
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-pau-white mb-4 max-w-2xl leading-tight">
              REJOINDRE L'ACADÉMIE
            </h2>
            <p className="text-white/70 leading-relaxed max-w-xl mb-6">
              Tu es joueur ou tu souhaites présenter ton enfant à nos équipes de détection ?
              Remplis notre formulaire de candidature. Les périodes de détection ont lieu en
              fin de saison, entre mai et juin. Notre coordinateur de formation te recontactera
              sous 72 heures pour préciser les modalités d'évaluation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?sujet=academie"
                className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
              >
                DÉPÔT DE CANDIDATURE
              </Link>
              <Link
                href="/club"
                className="inline-block border border-white/20 text-pau-white px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors duration-200"
              >
                DÉCOUVRIR LE CLUB
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
