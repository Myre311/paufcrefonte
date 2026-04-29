const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

// Map opponent name → logo path. Match insensitive case + accent.
const LOGO_MAP = {
  ajaccio: '/logos/ajaccio.svg',
  amiens: '/logos/amiens.svg',
  annecy: '/logos/annecy.svg',
  bastia: '/logos/bastia.svg',
  dunkerque: '/logos/dunkerque.svg',
  grenoble: '/logos/grenoble.svg',
  guingamp: '/logos/guingamp.svg',
  laval: '/logos/laval.svg',
  lorient: '/logos/lorient.svg',
  martigues: '/logos/martigues.svg',
  'paris fc': '/logos/paris-fc.svg',
  paris: '/logos/paris-fc.svg',
  'pau fc': '/logos/pau-fc.svg',
  pau: '/logos/pau-fc.svg',
  'red star': '/logos/red-star.svg',
  rodez: '/logos/rodez.svg',
  troyes: '/logos/troyes.svg',
};

function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

function findLogo(opponent) {
  const norm = normalize(opponent);
  if (LOGO_MAP[norm]) return LOGO_MAP[norm];
  for (const key of Object.keys(LOGO_MAP)) {
    if (norm.includes(key)) return LOGO_MAP[key];
  }
  return null;
}

async function main() {
  const matches = await prisma.match.findMany({ select: { id: true, opponent: true, opponentLogo: true } });
  console.log(`scanning ${matches.length} matches`);

  let updated = 0;
  let unmatched = [];
  for (const m of matches) {
    const logo = findLogo(m.opponent || '');
    if (logo && m.opponentLogo !== logo) {
      await prisma.match.update({ where: { id: m.id }, data: { opponentLogo: logo } });
      updated++;
    } else if (!logo) {
      unmatched.push(m.opponent);
    }
  }

  console.log(`updated ${updated} matches with opponent logos`);
  if (unmatched.length) {
    console.log(`unmatched opponents (${unmatched.length}):`, [...new Set(unmatched)].join(', '));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
