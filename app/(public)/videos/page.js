import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import VideoGrid from '@/components/gallery/VideoGrid';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Vidéos — Pau Football Club',
  description: 'Revivez les moments forts du Pau FC : résumés de matchs, interviews, entraînements.',
};

export default async function VideosPage() {
  const raw = await prisma.video
    .findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    })
    .catch(() => []);

  const videos = raw.map((v) => ({
    ...v,
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
    publishedAt: v.publishedAt ? v.publishedAt.toISOString() : null,
  }));

  return (
    <>
      <section className="relative bg-pau-night min-h-[35vh] flex items-end overflow-hidden border-b border-pau-night/10">
        <Image
          src="/images/hero-accueil.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-pau-night/55" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 pb-10 md:pb-14 w-full">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-yellow mb-3 font-sans">
            PAU FC
          </p>
          <h1 className="font-display text-3xl md:text-5xl uppercase text-pau-white leading-none">
            VIDÉOS
          </h1>
        </div>
      </section>

      <section className="bg-pau-white border-t border-pau-night/10 py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {videos.length === 0 ? (
            <p className="text-center font-display text-3xl text-pau-night/40 uppercase py-32">
              AUCUNE VIDÉO DISPONIBLE
            </p>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </div>
      </section>
    </>
  );
}
