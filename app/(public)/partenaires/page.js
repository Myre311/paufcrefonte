import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PartnerCard from '@/components/cards/PartnerCard';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Partenaires — Pau Football Club',
  description: 'Découvrez les partenaires du Pau Football Club et rejoignez notre programme de partenariat.',
};

const TESTIMONIALS = [
  {
    quote:
      "S'associer au Pau FC, c'est rejoindre un projet sincère, ancré dans son territoire. La relation avec le club va bien au-delà d'un simple contrat de sponsoring.",
    auteur: 'Directeur Commercial',
    role: 'Partenaire Principal',
  },
  {
    quote:
      'La visibilité offerte par le Nouste Camp lors des matchdays est exceptionnelle. Nos équipes sont fières de porter les couleurs du club.',
    auteur: 'Responsable Communication',
    role: 'Partenaire Majeur',
  },
  {
    quote:
      "En tant qu'acteur local, soutenir le Pau FC est une évidence. Le club représente des valeurs que nous partageons pleinement.",
    auteur: 'Président',
    role: 'Partenaire Officiel',
  },
];

export default async function PartenairesPage() {
  const partners = await prisma.partner
    .findMany({
      where: { active: true },
      orderBy: [{ tier: 'asc' }, { position: 'asc' }],
    })
    .catch(() => []);

  const premium = partners.filter((p) => p.tier === 'premium');
  const officiel = partners.filter((p) => p.tier === 'officiel');
  const local = partners.filter((p) => p.tier === 'local');

  return (
    <div className="bg-pau-white">
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden">
        <Image
          src="/images/hero-partenaires.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-gold mb-3 font-sans">
            ILS NOUS SOUTIENNENT
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            PARTENAIRES
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-pau-gold mb-4 font-sans">
                NOUS REJOINDRE
              </p>
              <h2 className="font-display text-2xl md:text-3xl uppercase text-pau-night mb-4">
                DEVENIR PARTENAIRE
              </h2>
              <p className="text-pau-night/70 leading-relaxed mb-6">
                Le Pau Football Club propose des offres de partenariat adaptées à toutes les
                ambitions, des PME locales aux grandes entreprises régionales et nationales.
                Visibilité stade, hospitalités, activation digitale, présence sur nos équipements :
                nos équipes construisent avec vous un partenariat sur mesure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?sujet=partenariat"
                  className="inline-block bg-pau-gold text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:bg-pau-gold/85 transition-colors duration-200"
                >
                  PROGRAMME PARTENAIRES
                </Link>
                <a
                  href="/brochure-partenaires.pdf"
                  className="inline-block border border-pau-night/20 text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:border-pau-night/60 transition-colors duration-200"
                >
                  TÉLÉCHARGER LA BROCHURE
                </a>
              </div>
            </div>
            <div className="border border-pau-gold/30 p-8 md:p-12 bg-pau-white">
              <dl className="flex flex-col gap-8">
                {[
                  { label: 'Capacité Nouste Camp', valeur: '11 800 places' },
                  { label: 'Supporters actifs', valeur: '+12 000' },
                  { label: 'Abonnés réseaux sociaux', valeur: '+28 000' },
                  { label: 'Matchs domicile / saison', valeur: '19 matchs' },
                ].map(({ label, valeur }) => (
                  <div key={label} className="flex justify-between items-baseline border-b border-pau-night/10 pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-widest text-pau-night/50 font-sans">{label}</dt>
                    <dd className="font-display text-xl text-pau-gold">{valeur}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {premium.length > 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <Reveal>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display text-xl uppercase text-pau-gold mb-8 tracking-widest">
              PARTENAIRE PRINCIPAL
            </h2>
            <div className="max-w-md mx-auto">
              {premium.map((p) => (
                <PartnerCard
                  key={p.id}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  websiteUrl={p.websiteUrl}
                  size="lg"
                />
              ))}
            </div>
          </div>
          </Reveal>
        </section>
      )}

      {officiel.length > 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <Reveal>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display text-xl uppercase text-pau-gold mb-8 tracking-widest">
              PARTENAIRES OFFICIELS
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {officiel.map((p) => (
                <PartnerCard
                  key={p.id}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  websiteUrl={p.websiteUrl}
                  size="md"
                />
              ))}
            </div>
          </div>
          </Reveal>
        </section>
      )}

      {local.length > 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <Reveal>
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display text-xl uppercase text-pau-gold mb-8 tracking-widest">
              FOURNISSEURS &amp; PARTENAIRES LOCAUX
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {local.map((p) => (
                <PartnerCard
                  key={p.id}
                  name={p.name}
                  logoUrl={p.logoUrl}
                  websiteUrl={p.websiteUrl}
                  size="sm"
                />
              ))}
            </div>
          </div>
          </Reveal>
        </section>
      )}

      {partners.length === 0 && (
        <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <p className="text-center text-pau-night/40 text-sm uppercase tracking-wider">
              Liste des partenaires en cours de mise à jour.
            </p>
          </div>
        </section>
      )}

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-2xl uppercase text-pau-gold mb-8 text-center">
            ILS PARLENT DE NOUS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(({ quote, auteur, role }) => (
              <figure key={auteur + role} className="flex flex-col">
                <blockquote className="font-display text-lg md:text-xl text-pau-night leading-snug mb-4 flex-1">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="text-sm font-sans font-semibold text-pau-night uppercase tracking-wider">
                    {auteur}
                  </p>
                  <p className="text-xs text-pau-gold mt-1">{role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        </Reveal>
      </section>
    </div>
  );
}
