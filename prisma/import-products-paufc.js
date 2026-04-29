// =====================================================================
// Import produits depuis boutique officielle paufc-boutique.fr
// Scraped le 26 avril 2026
//
// Usage: node prisma/import-products-paufc.js
// =====================================================================

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function eur(priceString) {
  // "75,00 €" -> 7500 centimes
  const cleaned = priceString.replace('€', '').replace(',', '.').trim();
  return Math.round(parseFloat(cleaned) * 100);
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Données scrapées par catégorie
const productsData = {
  'tenues-officielles': [
    {
      name: 'Maillot Domicile 25/26 Manches courtes',
      price: '75,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_100_250804172539_250.png',
      description: 'Maillot officiel domicile saison 2025-2026. Coupe athlétique, mesh respirant, écusson brodé.',
      customizable: true,
      featured: true,
    },
    {
      name: 'Maillot Domicile 25/26 Manches longues',
      price: '85,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_102_250804174956_250.png',
      description: 'Maillot officiel domicile saison 2025-2026 manches longues.',
      customizable: true,
      featured: false,
    },
    {
      name: 'Maillot Extérieur 25/26 Manches courtes',
      price: '75,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_103_250804175403_250.png',
      description: 'Maillot officiel extérieur saison 2025-2026.',
      customizable: true,
      featured: true,
    },
    {
      name: 'Maillot Extérieur 25/26 Manches longues',
      price: '85,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_104_250804175532_250.png',
      description: 'Maillot officiel extérieur saison 2025-2026 manches longues.',
      customizable: true,
      featured: false,
    },
    {
      name: 'Le Royal Manches courtes',
      price: '75,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_130_260226211303_250.png',
      description: 'Maillot collector Le Royal - édition limitée.',
      customizable: true,
      featured: true,
      isNew: true,
    },
    {
      name: 'HOLY x Pau FC Goalkeeper Blue Line',
      price: '75,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_120_251211213513_250.png',
      description: 'Maillot de gardien HOLY x Pau FC - coloris blue line.',
      customizable: false,
      featured: false,
    },
    {
      name: 'HOLY x Pau FC Goalkeeper Pink Life',
      price: '75,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_122_251211214444_250.png',
      description: 'Maillot de gardien HOLY x Pau FC - coloris pink life.',
      customizable: false,
      featured: false,
    },
  ],
  'training': [
    {
      name: 'Maillot Training 25/26 Joueur',
      price: '30,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_107_250807120936_250.png',
      description: 'Maillot d\'entraînement officiel joueur.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Maillot Training 25/26 Gardien',
      price: '30,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_108_250804185003_250.png',
      description: 'Maillot d\'entraînement officiel gardien.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Sweat Training 25/26 Joueur',
      price: '50,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_111_250804185525_250.png',
      description: 'Sweat d\'entraînement officiel.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Warm-up 25/26',
      price: '55,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_114_250814174711_250.png',
      description: 'Veste warm-up officielle.',
      customizable: false,
      featured: false,
    },
  ],
  'lifestyle': [
    {
      name: 'Hoodie Palois',
      price: '55,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_17_250804163358_250.png',
      description: 'Sweat à capuche Palois - confort et style.',
      customizable: false,
      featured: true,
    },
    {
      name: 'Le Polo Écru',
      price: '50,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_133_260319195002_250.jpg',
      description: 'Polo élégant coloris écru.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Le Polo Marron',
      price: '50,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_134_260319193749_250.jpg',
      description: 'Polo élégant coloris marron.',
      customizable: false,
      featured: false,
    },
    {
      name: 'T-shirt Palois',
      price: '25,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_71_250804162901_250.png',
      description: 'T-shirt Palois - esprit club.',
      customizable: false,
      featured: false,
    },
    {
      name: 'T-shirt Paloise',
      price: '25,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_99_250804162034_250.png',
      description: 'T-shirt Paloise - esprit club.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Sweat Broderie PAU FC',
      price: '45,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_87_250804021218_250.png',
      description: 'Sweat avec broderie PAU FC.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Veste Sortie 25/26',
      price: '60,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_112_250812150142_250.png',
      description: 'Veste officielle de sortie.',
      customizable: false,
      featured: false,
    },
  ],
  'enfant': [
    {
      name: 'Maillot Domicile Enfant 25/26',
      price: '55,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_105_250804172539_250.png',
      description: 'Maillot officiel domicile enfant saison 2025-2026.',
      customizable: true,
      featured: true,
    },
    {
      name: 'Maillot Extérieur Enfant 25/26',
      price: '55,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_106_250804175403_250.png',
      description: 'Maillot officiel extérieur enfant saison 2025-2026.',
      customizable: true,
      featured: true,
    },
    {
      name: 'Le Royal Enfant',
      price: '55,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_132_260226211234_250.png',
      description: 'Maillot collector Le Royal enfant - édition limitée.',
      customizable: true,
      featured: false,
      isNew: true,
    },
    {
      name: 'Hoodie Palois Kids',
      price: '40,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_40_250804163728_250.png',
      description: 'Sweat à capuche Palois pour enfant.',
      customizable: false,
      featured: false,
    },
    {
      name: 'T-shirt Palois Kids',
      price: '20,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_39_250804163804_250.png',
      description: 'T-shirt Palois pour enfant.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Body Bébé',
      price: '25,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_65_250804163650_250.png',
      description: 'Body bébé aux couleurs du club.',
      customizable: false,
      featured: false,
    },
  ],
  'accessoires': [
    {
      name: 'Écharpe Château 25/26',
      price: '15,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_66_251203175743_250.jpg',
      description: 'Écharpe officielle motif château.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Écharpe Fleur de Lys',
      price: '15,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_68_250804164036_250.png',
      description: 'Écharpe officielle motif fleur de lys.',
      customizable: false,
      featured: true,
    },
    {
      name: 'Écharpe Jaune et Bleu',
      price: '15,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_94_241206181616_250.png',
      description: 'Écharpe bicolore jaune et bleu.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Ballon Pau FC Taille 5',
      price: '20,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_80_250804163929_250.png',
      description: 'Ballon officiel taille 5.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Ballon Pau FC Taille 1',
      price: '12,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_81_250804163908_250.png',
      description: 'Ballon officiel taille 1 (souvenir).',
      customizable: false,
      featured: false,
    },
    {
      name: 'Bonnet Broderie',
      price: '20,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_88_250804162324_250.png',
      description: 'Bonnet avec broderie PAU FC.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Broders x Pau FC Casquette Snapback',
      price: '30,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_125_251217151710_250.jpg',
      description: 'Casquette snapback collaboration Broders.',
      customizable: false,
      featured: false,
    },
    {
      name: 'Broders x Pau FC Casquette Velours',
      price: '30,00 €',
      imageUrl: 'https://static.weezbe.com/paufc/Images/products/p_126_251217152600_250.jpg',
      description: 'Casquette velours collaboration Broders.',
      customizable: false,
      featured: false,
    },
  ],
};

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const kidsSizes = ['2-4 ans', '4-6 ans', '6-8 ans', '8-10 ans', '10-12 ans', '12-14 ans'];

async function main() {
  console.log('🚀 Import des produits depuis paufc-boutique.fr\n');

  // Créer ou récupérer les catégories
  const categories = {
    'tenues-officielles': await prisma.category.upsert({
      where: { slug: 'tenues-officielles' },
      update: { name: 'Tenues Officielles 25/26', position: 1 },
      create: { slug: 'tenues-officielles', name: 'Tenues Officielles 25/26', position: 1 },
    }),
    'training': await prisma.category.upsert({
      where: { slug: 'training' },
      update: { name: 'Training', position: 2 },
      create: { slug: 'training', name: 'Training', position: 2 },
    }),
    'lifestyle': await prisma.category.upsert({
      where: { slug: 'lifestyle' },
      update: { name: 'Lifestyle', position: 3 },
      create: { slug: 'lifestyle', name: 'Lifestyle', position: 3 },
    }),
    'enfant': await prisma.category.upsert({
      where: { slug: 'enfant' },
      update: { name: 'Enfant', position: 4 },
      create: { slug: 'enfant', name: 'Enfant', position: 4 },
    }),
    'accessoires': await prisma.category.upsert({
      where: { slug: 'accessoires' },
      update: { name: 'Accessoires', position: 5 },
      create: { slug: 'accessoires', name: 'Accessoires', position: 5 },
    }),
  };

  console.log('✓ Catégories créées\n');

  let totalProducts = 0;

  // Importer les produits par catégorie
  for (const [categorySlug, products] of Object.entries(productsData)) {
    console.log(`→ Import ${categorySlug} (${products.length} produits)`);

    for (const p of products) {
      const slug = slugify(p.name);
      const basePrice = eur(p.price);

      // Déterminer les tailles selon la catégorie
      const productSizes = categorySlug === 'enfant' && !p.name.includes('Maillot')
        ? kidsSizes.slice(0, 4)
        : p.name.includes('Écharpe') || p.name.includes('Ballon') || p.name.includes('Bonnet')
        ? ['Taille unique']
        : sizes;

      // Créer ou mettre à jour le produit
      const product = await prisma.product.upsert({
        where: { slug },
        update: {
          name: p.name,
          description: p.description,
          basePrice,
          status: 'active',
          featured: p.featured || false,
          customizable: p.customizable || false,
          images: [p.imageUrl],
          categoryId: categories[categorySlug].id,
        },
        create: {
          slug,
          name: p.name,
          description: p.description,
          basePrice,
          status: 'active',
          featured: p.featured || false,
          customizable: p.customizable || false,
          images: [p.imageUrl],
          categoryId: categories[categorySlug].id,
        },
      });

      // Créer les variantes avec stock
      for (const size of productSizes) {
        const sku = `${slug.toUpperCase().substring(0, 15)}-${size.replace(/\s+/g, '')}`;

        const stockQuantity = p.featured ? 24 : 12;

        await prisma.productVariant.upsert({
          where: { sku },
          update: {
            size,
            priceOverride: null, // Utilise basePrice du produit
          },
          create: {
            sku,
            productId: product.id,
            size,
            priceOverride: null,
            stockItem: {
              create: {
                onHand: stockQuantity,
                reserved: 0,
                lowStock: 3,
              },
            },
          },
        });
      }

      totalProducts++;
      process.stdout.write('.');
    }
    console.log(' ✓\n');
  }

  console.log(`\n🎉 Import terminé : ${totalProducts} produits importés avec succès !`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
