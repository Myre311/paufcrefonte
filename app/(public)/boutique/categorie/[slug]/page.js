import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import CategoryFilters from '@/components/shop/CategoryFilters';
import ProductCard from '@/components/shop/ProductCard';

export const dynamic = 'force-dynamic';

async function getCategory(slug) {
  return prisma.category
    .findUnique({ where: { slug } })
    .catch(() => null);
}

async function getProducts(categoryId) {
  return prisma.product
    .findMany({
      where: {
        status: 'active',
        categoryId,
      },
      include: { category: true },
      take: 24,
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);
}

export default async function CategorieProductsPage({ params }) {
  const category = await getCategory(params.slug);
  if (!category) notFound();

  const products = await getProducts(category.id);

  return (
    <div className="bg-pau-white text-pau-night min-h-screen">
      <section className="relative min-h-[40vh] flex items-end">
        <Image
          src="/images/hero-boutique.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            BOUTIQUE OFFICIELLE
          </p>
          <h1 className="font-display text-5xl md:text-7xl uppercase text-white">
            {category.name.toUpperCase()}
          </h1>
        </div>
      </section>

      <div className="sticky top-[80px] z-30 bg-pau-white/95 backdrop-blur border-b border-pau-night/10">
        <Suspense fallback={null}>
          <CategoryFilters />
        </Suspense>
      </div>

      <section className="border-t border-pau-night/10 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {products.length === 0 ? (
            <p className="text-center text-3xl font-display uppercase text-pau-night/40 py-32">
              AUCUN PRODUIT DISPONIBLE
            </p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
