export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';
import { FileText, Image, Video, Newspaper } from 'lucide-react';

async function getCounts() {
  const [articles, galleries, videos] = await Promise.all([
    prisma.article.count().catch(() => 0),
    prisma.gallery.count().catch(() => 0),
    prisma.video.count().catch(() => 0),
  ]);
  return { articles, galleries, videos };
}

const sections = [
  { title: 'Pages statiques', description: 'CGV, mentions legales, RGPD, etc.', href: null, icon: FileText, count: null },
  { title: 'Articles', description: 'Actualites et contenu editorial', href: '/admin/actualites', icon: Newspaper, countKey: 'articles' },
  { title: 'Galerie photos', description: 'Images par categorie', href: '/admin/galerie', icon: Image, countKey: 'galleries' },
  { title: 'Videos', description: 'Videos et highlights', href: '/admin/videos', icon: Video, countKey: 'videos' },
];

export default async function ContenuPage() {
  const counts = await getCounts();

  return (
    <>
      <PageHeader title="Contenus" subtitle="Gestion du contenu editorial" />
      <div className="px-6 md:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sections.map((s) => {
            const Icon = s.icon;
            const count = s.countKey ? counts[s.countKey] : null;

            const inner = (
              <div className="bg-pau-primary border border-white/10 p-6 hover:border-white/20 transition-colors h-full">
                <div className="flex items-start justify-between mb-4">
                  <Icon size={20} className="text-white/40" aria-hidden="true" />
                  {count !== null && (
                    <span className="text-xs text-white/40">{count}</span>
                  )}
                </div>
                <p className="font-display text-lg uppercase text-pau-white mb-1">{s.title}</p>
                <p className="text-xs text-white/50">{s.description}</p>
                {!s.href && (
                  <p className="text-xs text-white/30 mt-3">Gestion directe dans les fichiers</p>
                )}
              </div>
            );

            return s.href ? (
              <Link key={s.title} href={s.href} className="block">{inner}</Link>
            ) : (
              <div key={s.title}>{inner}</div>
            );
          })}
        </div>
      </div>
    </>
  );
}
