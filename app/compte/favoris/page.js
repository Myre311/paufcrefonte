import Link from 'next/link';
import Image from 'next/image';
import { getSupabaseServer } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mes favoris — Pau Football Club',
};

function formatPrice(centimes) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(centimes / 100);
}

export default async function FavorisPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let favorites = [];
  try {
    const dbUser = await prisma.user.findUnique({
      where: { authUserId: user.id },
      select: { id: true },
    });
    if (dbUser) {
      favorites = await prisma.favorite.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            select: {
              id: true,
              slug: true,
              name: true,
              basePrice: true,
              images: true,
            },
          },
        },
      });
    }
  } catch {
    // Base pas encore migrée ou user pas encore synchronisé
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2 font-sans">
          ESPACE CLIENT
        </p>
        <h1 className="font-display text-3xl uppercase text-pau-white">
          MES FAVORIS
        </h1>
      </header>

      {favorites.length === 0 ? (
        <div className="bg-pau-primary border border-white/10 p-10 text-center">
          <p className="text-sm text-white/50 font-sans mb-6">
            Aucun produit en favori pour le moment.
          </p>
          <Link
            href="/boutique"
            className="inline-block text-xs font-sans uppercase tracking-widest bg-pau-yellow text-pau-night px-6 py-3 hover:opacity-90 transition-opacity duration-200"
          >
            DECOUVRIR LA BOUTIQUE
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(({ product }) => (
            <li key={product.id}>
              <Link
                href={`/boutique/${product.slug}`}
                className="group block bg-pau-primary border border-white/10 hover:border-white/20 transition-colors duration-200"
              >
                <div className="aspect-square relative overflow-hidden bg-pau-night">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/20 text-xs uppercase tracking-widest font-sans">
                        Aucune image
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm text-pau-white font-sans font-semibold group-hover:opacity-80 transition-opacity duration-200">
                    {product.name}
                  </p>
                  <p className="text-sm text-white/60 font-sans mt-1">
                    {formatPrice(product.basePrice)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
