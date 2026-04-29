export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import EmptyState from '@/components/admin/EmptyState';
import { Image } from 'lucide-react';

async function getGallery() {
  return prisma.gallery
    .findMany({ where: { active: true }, orderBy: [{ category: 'asc' }, { position: 'asc' }] })
    .catch(() => []);
}

export default async function GaleriePage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader title="Galerie" subtitle={`${images.length} image(s)`} />
      <div className="px-6 md:px-8 pb-8">
        {images.length === 0 ? (
          <EmptyState icon={Image} title="Aucune image" description="La galerie est vide pour l'instant." />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
            {images.map((img) => (
              <div key={img.id} className="group relative bg-pau-primary border border-white/10 overflow-hidden aspect-square">
                <img
                  src={img.thumbnailUrl ?? img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-pau-night/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-xs text-pau-white truncate">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
