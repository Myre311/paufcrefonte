import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductGallery from '@/components/shop/ProductGallery';
import AddToCartForm from '@/components/shop/AddToCartForm';
import ProductCard from '@/components/shop/ProductCard';

export const dynamic = 'force-dynamic';

async function getProduct(slug) {
  return prisma.product
    .findUnique({
      where: { slug },
      include: {
        variants: {
          include: { stockItem: true },
        },
        category: true,
      },
    })
    .catch(() => null);
}

async function getRelated(categoryId, excludeId) {
  if (!categoryId) return [];
  return prisma.product
    .findMany({
      where: {
        status: 'active',
        categoryId,
        id: { not: excludeId },
      },
      take: 4,
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);
}

const GENERIC_META = [
  { label: 'Matière', value: '100% polyester recyclé' },
  { label: 'Entretien', value: 'Lavage à 30°C, sans assouplissant' },
  { label: 'Composition', value: 'Fabrication européenne certifiée' },
];

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const related = await getRelated(product.categoryId, product.id);

  const meta = product.meta && typeof product.meta === 'object'
    ? [
        { label: 'Matière', value: product.meta.matiere ?? GENERIC_META[0].value },
        { label: 'Entretien', value: product.meta.entretien ?? GENERIC_META[1].value },
        { label: 'Composition', value: product.meta.composition ?? GENERIC_META[2].value },
      ]
    : GENERIC_META;

  const price = `${(product.basePrice / 100).toLocaleString('fr-FR')} €`;

  return (
    <div className="bg-pau-white text-pau-night min-h-screen">
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 items-start">
            <ProductGallery images={product.images} productName={product.name} />

            <div>
              <nav aria-label="Fil d'Ariane" className="mb-6">
                <ol className="flex flex-wrap gap-1 text-xs font-sans text-pau-night/60">
                  <li>
                    <Link href="/" className="hover:text-pau-night transition-colors">Accueil</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/boutique" className="hover:text-pau-night transition-colors">Boutique</Link>
                  </li>
                  {product.category && (
                    <>
                      <li aria-hidden="true">/</li>
                      <li>
                        <Link
                          href={`/boutique/categorie/${product.category.slug}`}
                          className="hover:text-pau-night transition-colors"
                        >
                          {product.category.name}
                        </Link>
                      </li>
                    </>
                  )}
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-pau-night/40">{product.name}</li>
                </ol>
              </nav>

              <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night leading-tight">
                {product.name}
              </h1>

              <p className="text-2xl font-sans font-semibold text-pau-night mt-3">
                {price}
              </p>

              {product.description && (
                <p className="text-base font-sans text-pau-night/70 mt-6 max-w-md leading-relaxed">
                  {product.description}
                </p>
              )}

              <AddToCartForm product={product} variants={product.variants} />

              <dl className="mt-12 border-t border-pau-night/10 pt-8 space-y-4">
                {meta.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <dt className="text-xs font-sans uppercase tracking-widest text-pau-night/40 w-28 shrink-0 pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-sans text-pau-night/70">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-pau-night/10 py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-display text-xl md:text-2xl uppercase text-pau-night mb-8">
              AUTRES PRODUITS
            </h2>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
              {related.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
