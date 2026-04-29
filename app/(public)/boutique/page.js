import { Suspense } from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import CategoryFilters from '@/components/shop/CategoryFilters';
import ProductCard from '@/components/shop/ProductCard';
import Reveal from '@/components/animations/Reveal';

export const dynamic = 'force-dynamic';

async function getProducts(cat) {
  return prisma.product
    .findMany({
      where: {
        status: 'active',
        ...(cat
          ? { category: { slug: cat } }
          : {}),
      },
      include: {
        category: true,
      },
      take: 24,
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);
}

export default async function BoutiquePage({ searchParams }) {
  const cat = searchParams?.cat ?? '';
  const products = await getProducts(cat);

  return (
    <div className="bg-pau-white text-pau-night min-h-screen">
      <section className="relative min-h-[28vh] flex items-end">
        <Image
          src="/images/hero-boutique.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-pau-night/60" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
          <p className="text-xs font-sans uppercase tracking-widest text-white/60 mb-3">
            BIENVENUE CHEZ TOI
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase text-white">
            BOUTIQUE OFFICIELLE
          </h1>
        </div>
      </section>

      <div className="sticky top-[80px] z-30 bg-pau-white/95 backdrop-blur border-b border-pau-night/10">
        <Suspense fallback={null}>
          <CategoryFilters />
        </Suspense>
      </div>

      <section className="border-t border-pau-night/10 py-12 md:py-20">
        <Reveal>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {products.length === 0 ? (
            <p className="text-center text-2xl font-display uppercase text-pau-night/40 py-20">
              AUCUN PRODUIT DISPONIBLE
            </p>
          ) : (
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
        </Reveal>
      </section>
    </div>
  );
}
