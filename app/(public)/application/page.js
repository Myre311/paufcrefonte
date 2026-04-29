import Image from 'next/image';
import Link from 'next/link';
import { Bell, Ticket, Calendar, ShoppingBag, Newspaper, Users } from 'lucide-react';

export const metadata = {
  title: 'Application mobile — Pau Football Club',
  description:
    'Télécharge l\'application officielle du Pau FC sur iOS et Android pour suivre l\'actualité, gérer tes billets et rester connecté au club.',
};

const FEATURES = [
  {
    Icon: Bell,
    titre: 'Notifications matchs',
    texte:
      'Reçois des alertes en temps réel : compositions d\'équipe, buts, cartons, résultat final. Ne rate plus aucun moment fort de tes Palois, même loin du stade.',
  },
  {
    Icon: Ticket,
    titre: 'Billetterie mobile',
    texte:
      'Achète tes places, présente-les directement depuis ton téléphone à l\'entrée du Nouste Camp. La billetterie dématérialisée est rapide, sécurisée et sans impression nécessaire.',
  },
  {
    Icon: Calendar,
    titre: 'Calendrier synchronisé',
    texte:
      'Synchronise le calendrier du Pau FC avec ton agenda personnel en un tap. Tous les matchs, toutes les compétitions, directement dans tes rappels.',
  },
  {
    Icon: ShoppingBag,
    titre: 'Boutique intégrée',
    texte:
      'Accède à la boutique officielle du club, commande le maillot de la saison, les accessoires et les équipements supporters depuis l\'application, avec livraison suivie.',
  },
  {
    Icon: Newspaper,
    titre: 'Actualités en direct',
    texte:
      'Toutes les infos du club en un seul endroit : communiqués officiels, interviews de joueurs, reportages exclusifs et conférences de presse publiés en priorité sur l\'app.',
  },
  {
    Icon: Users,
    titre: 'Communauté supporters',
    texte:
      'Rejoins les discussions de la communauté Pau FC, réagis aux matchs, partage tes photos du Nouste Camp et retrouve les informations sur les déplacements organisés.',
  },
];

const AVANTAGES = [
  {
    titre: 'Offres push-only',
    texte:
      'Certaines promotions sur la billetterie et la boutique sont réservées exclusivement aux utilisateurs de l\'application. Ces offres flash, diffusées uniquement par notification push, donnent accès à des tarifs préférentiels sur les matchs à forte demande.',
  },
  {
    titre: 'Accès aux places premium',
    texte:
      'Les abonnés de l\'application bénéficient d\'une fenêtre de prévente de 48 heures sur les hospitalities et les places en tribune VIP avant leur mise en vente au grand public.',
  },
  {
    titre: 'Contenus exclusifs',
    texte:
      'Accède à des documentaires, des coulisses d\'entraînement, des interviews longues et des avant-matchs filmés disponibles uniquement dans l\'espace membre de l\'application.',
  },
  {
    titre: 'Fidélité et récompenses',
    texte:
      'Chaque achat, chaque billet scanné et chaque interaction dans l\'app génère des points de fidélité échangeables contre des produits boutique, des places supplémentaires ou des expériences club.',
  },
  {
    titre: 'Alertes transferts et mercato',
    texte:
      'Sois le premier informé des nouvelles recrues, des prolongations et des départs. Les annonces officielles du club sont publiées sur l\'application avant tout autre canal.',
  },
];

const STATS = [
  { valeur: '4,7 / 5', label: 'Note moyenne' },
  { valeur: '+50 000', label: 'Téléchargements' },
  { valeur: '+200 000', label: 'Notifications / mois' },
  { valeur: 'Mensuelle', label: 'Fréquence de mise à jour' },
];

export default function ApplicationPage() {
  return (
    <>
      <section
        className="relative bg-pau-night min-h-[30vh] flex items-center overflow-hidden border-b border-pau-night/10"
        aria-label="En-tête application mobile"
      >
        <Image
          src="/images/placeholder-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3 font-sans">
                RESTE CONNECTÉ AU CLUB
              </p>
              <h1 className="font-display text-4xl md:text-5xl uppercase text-pau-white leading-none mb-6">
                APPLICATION MOBILE
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#app-store"
                  className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
                >
                  TÉLÉCHARGER iOS
                </a>
                <a
                  href="#play-store"
                  className="inline-block border border-white/20 text-pau-white px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors duration-200"
                >
                  TÉLÉCHARGER ANDROID
                </a>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div
                className="aspect-[9/19] bg-pau-night border border-white/10 max-w-[280px] w-full"
                role="img"
                aria-label="Aperçu de l'application mobile Pau FC"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            CE QUE TU TROUVES
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            FONCTIONNALITÉS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-pau-night/10">
            {FEATURES.map(({ Icon, titre, texte }) => (
              <article
                key={titre}
                className="bg-pau-white p-8 md:p-10 flex flex-col gap-4"
              >
                <Icon
                  className="w-6 h-6 text-pau-yellow shrink-0"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-pau-night">
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
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-4 font-sans">
            RÉSERVÉ AUX UTILISATEURS
          </p>
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            AVANTAGES EXCLUSIFS
          </h2>
          <div className="flex flex-col divide-y divide-pau-night/10">
            {AVANTAGES.map(({ titre, texte }) => (
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
              DISPONIBLE MAINTENANT
            </p>
            <h2 className="font-display text-3xl md:text-4xl uppercase text-pau-white mb-4 max-w-xl leading-tight">
              TÉLÉCHARGE L'APPLICATION
            </h2>
            <p className="text-white/70 leading-relaxed max-w-xl mb-6">
              Rejoins plus de 50 000 supporters déjà connectés au Pau FC. L'application est
              gratuite, disponible sur l'App Store et Google Play, et mise à jour chaque mois
              avec de nouvelles fonctionnalités.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href="#app-store"
                className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
              >
                TÉLÉCHARGER iOS
              </a>
              <a
                href="#play-store"
                className="inline-block border border-white/20 text-pau-white px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:bg-white/5 transition-colors duration-200"
              >
                TÉLÉCHARGER ANDROID
              </a>
            </div>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
              {STATS.map(({ valeur, label }) => (
                <div key={label} className="bg-pau-primary px-6 py-8">
                  <dt className="text-xs uppercase tracking-widest text-white/50 font-sans mb-2">
                    {label}
                  </dt>
                  <dd className="font-display text-2xl md:text-3xl text-pau-yellow leading-none">
                    {valeur}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
