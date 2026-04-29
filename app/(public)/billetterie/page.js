import Image from 'next/image';
import { MapPin, Clock, Ticket } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

const TARIFS = [
  { nom: 'Plein tarif', prix: 25, description: 'Adulte de 18 ans et plus' },
  { nom: 'Reduit', prix: 15, description: 'Etudiant, demandeur d\'emploi' },
  { nom: 'Enfant', prix: 10, description: 'Moins de 12 ans' },
  { nom: 'Abonne', prix: 15, description: 'Tarif preferentiel abonne' },
  { nom: 'Groupe 10+', prix: 20, description: 'A partir de 10 personnes' },
  { nom: 'Pack famille', prix: 55, description: '2 adultes + 2 enfants' },
];

const INFOS = [
  {
    icon: MapPin,
    caption: 'ACCES',
    titre: 'Nouste Camp',
    texte:
      'Boulevard du Cami Salie, 64000 Pau. Parking gratuit disponible sur place. Accessible en bus lignes 3 et 7.',
  },
  {
    icon: Clock,
    caption: 'HORAIRES GUICHETS',
    titre: 'Ouverture 1h30 avant le coup d\'envoi',
    texte:
      'Les guichets ferment 15 minutes avant le coup d\'envoi. Vente en ligne disponible jusqu\'a la veille du match.',
  },
  {
    icon: Ticket,
    caption: 'MODALITES D\'ACHAT',
    titre: 'En ligne ou sur place',
    texte:
      'Achat en ligne via ce site ou directement aux guichets du stade. Paiement par carte ou en cashless. Billet demateriaise sur application.',
  },
];

async function getProchainsDomicile() {
  return prisma.match
    .findMany({
      where: {
        isHome: true,
        status: 'scheduled',
        kickoffAt: { gte: new Date() },
      },
      take: 6,
      orderBy: { kickoffAt: 'asc' },
    })
    .catch(() => []);
}

function formatDate(date) {
  return new Date(date)
    .toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
    .toUpperCase()
    .replace(/\./g, '');
}

function formatHeure(date) {
  return new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function BilletteriePage() {
  const matchs = await getProchainsDomicile();

  return (
    <div className="bg-pau-white min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-billetterie.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            VIBRE AU NOUSTE CAMP
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            BILLETTERIE
          </h1>
        </div>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            PROCHAINS MATCHS A DOMICILE
          </h2>

          {matchs.length === 0 ? (
            <p className="text-pau-night/40 font-sans py-16 text-center text-xl uppercase tracking-wider">
              Aucun match programmé
            </p>
          ) : (
            <ul>
              {matchs.map((match) => (
                <li key={match.id} className="border-t border-pau-night/10 hover:bg-pau-night/[0.02] transition-colors">
                  <div className="py-5 flex flex-col gap-3 md:grid md:grid-cols-[140px_1fr_auto] md:gap-6 md:items-center">
                    <div>
                      <span className="block font-display text-sm uppercase tracking-wider text-pau-night">
                        {formatDate(match.kickoffAt)}
                      </span>
                      <span className="block font-sans text-sm text-pau-night/60 mt-0.5">
                        {formatHeure(match.kickoffAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 relative shrink-0">
                        <Image
                          src="/images/homepage/Logo-Pau-FC-2023.png"
                          alt="Logo Pau FC"
                          fill
                          className="object-contain"
                          sizes="36px"
                        />
                      </div>
                      <span className="font-sans text-sm uppercase tracking-wider text-pau-night">
                        PAU FC
                      </span>
                      <span className="text-pau-night/30 text-xs font-sans">vs</span>
                      <div className="w-9 h-9 relative shrink-0">
                        {match.opponentLogo ? (
                          <Image
                            src={match.opponentLogo}
                            alt={`Logo ${match.opponent}`}
                            fill
                            className="object-contain"
                            sizes="36px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[8px] font-sans uppercase tracking-wider text-pau-night/50">
                              {match.opponent?.slice(0, 3).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="font-sans text-sm uppercase tracking-wider text-pau-night truncate">
                        {match.opponent}
                      </span>
                    </div>
                    <div className="flex md:justify-end">
                      {match.ticketUrl ? (
                        <a
                          href={match.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pau-yellow text-sm font-sans underline-offset-4 hover:underline uppercase tracking-wider min-h-[44px] flex items-center"
                        >
                          BILLETS →
                        </a>
                      ) : (
                        <span className="text-pau-night/30 text-sm font-sans uppercase tracking-wider">
                          Bientôt disponible
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
              <li className="border-t border-pau-night/10" aria-hidden="true" />
            </ul>
          )}
        </div>
        </Reveal>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            TARIFS
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
            {TARIFS.map((tarif) => (
              <li key={tarif.nom}>
                <p className="text-sm font-sans uppercase tracking-wider text-pau-night mb-2">
                  {tarif.nom}
                </p>
                <p className="font-display text-3xl text-pau-night">
                  {tarif.prix} €
                </p>
                <p className="text-xs font-sans text-pau-night/60 mt-1 leading-snug">
                  {tarif.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
        </Reveal>
      </section>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-8">
            INFOS PRATIQUES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {INFOS.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.caption}>
                  <Icon size={20} className="text-pau-yellow mb-4" aria-hidden="true" />
                  <p className="text-xs font-sans uppercase tracking-widest text-pau-night/50 mb-2">
                    {info.caption}
                  </p>
                  <h3 className="font-sans font-semibold text-pau-night mb-3 leading-snug">
                    {info.titre}
                  </h3>
                  <p className="text-sm font-sans text-pau-night/70 leading-relaxed">
                    {info.texte}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
