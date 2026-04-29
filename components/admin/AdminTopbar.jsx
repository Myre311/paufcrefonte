'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const PAGE_TITLES = {
  '/admin': 'Tableau de bord',
  '/admin/tools': 'Outils',
  '/admin/produits': 'Produits',
  '/admin/produits/nouveau': 'Nouveau produit',
  '/admin/commandes': 'Commandes',
  '/admin/stock': 'Stock',
  '/admin/pos': 'Point de vente',
  '/admin/personnalisations': 'Personnalisations',
  '/admin/codes-promo': 'Codes promo',
  '/admin/matchs': 'Matchs',
  '/admin/joueurs': 'Joueurs',
  '/admin/actualites': 'Actualites',
  '/admin/clients': 'Clients',
  '/admin/newsletter': 'Newsletter',
  '/admin/marketing': 'Marketing',
  '/admin/contenus': 'Contenus',
  '/admin/partenaires': 'Partenaires',
  '/admin/galerie': 'Galerie',
  '/admin/videos': 'Videos',
  '/admin/parametres': 'Parametres',
  '/admin/exports': 'Exports',
};

function resolveTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const segments = pathname.split('/').filter(Boolean);
  if (segments[1] === 'produits' && segments[2]) return 'Detail produit';
  if (segments[1] === 'commandes' && segments[2]) return 'Detail commande';
  if (segments[1] === 'clients' && segments[2]) return 'Detail client';
  return 'Administration';
}

export default function AdminTopbar({ onMenuClick }) {
  const pathname = usePathname();
  const title = resolveTitle(pathname);

  return (
    <header className="sticky top-0 z-10 bg-pau-night/95 backdrop-blur-md border-b border-white/10 px-6 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="md:hidden p-1 text-white/70 hover:text-pau-white"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu de navigation"
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <span className="font-display text-sm uppercase tracking-widest text-pau-white/80">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-white/60">Admin</span>
        <Link
          href="/connexion"
          className="text-sm text-white/70 hover:text-pau-white border border-white/20 hover:border-white/40 px-3 py-1.5 transition-colors"
        >
          Deconnexion
        </Link>
      </div>
    </header>
  );
}
