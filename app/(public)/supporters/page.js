import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Supporters — Pau Football Club',
  description:
    'Rejoins la communauté des supporters du Pau FC : groupes officiels, charte du supporter, déplacements organisés et adhésion.',
};

const GROUPES = [
  {
    nom: 'Tribu Béarnaise',
    lieu: 'Pau — Brasserie du Palais, place Royale',
    texte:
      'Fondée en 2008, la Tribu Béarnaise est le plus ancien groupe de supporters du Pau FC. Elle anime la tribune Sud lors des matchs à domicile et organise des déplacements collectifs sur toute la France. Esprit familial, accueil ouvert à tous.',
  },
  {
    nom: 'Pau FC Family',
    lieu: 'Pau — Bar Le Corner, rue Carnot',
    texte:
      'Groupe orienté familles et jeunes supporters. La Pau FC Family propose des animations avant-match au Nouste Camp, des ateliers pour enfants les jours de rencontre et un programme d\'initiation au football pour les 6-10 ans.',
  },
  {
    nom: 'Fanion 64',
    lieu: 'Jurançon — Café des Sports',
    texte:
      'Né à Jurançon, Fanion 64 fédère les supporters des communes autour de Pau. Très actif sur les déplacements à l\'extérieur, le groupe est connu pour sa banderole en tribune visiteurs et son ambiance sonore dans les stades adverses.',
  },
  {
    nom: 'Section Jeunes',
    lieu: 'Pau — Campus Universitaire',
    texte:
      'La Section Jeunes regroupe les étudiants et les moins de 26 ans autour du Pau FC. Elle négocie des tarifs réduits, organise des aftermatch et fait le lien entre l\'académie et les tribunes. Une énergie nouvelle bienvenue dans les virages.',
  },
];

const CHARTE = [
  {
    numero: '01',
    point: 'Respect',
    detail:
      'Respecte les joueurs, les arbitres, les adversaires et tous les membres du staff. Le Nouste Camp est un espace où chacun doit se sentir en sécurité, quelle que soit sa couleur de maillot.',
  },
  {
    numero: '02',
    point: 'Fair-play',
    detail:
      'Encourage ton équipe sans insulter l\'adversaire. La ferveur ne se confond pas avec l\'agressivité. Le Pau FC attend de ses supporters qu\'ils représentent le club avec dignité.',
  },
  {
    numero: '03',
    point: 'Soutien',
    detail:
      'Soutiens l\'équipe dans la victoire comme dans la défaite. La fidélité d\'un supporter se mesure dans les moments difficiles autant que dans les soirs de fête.',
  },
  {
    numero: '04',
    point: 'Engagement',
    detail:
      'Participe activement à la vie du club et de ton groupe. Présence aux matchs, aux déplacements, aux événements supporters : ton engagement fait la force de la communauté.',
  },
  {
    numero: '05',
    point: 'Représentation',
    detail:
      'En déplacement, tu représentes le Pau FC et le Béarn. Ton comportement dans les stades adverses forge l\'image du club à l\'extérieur. Sois l\'ambassadeur d\'un club exemplaire.',
  },
];

export default function SupportersPage() {
  return (
    <>
      <section
        className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10"
        aria-label="En-tête supporters"
      >
        <Image
          src="/images/hero-accueil.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            LA COMMUNAUTÉ DU PAU FC
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            SUPPORTERS
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            ASSOCIATIONS AGRÉÉES
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            GROUPES OFFICIELS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-pau-night/10">
            {GROUPES.map(({ nom, lieu, texte }) => (
              <article
                key={nom}
                className="bg-pau-white p-8 md:p-12 flex flex-col"
              >
                <h3 className="font-display text-xl uppercase text-pau-night mb-2 tracking-wide">
                  {nom}
                </h3>
                <p className="text-xs uppercase tracking-widest text-pau-yellow mb-6 font-sans">
                  {lieu}
                </p>
                <p className="text-pau-night/60 text-sm leading-relaxed mb-8 flex-1">{texte}</p>
                <Link
                  href="#"
                  className="text-sm uppercase tracking-widest text-pau-night underline hover:opacity-70 transition-opacity duration-200 self-start"
                  aria-label={`En savoir plus sur ${nom}`}
                >
                  EN SAVOIR PLUS &rarr;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            NOS ENGAGEMENTS
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            CHARTE DU SUPPORTER
          </h2>
          <ol className="flex flex-col divide-y divide-pau-night/10" aria-label="Charte du supporter Pau FC">
            {CHARTE.map(({ numero, point, detail }) => (
              <li
                key={numero}
                className="py-10 md:py-12 flex flex-col md:flex-row md:items-start gap-6 md:gap-16"
              >
                <span
                  className="font-display text-4xl text-pau-yellow leading-none md:w-16 shrink-0"
                  aria-hidden="true"
                >
                  {numero}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase text-pau-night mb-2">
                    {point}
                  </h3>
                  <p className="text-pau-night/70 leading-relaxed max-w-2xl">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            MATCHS À L'EXTÉRIEUR
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            DÉPLACEMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                Le Pau FC organise et soutient les déplacements de ses supporters lors des matchs
                à l'extérieur. En partenariat avec les groupes officiels, le club met en place
                des convois en car au départ de Pau pour les rencontres en déplacement sur le
                territoire national.
              </p>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                Ces déplacements sont ouverts à tous les supporters, membres d'un groupe ou
                individuels. Ils constituent l'un des moments forts de la vie communautaire
                autour du club : retrouvailles, ferveur collective et représentation fière du
                Béarn sur tous les terrains de France.
              </p>
              <p className="text-pau-night/70 leading-relaxed">
                La liste des déplacements organisés est publiée sur le site officiel et l'application
                mobile dès la confirmation du calendrier. Les inscriptions sont ouvertes jusqu'à
                72 heures avant le départ, sous réserve de places disponibles.
              </p>
            </div>
            <div className="border border-pau-night/10 p-8 md:p-10">
              <h3 className="font-display text-xl uppercase text-pau-night mb-8">
                INFORMATIONS PRATIQUES
              </h3>
              <dl className="flex flex-col gap-6">
                {[
                  {
                    label: 'Réservation',
                    valeur:
                      'Via le formulaire en ligne ou directement auprès de ton groupe de supporters. Place confirmée à réception du paiement.',
                  },
                  {
                    label: 'Tarifs',
                    valeur:
                      'Entre 15 et 45 euros selon la distance, avec tarif réduit pour les moins de 26 ans et les titulaires d\'un abonnement saison.',
                  },
                  {
                    label: 'Modalités',
                    valeur:
                      'Départ depuis le parvis du Nouste Camp ou un point de ralliement défini. Heure de départ communiquée 48h avant le match.',
                  },
                ].map(({ label, valeur }) => (
                  <div key={label} className="border-b border-pau-night/10 pb-6 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-widest text-pau-night/50 font-sans mb-2">
                      {label}
                    </dt>
                    <dd className="text-pau-night/70 text-sm leading-relaxed">{valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="bg-pau-primary px-8 md:px-16 py-16 md:py-20">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-6 font-sans">
              REJOINDRE LA COMMUNAUTÉ
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-pau-white mb-4 max-w-2xl leading-tight">
              DEVENIR MEMBRE
            </h2>
            <p className="text-white/70 leading-relaxed max-w-xl mb-6">
              Tu souhaites rejoindre un groupe de supporters officiel du Pau FC ? Prends contact
              avec nous via le formulaire ci-dessous en précisant le groupe qui t'intéresse. Nos
              coordinateurs supporters te mettront en relation dans les plus brefs délais. Bienvenue
              dans la famille béarnaise.
            </p>
            <Link
              href="/contact?sujet=supporters"
              className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
            >
              REJOINDRE UN CLUB DE SUPPORTERS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
