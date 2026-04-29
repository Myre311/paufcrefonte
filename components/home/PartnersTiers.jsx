import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PartnerCard from '@/components/cards/PartnerCard';
import Reveal from '@/components/animations/Reveal';

export default async function PartnersTiers() {
  const partners = await prisma.partner
    .findMany({
      where: { active: true },
      orderBy: [{ tier: 'asc' }, { position: 'asc' }],
    })
    .catch(() => []);

  const premium = partners.filter((p) => p.tier === 'premium');
  const officiel = partners.filter((p) => p.tier === 'officiel');
  const local = partners.filter((p) => p.tier === 'local');

  if (partners.length === 0) return null;

  return (
    <section
      className="border-t border-white/10 py-12 md:py-20 bg-pau-night"
      aria-label="Partenaires du Pau FC"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-gold mb-3">
          NOS PARTENAIRES
        </p>
        <h2 className="font-display uppercase text-3xl md:text-4xl text-pau-gold leading-tight mb-8">
          ILS SOUTIENNENT LE CLUB
        </h2>

        {premium.length > 0 && (
          <Reveal>
          <div className="border-t border-white/10 pt-8 mb-8">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-white/40 mb-8">
              PARTENAIRE PRINCIPAL
            </p>
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
        )}

        {officiel.length > 0 && (
          <Reveal delay={0.05}>
          <div className="border-t border-white/10 pt-8 mb-8">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-white/40 mb-8">
              PARTENAIRES OFFICIELS
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
        )}

        {local.length > 0 && (
          <Reveal delay={0.1}>
          <div className="border-t border-white/10 pt-8 mb-8">
            <p className="text-xs font-sans uppercase tracking-[0.3em] text-white/40 mb-8">
              FOURNISSEURS &amp; PARTENAIRES LOCAUX
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
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
        )}

        <Link
          href="/partenaires"
          className="text-sm font-sans uppercase tracking-wider text-pau-gold underline hover:text-white transition-colors duration-200"
        >
          Devenir partenaire →
        </Link>
      </div>
    </section>
  );
}
