const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

const PARTNERS = [
  // Tier premium (1) — équipementier officiel
  {
    slug: 'joma',
    name: 'Joma',
    tier: 'premium',
    position: 0,
    logoUrl: '/logos/partners/Joma_Blue.png',
    websiteUrl: 'https://www.joma-sport.com',
  },

  // Tier officiel (5)
  {
    slug: 'holy',
    name: 'Holy',
    tier: 'officiel',
    position: 0,
    logoUrl: '/logos/partners/Holy_Outline_Mono.png',
    websiteUrl: 'https://weareholy.com',
  },
  {
    slug: 'intersport',
    name: 'Intersport',
    tier: 'officiel',
    position: 1,
    logoUrl: '/logos/partners/Intersport.png',
    websiteUrl: 'https://www.intersport.fr',
  },
  {
    slug: 'groupama',
    name: 'Groupama',
    tier: 'officiel',
    position: 2,
    logoUrl: '/logos/partners/groupama-ws-2.png',
    websiteUrl: 'https://www.groupama.fr',
  },
  {
    slug: 'pbm',
    name: 'PBM',
    tier: 'officiel',
    position: 3,
    logoUrl: '/logos/partners/PBM-Blanc-2048x697.png',
    websiteUrl: '',
  },
  {
    slug: 'ville-de-pau',
    name: 'Ville de Pau',
    tier: 'officiel',
    position: 4,
    logoUrl: '/logos/partners/Pau.png',
    websiteUrl: 'https://www.pau.fr',
  },

  // Tier local (7)
  {
    slug: 'pbm-concept',
    name: 'PBM Concept',
    tier: 'local',
    position: 0,
    logoUrl: '/logos/partners/pbm-concept.png',
    websiteUrl: '',
  },
  {
    slug: 'sarthou',
    name: 'Sarthou',
    tier: 'local',
    position: 1,
    logoUrl: '/logos/partners/sarthou-site-1.png',
    websiteUrl: '',
  },
  {
    slug: 'arobase',
    name: 'Arobase',
    tier: 'local',
    position: 2,
    logoUrl: '/logos/partners/arobase-2-1024x262.png',
    websiteUrl: '',
  },
  {
    slug: 'assurance-navare',
    name: 'Assurance Navare',
    tier: 'local',
    position: 3,
    logoUrl: '/logos/partners/assurance-navare.png',
    websiteUrl: '',
  },
  {
    slug: 'bullux-services',
    name: 'Bullux Services',
    tier: 'local',
    position: 4,
    logoUrl: '/logos/partners/bullux-services.png',
    websiteUrl: '',
  },
];

async function main() {
  // Désactive les anciens partenaires placeholder
  await prisma.partner.updateMany({
    where: { logoUrl: '' },
    data: { active: false },
  });

  let upserted = 0;
  for (const p of PARTNERS) {
    await prisma.partner.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        tier: p.tier,
        position: p.position,
        logoUrl: p.logoUrl,
        websiteUrl: p.websiteUrl || null,
        active: true,
      },
      create: {
        slug: p.slug,
        name: p.name,
        tier: p.tier,
        position: p.position,
        logoUrl: p.logoUrl,
        websiteUrl: p.websiteUrl || null,
        active: true,
      },
    });
    upserted++;
  }

  console.log(`upserted ${upserted} partners with real logos`);
  const active = await prisma.partner.count({ where: { active: true } });
  console.log(`total active partners: ${active}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
