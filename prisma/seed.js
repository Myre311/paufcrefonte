// =====================================================================
// FC Pau — Seed
//
// Idempotent : tout passe par upsert, identifié par slug/sku/code/email.
// Peut être relancé sans dupliquer ni casser l'existant.
//
// Lancement : `npm run db:seed`
// =====================================================================

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ---- Helpers --------------------------------------------------------

function eur(amount) {
  // 79.99 -> 7999 centimes
  return Math.round(amount * 100);
}

async function logStep(label) {
  process.stdout.write(`→ ${label}\n`);
}

// ---- Données --------------------------------------------------------

const categories = [
  { slug: 'maillots', name: 'Maillots', position: 1 },
  { slug: 'lifestyle', name: 'Lifestyle', position: 2 },
  { slug: 'accessoires', name: 'Accessoires', position: 3 },
  { slug: 'enfant', name: 'Enfant', position: 4 },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const products = [
  {
    slug: 'maillot-domicile-2026',
    name: 'Maillot Domicile 2026',
    description:
      'Maillot officiel domicile saison 2025-2026. Coupe athlétique, mesh respirant, écusson brodé.',
    basePrice: eur(89.99),
    status: 'active',
    featured: true,
    customizable: true,
    categorySlug: 'maillots',
    images: [],
    variants: sizes.map((size) => ({
      sku: `MAILLOT-DOM-2026-${size}`,
      size,
      stock: size === 'XS' || size === 'XXL' ? 6 : 24,
    })),
  },
  {
    slug: 'maillot-exterieur-2026',
    name: 'Maillot Extérieur 2026',
    description:
      'Maillot officiel extérieur saison 2025-2026. Blanc cassé, bandes nuit, écusson brodé.',
    basePrice: eur(89.99),
    status: 'active',
    featured: true,
    customizable: true,
    categorySlug: 'maillots',
    images: [],
    variants: sizes.map((size) => ({
      sku: `MAILLOT-EXT-2026-${size}`,
      size,
      stock: size === 'XS' || size === 'XXL' ? 4 : 18,
    })),
  },
  {
    slug: 'polo-officiel',
    name: 'Polo Officiel',
    description:
      'Polo coton piqué brodé écusson FC Pau. Port quotidien, esprit club.',
    basePrice: eur(54.0),
    status: 'active',
    featured: false,
    customizable: false,
    categorySlug: 'lifestyle',
    images: [],
    variants: sizes.map((size) => ({
      sku: `POLO-OFFICIEL-${size}`,
      size,
      stock: 12,
    })),
  },
  {
    slug: 'echarpe-supporter',
    name: 'Écharpe Supporter',
    description:
      'Écharpe tricotée bicolore nuit/jaune. Indispensable pour le Nouste Camp.',
    basePrice: eur(19.9),
    status: 'active',
    featured: true,
    customizable: false,
    categorySlug: 'accessoires',
    images: [],
    variants: [
      { sku: 'ECHARPE-SUPP-UNIQUE', size: 'Taille unique', stock: 80 },
    ],
  },
];

const partners = [
  // Premium
  {
    slug: 'joma',
    name: 'Joma',
    tier: 'premium',
    logoUrl: '/logos/partners/Joma_Blue.png',
    websiteUrl: 'https://www.joma-sport.com',
    description: 'Équipementier officiel du Pau FC.',
    position: 1,
  },
  {
    slug: 'holy',
    name: 'Holy',
    tier: 'premium',
    logoUrl: '/logos/partners/Holy_Outline_Mono.png',
    websiteUrl: 'https://fr.holy.com/',
    description: 'Sponsor maillot et partenaire nutrition.',
    position: 2,
  },
  {
    slug: 'groupama',
    name: 'Groupama',
    tier: 'premium',
    logoUrl: '/logos/partners/groupama-ws-2.png',
    websiteUrl: 'https://www.groupama.fr',
    description: 'Partenaire assurance et prévoyance.',
    position: 3,
  },
  // Officiel
  {
    slug: 'intersport',
    name: 'Intersport',
    tier: 'officiel',
    logoUrl: '/logos/partners/Intersport.png',
    websiteUrl: 'https://www.intersport.fr',
    description: 'Partenaire équipements sportifs.',
    position: 1,
  },
  {
    slug: 'sarthou',
    name: 'Sarthou',
    tier: 'officiel',
    logoUrl: '/logos/partners/sarthou-site-1.png',
    websiteUrl: null,
    description: 'Partenaire construction et travaux.',
    position: 2,
  },
  {
    slug: 'ville-de-pau',
    name: 'Ville de Pau',
    tier: 'officiel',
    logoUrl: '/logos/partners/Pau.png',
    websiteUrl: 'https://www.pau.fr',
    description: 'Soutien de la commune de Pau.',
    position: 3,
  },
  // Local
  {
    slug: 'arobase-emploi',
    name: 'Arobase Emploi',
    tier: 'local',
    logoUrl: '/logos/partners/arobase.png',
    websiteUrl: 'https://arobase-emploi.fr/',
    description: 'Agence d\'intérim locale.',
    position: 1,
  },
  {
    slug: 'pbm-concept',
    name: 'PBM Concept',
    tier: 'local',
    logoUrl: '/logos/partners/pbm-concept.png',
    websiteUrl: 'https://pbmconcept.fr/',
    description: 'Aménagement et agencement.',
    position: 2,
  },
  {
    slug: 'assurance-navarre',
    name: 'Assurance de Navarre',
    tier: 'local',
    logoUrl: '/logos/partners/assurance-navare.png',
    websiteUrl: 'https://www.assurances-de-navarre.fr/',
    description: 'Assurance locale béarnaise.',
    position: 3,
  },
  {
    slug: 'bullux-services',
    name: 'Bullux Services',
    tier: 'local',
    logoUrl: '/logos/partners/bullux-services.png',
    websiteUrl: null,
    description: 'Services locaux.',
    position: 4,
  },
];

const coupons = [
  {
    code: 'BIENVENUE10',
    type: 'percent',
    value: 10,
    minSubtotal: eur(40),
    maxPerUser: 1,
    active: true,
  },
];

const adminUser = {
  email: 'admin@paufc.local',
  firstName: 'Admin',
  lastName: 'FC Pau',
  role: 'admin',
};

// ---- Effectif (mock — à remplacer par les vrais joueurs admin) -------

const players = [
  // Gardiens
  { slug: 'g-raveyre', firstName: 'Noah', lastName: 'Raveyre', shirtNumber: 22, position: 'goalkeeper', nationality: 'FR', displayOrder: 1, photoUrl: '/images/players/noah-raveyre-22.jpg' },
  { slug: 'g-salles', firstName: 'Esteban', lastName: 'Salles', shirtNumber: 30, position: 'goalkeeper', nationality: 'FR', displayOrder: 2, photoUrl: '/images/players/esteban-salles-30.jpg' },
  // Défenseurs
  { slug: 'd-pouilly', firstName: 'Tom', lastName: 'Pouilly', shirtNumber: 2, position: 'defender', nationality: 'FR', displayOrder: 1, photoUrl: '/images/players/Tom-pouilly-2.jpg' },
  { slug: 'd-kalulu', firstName: 'Joseph', lastName: 'Kalulu', shirtNumber: 3, position: 'defender', nationality: 'FR', displayOrder: 2, photoUrl: '/images/players/joseph-kalulu-3.jpg' },
  { slug: 'd-karamoko', firstName: 'Setigui', lastName: 'Karamoko', shirtNumber: 4, position: 'defender', nationality: 'ML', displayOrder: 3, photoUrl: '/images/players/Setigui-karamoko-4.jpg' },
  { slug: 'd-briancon', firstName: 'Anthony', lastName: 'Briançon', shirtNumber: 23, position: 'defender', nationality: 'FR', displayOrder: 4, photoUrl: '/images/players/anthony-briançon-23.jpg' },
  // Milieux
  { slug: 'm-fall', firstName: 'Cheikh', lastName: 'Fall', shirtNumber: 6, position: 'midfielder', nationality: 'SN', displayOrder: 1, photoUrl: '/images/players/Cheikh-fall-6.jpg' },
  { slug: 'm-basse', firstName: 'Souleymane', lastName: 'Basse', shirtNumber: 8, position: 'midfielder', nationality: 'ML', displayOrder: 2, photoUrl: '/images/players/souleymane-basse-8.jpg' },
  { slug: 'm-versini', firstName: 'Giovani', lastName: 'Versini', shirtNumber: 10, position: 'midfielder', nationality: 'FR', displayOrder: 3, photoUrl: '/images/players/Giovani-versini-10.jpg' },
  { slug: 'm-gasnier', firstName: 'Kyllian', lastName: 'Gasnier', shirtNumber: 11, position: 'midfielder', nationality: 'FR', displayOrder: 4, photoUrl: '/images/players/Kyllian-Gasnier-11.jpg' },
  { slug: 'm-bobichon', firstName: 'Antonin', lastName: 'Bobichon', shirtNumber: 14, position: 'midfielder', nationality: 'FR', displayOrder: 5, photoUrl: '/images/players/antonin-bobichon-14.jpg' },
  { slug: 'm-kante', firstName: 'Ousmane', lastName: 'Kante', shirtNumber: 19, position: 'midfielder', nationality: 'ML', displayOrder: 6, photoUrl: '/images/players/Ousmane-Kante-19.jpg' },
  { slug: 'm-anziani', firstName: 'Julien', lastName: 'Anziani', shirtNumber: 20, position: 'midfielder', nationality: 'FR', displayOrder: 7, photoUrl: '/images/players/Julien-Anziani-20.jpg' },
  { slug: 'm-beusnard', firstName: 'Steeve', lastName: 'Beusnard', shirtNumber: 21, position: 'midfielder', nationality: 'FR', displayOrder: 8, photoUrl: '/images/players/steeve-beusnard-21.jpg' },
  // Attaquants
  { slug: 'a-dong', firstName: 'Kyliane', lastName: 'Dong', shirtNumber: 9, position: 'forward', nationality: 'FR', displayOrder: 1, photoUrl: '/images/players/Kyliane-Dong-9.jpg' },
  { slug: 'a-sissoko', firstName: 'Omar', lastName: 'Sissoko', shirtNumber: 17, position: 'forward', nationality: 'ML', displayOrder: 2, photoUrl: '/images/players/Omar-sissoko-17.jpg' },
  { slug: 'a-sadik', firstName: 'Omar', lastName: 'Sadik', shirtNumber: 18, position: 'forward', nationality: 'MA', displayOrder: 3, photoUrl: '/images/players/Omar-sadik-18.jpg' },
  { slug: 'a-ruiz', firstName: 'Jean', lastName: 'Ruiz', shirtNumber: 25, position: 'forward', nationality: 'FR', displayOrder: 4, photoUrl: '/images/players/jean-ruiz-25.jpg' },
  { slug: 'a-glossoa', firstName: 'Neil', lastName: 'Glossoa', shirtNumber: 26, position: 'forward', nationality: 'FR', displayOrder: 5, photoUrl: '/images/players/Neil-glossoa-26.jpg' },
  { slug: 'a-touzghar', firstName: 'Rayan', lastName: 'Touzghar', shirtNumber: 84, position: 'forward', nationality: 'FR', displayOrder: 6, photoUrl: '/images/players/Rayan-touzghar-84.jpg' },
  { slug: 'a-zuliani', firstName: 'Edhy', lastName: 'Zuliani', shirtNumber: 87, position: 'forward', nationality: 'FR', displayOrder: 7, photoUrl: '/images/players/Edhy-zuliani-87.jpg' },
  { slug: 'a-meddah', firstName: 'Daylam', lastName: 'Meddah', shirtNumber: 97, position: 'forward', nationality: 'DZ', displayOrder: 8, photoUrl: '/images/players/daylam-meddah-97.jpg' },
];

// ---- Calendrier (mock matchs saison 2025-2026) ----------------------

function daysFromNow(days, hour = 20, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const matches = [
  // Matchs joués
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(-14, 20, 0),
    isHome: true,
    opponent: 'Grenoble Foot 38',
    opponentLogo: '/logos/grenoble.svg',
    venue: 'Nouste Camp',
    status: 'played',
    homeScore: 2,
    awayScore: 1,
    broadcaster: 'BeIN Sports',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(-7, 19, 0),
    isHome: false,
    opponent: 'SC Bastia',
    opponentLogo: '/logos/bastia.svg',
    venue: 'Stade Armand Cesari',
    status: 'played',
    homeScore: 1,
    awayScore: 1,
    broadcaster: 'BeIN Sports',
  },
  // Matchs à venir (avec logos disponibles)
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(3, 20, 45),
    isHome: true,
    opponent: 'Paris FC',
    opponentLogo: '/logos/paris-fc.svg',
    venue: 'Nouste Camp',
    status: 'scheduled',
    ticketUrl: 'https://billetterie.paufc.fr',
    broadcaster: 'BeIN Sports',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(10, 19, 0),
    isHome: true,
    opponent: 'Amiens SC',
    opponentLogo: '/logos/amiens.svg',
    venue: 'Nouste Camp',
    status: 'scheduled',
    ticketUrl: 'https://billetterie.paufc.fr',
    broadcaster: 'BeIN Sports',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(17, 20, 0),
    isHome: true,
    opponent: 'EA Guingamp',
    opponentLogo: '/logos/guingamp.svg',
    venue: 'Nouste Camp',
    status: 'scheduled',
    ticketUrl: 'https://billetterie.paufc.fr',
  },
  {
    competition: 'Ligue 2 BKT',
    season: '2025-2026',
    kickoffAt: daysFromNow(24, 19, 0),
    isHome: false,
    opponent: 'FC Annecy',
    opponentLogo: '/logos/annecy.svg',
    venue: 'Parc des Sports',
    status: 'scheduled',
  },
];

// ---- Actualités (mock) ----------------------------------------------

const articles = [
  {
    slug: 'victoire-grenoble-resume',
    title: `Pau enchaîne face à Grenoble au Nouste Camp`,
    excerpt: `Portés par un public bouillant, les Palois s'imposent 2-1 dans un match maîtrisé dès l'entame. Retour sur les temps forts.`,
    body: `Le Nouste Camp a vibré samedi soir. Devant 8 200 spectateurs, le Pau FC s'est imposé 2-1 face à Grenoble dans un match au scénario maîtrisé. Ouverture du score dès la 12e minute par Antoine Evans sur un service en retrait de Henri Saivet, puis doublé en seconde période sur penalty.\n\nLes Isérois ont réduit l'écart en fin de match mais n'auront jamais réellement inquiété la défense paloise, solide. Une victoire qui place le Pau FC dans le ventre mou du classement et confirme la dynamique amorcée depuis le début du printemps.\n\nProchaine échéance : déplacement à Saint-Étienne dans une semaine, avant la réception de Rodez au Nouste Camp.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
    category: 'matchday',
    featured: true,
    publishedAt: daysFromNow(-13),
  },
  {
    slug: 'prolongation-evans',
    title: `Antoine Evans prolonge jusqu'en 2028`,
    excerpt: `Buteur du club depuis trois saisons, Antoine Evans s'engage pour deux années supplémentaires. Une signature stratégique pour le projet sportif.`,
    body: `C'est officiel : Antoine Evans portera la tunique du Pau FC jusqu'en juin 2028. Le club a annoncé ce vendredi la prolongation de son attaquant français, arrivé en 2023 et auteur de 23 buts toutes compétitions confondues depuis ses débuts en Béarn.\n\nUne marque de confiance dans le projet sportif piloté par Laurent Batlles et qui s'appuie sur une ossature stable. « Pau, c'est ma famille football. Le club me fait grandir, je veux continuer à y construire quelque chose », confie le joueur à l'issue de la signature.\n\nLes négociations, entamées en début d'année, ont abouti rapidement, signe d'une volonté commune de prolonger l'aventure.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=1200&h=600&fit=crop',
    category: 'transfer',
    featured: false,
    publishedAt: daysFromNow(-6),
  },
  {
    slug: 'fondation-clinique',
    title: `La Fondation Pau FC visite le service pédiatrie`,
    excerpt: `Cinq joueurs de l'effectif se sont rendus au CHU de Pau ce mercredi pour rencontrer les enfants hospitalisés.`,
    body: `Toujours engagée auprès des plus jeunes, la Fondation Pau FC a organisé une nouvelle visite au service pédiatrie du CHU de Pau ce mercredi après-midi. Cinq joueurs de l'effectif professionnel se sont prêtés au jeu : photos, dédicaces, échanges, et même un atelier de coloriage avec les plus petits.\n\nUne demi-journée riche en émotions pour les enfants hospitalisés et pour les joueurs eux-mêmes. « Ce sont des moments qui rappellent ce qui compte vraiment », souligne le capitaine Steeve Yago.\n\nLa Fondation poursuit sa mission tout au long de la saison, avec d'autres actions prévues dans les écoles et les hôpitaux du Béarn.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=600&fit=crop',
    category: 'foundation',
    featured: false,
    publishedAt: daysFromNow(-2),
  },
  {
    slug: 'nouvelle-tribune-presentation',
    title: `La nouvelle tribune Béarn ouvrira ses portes en août`,
    excerpt: `Le club dévoile les premiers visuels de la nouvelle tribune Béarn, dont la livraison est attendue pour le coup d'envoi de la saison 2026-2027.`,
    body: `Pierre par pierre, le Nouste Camp se transforme. Le Pau FC a dévoilé ce mardi les premiers visuels de la nouvelle tribune Béarn, dont la livraison est attendue pour la rentrée. Capacité totale du stade portée à 9 800 places, nouveaux espaces hospitalité, accès PMR repensés et fan zone permanente : la tribune s'inscrit dans le plan stratégique 2024-2028 du club.\n\nLes travaux, lancés à l'été 2025, respectent le calendrier. La nouvelle tribune sera inaugurée pour le premier match de Ligue 2 de la saison 2026-2027.`,
    coverImageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=600&fit=crop',
    category: 'club',
    featured: false,
    publishedAt: daysFromNow(-21),
  },
];

// ---- Stats joueurs (saison 2025-2026) -------------------------------

const playerStats = [
  // Antoine Evans - Attaquant buteur
  { playerSlug: 'a-evans', goals: 12, assists: 5, matchesPlayed: 24, matchesStarted: 22, minutesPlayed: 1980, shotsOnTarget: 42, shotsTotal: 78, yellowCards: 3, redCards: 0 },
  // Fode Soumano - Attaquant
  { playerSlug: 'a-soumano', goals: 8, assists: 3, matchesPlayed: 22, matchesStarted: 18, minutesPlayed: 1620, shotsOnTarget: 28, shotsTotal: 54, yellowCards: 2, redCards: 0 },
  // Henri Saivet - Milieu créatif
  { playerSlug: 'm-saivet', goals: 4, assists: 11, matchesPlayed: 26, matchesStarted: 24, minutesPlayed: 2160, shotsOnTarget: 18, shotsTotal: 36, yellowCards: 5, redCards: 0 },
  // Hugo Armougom - Milieu
  { playerSlug: 'm-armougom', goals: 2, assists: 6, matchesPlayed: 25, matchesStarted: 23, minutesPlayed: 2070, tackles: 48, interceptions: 32, yellowCards: 4, redCards: 0 },
  // Steeve Yago - Défenseur
  { playerSlug: 'd-touzghar', goals: 1, assists: 1, matchesPlayed: 24, matchesStarted: 24, minutesPlayed: 2160, tackles: 62, interceptions: 48, clearances: 88, yellowCards: 6, redCards: 1 },
  // Tom Lamarche - Gardien
  { playerSlug: 'g-lamarche', goals: 0, assists: 0, matchesPlayed: 26, matchesStarted: 26, minutesPlayed: 2340, saves: 84, cleanSheets: 9, goalsConceded: 28, yellowCards: 1, redCards: 0 },
];

// ---- Galerie photos -------------------------------------------------
// Images placeholder temporaires - à remplacer par de vraies photos

const gallery = [
  {
    title: 'Victoire contre Grenoble - Célébration',
    description: 'Les joueurs célèbrent le but d\'Antoine Evans face à Grenoble au Nouste Camp',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
    category: 'matchday',
    matchId: null,
    photographer: 'FC Pau Media',
    position: 1,
    featured: true,
  },
  {
    title: 'Entrée des joueurs au Nouste Camp',
    description: 'L\'équipe entre sur la pelouse du Nouste Camp devant un public enflammé',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop',
    category: 'matchday',
    photographer: 'FC Pau Media',
    position: 2,
    featured: true,
  },
  {
    title: 'Entraînement collectif',
    description: 'Séance d\'entraînement tactique au centre d\'entraînement du Pau FC',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop',
    category: 'training',
    photographer: 'FC Pau Media',
    position: 1,
    featured: false,
  },
  {
    title: 'Nouste Camp vue aérienne',
    description: 'Le stade Nouste Camp sous tous ses angles',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=800&fit=crop',
    category: 'stadium',
    photographer: 'Ville de Pau',
    position: 1,
    featured: true,
  },
  {
    title: 'Visite au CHU - Fondation Pau FC',
    description: 'Les joueurs rendent visite aux enfants hospitalisés au CHU de Pau',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop',
    category: 'event',
    photographer: 'Fondation Pau FC',
    position: 1,
    featured: false,
  },
  {
    title: 'Supporters au virage',
    description: 'L\'ambiance bouillante du virage Sang et Or lors du dernier match à domicile',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop',
    category: 'matchday',
    photographer: 'FC Pau Media',
    position: 3,
    featured: false,
  },
  {
    title: 'Pelouse du Nouste Camp',
    description: 'La pelouse impeccable du Nouste Camp avant le coup d\'envoi',
    imageUrl: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=600&h=400&fit=crop',
    category: 'stadium',
    photographer: 'FC Pau Media',
    position: 2,
    featured: false,
  },
  {
    title: 'Échauffement avant-match',
    description: 'Les joueurs s\'échauffent avant le match contre Saint-Étienne',
    imageUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1200&h=800&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&h=400&fit=crop',
    category: 'matchday',
    photographer: 'FC Pau Media',
    position: 4,
    featured: false,
  },
];

// ---- Vidéos (YouTube embed) -----------------------------------------

const videos = [
  {
    title: 'Résumé : Pau FC 2-1 Grenoble',
    description: 'Revivez les meilleurs moments de la victoire des Palois face à Grenoble au Nouste Camp',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'match_highlights',
    duration: 180,
    views: 12450,
    featured: true,
    published: true,
    publishedAt: daysFromNow(-12),
  },
  {
    title: 'Interview : Antoine Evans après son doublé',
    description: 'Le buteur palois revient sur son excellent match et sa prolongation de contrat',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'interviews',
    duration: 240,
    views: 8320,
    featured: true,
    published: true,
    publishedAt: daysFromNow(-5),
  },
  {
    title: 'Entraînement : préparation du match contre Rodez',
    description: 'Séance intensive pour préparer le prochain match à domicile',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'training',
    duration: 120,
    views: 3450,
    featured: false,
    published: true,
    publishedAt: daysFromNow(-2),
  },
  {
    title: 'Coulisses : une journée au Nouste Camp',
    description: `Suivez nos joueurs dans leur quotidien au centre d'entraînement`,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'behind_scenes',
    duration: 420,
    views: 15600,
    featured: false,
    published: true,
    publishedAt: daysFromNow(-8),
  },
  {
    title: 'Academy : stage U15 vacances de Pâques',
    description: `Retour sur le stage organisé par l'academy pendant les vacances`,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'academy',
    duration: 300,
    views: 2100,
    featured: false,
    published: true,
    publishedAt: daysFromNow(-15),
  },
  {
    title: 'Résumé : AS Saint-Étienne 1-1 Pau FC',
    description: 'Match nul précieux à Geoffroy-Guichard pour les Sang et Or',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    provider: 'youtube',
    category: 'match_highlights',
    duration: 165,
    views: 9800,
    featured: false,
    published: true,
    publishedAt: daysFromNow(-6),
  },
];

// ---- Exécution ------------------------------------------------------

async function main() {
  await logStep('Catégories');
  const categoryBySlug = {};
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, position: cat.position },
      create: cat,
    });
    categoryBySlug[cat.slug] = created;
  }

  await logStep('Produits + variantes + stock');
  for (const p of products) {
    const { variants, categorySlug, ...productData } = p;
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        ...productData,
        categoryId: categoryBySlug[categorySlug]?.id ?? null,
      },
      create: {
        ...productData,
        categoryId: categoryBySlug[categorySlug]?.id ?? null,
      },
    });

    for (const v of variants) {
      const variant = await prisma.productVariant.upsert({
        where: { sku: v.sku },
        update: { size: v.size, productId: product.id },
        create: { sku: v.sku, size: v.size, productId: product.id },
      });

      await prisma.stockItem.upsert({
        where: { variantId: variant.id },
        update: { onHand: v.stock },
        create: { variantId: variant.id, onHand: v.stock },
      });
    }
  }

  await logStep('Partenaires');
  for (const pt of partners) {
    await prisma.partner.upsert({
      where: { slug: pt.slug },
      update: pt,
      create: pt,
    });
  }

  await logStep('Coupons');
  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }

  await logStep('Utilisateur admin');
  await prisma.user.upsert({
    where: { email: adminUser.email },
    update: { role: adminUser.role },
    create: adminUser,
  });

  await logStep('Effectif (joueurs)');
  const playerBySlug = {};
  for (const p of players) {
    const created = await prisma.player.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    playerBySlug[p.slug] = created;
  }

  await logStep('Stats joueurs');
  for (const s of playerStats) {
    const { playerSlug, ...statsData } = s;
    const player = playerBySlug[playerSlug];
    if (player) {
      await prisma.playerStats.upsert({
        where: { playerId: player.id },
        update: statsData,
        create: { playerId: player.id, ...statsData },
      });
    }
  }

  await logStep('Calendrier');
  // Pas de slug naturel sur Match : on identifie par (season, kickoff, opponent)
  for (const m of matches) {
    const existing = await prisma.match.findFirst({
      where: { season: m.season, kickoffAt: m.kickoffAt, opponent: m.opponent },
    });
    if (existing) {
      await prisma.match.update({ where: { id: existing.id }, data: m });
    } else {
      await prisma.match.create({ data: m });
    }
  }

  await logStep('Actualités');
  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

  await logStep('Galerie photos');
  // Pas de slug sur Gallery, on identifie par title
  for (const g of gallery) {
    const existing = await prisma.gallery.findFirst({
      where: { title: g.title },
    });
    if (existing) {
      await prisma.gallery.update({ where: { id: existing.id }, data: g });
    } else {
      await prisma.gallery.create({ data: g });
    }
  }

  await logStep('Vidéos');
  // Pas de slug sur Video, on identifie par title
  for (const v of videos) {
    const existing = await prisma.video.findFirst({
      where: { title: v.title },
    });
    if (existing) {
      await prisma.video.update({ where: { id: existing.id }, data: v });
    } else {
      await prisma.video.create({ data: v });
    }
  }

  await logStep('Seed OK');
}

main()
  .catch((err) => {
    console.error('✖ Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
