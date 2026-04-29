'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wrench,
  Shirt,
  ShoppingCart,
  Boxes,
  ScanBarcode,
  Sparkles,
  Tag,
  Trophy,
  Users,
  Newspaper,
  UserSquare,
  Mail,
  Megaphone,
  FileText,
  Handshake,
  Image,
  Video,
  Settings,
  Download,
} from 'lucide-react';

const groups = [
  {
    caption: 'Pilotage',
    items: [
      { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard, exact: true },
      { label: 'Outils', href: '/admin/tools', icon: Wrench },
    ],
  },
  {
    caption: 'Boutique',
    items: [
      { label: 'Produits', href: '/admin/produits', icon: Shirt },
      { label: 'Commandes', href: '/admin/commandes', icon: ShoppingCart },
      { label: 'Stock', href: '/admin/stock', icon: Boxes },
      { label: 'POS', href: '/admin/pos', icon: ScanBarcode },
      { label: 'Personnalisations', href: '/admin/personnalisations', icon: Sparkles },
      { label: 'Codes promo', href: '/admin/codes-promo', icon: Tag },
    ],
  },
  {
    caption: 'Sport',
    items: [
      { label: 'Matchs', href: '/admin/matchs', icon: Trophy },
      { label: 'Joueurs', href: '/admin/joueurs', icon: Users },
      { label: 'Actualites', href: '/admin/actualites', icon: Newspaper },
    ],
  },
  {
    caption: 'Relation',
    items: [
      { label: 'Clients', href: '/admin/clients', icon: UserSquare },
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
      { label: 'Marketing', href: '/admin/marketing', icon: Megaphone },
    ],
  },
  {
    caption: 'Site',
    items: [
      { label: 'Contenus', href: '/admin/contenus', icon: FileText },
      { label: 'Partenaires', href: '/admin/partenaires', icon: Handshake },
      { label: 'Galerie', href: '/admin/galerie', icon: Image },
      { label: 'Videos', href: '/admin/videos', icon: Video },
    ],
  },
  {
    caption: 'Systeme',
    items: [
      { label: 'Parametres', href: '/admin/parametres', icon: Settings },
      { label: 'Exports', href: '/admin/exports', icon: Download },
    ],
  },
];

function NavItem({ item }) {
  const pathname = usePathname();
  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(item.href + '/');

  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={
        isActive
          ? 'flex items-center gap-3 px-6 py-3 text-sm text-pau-yellow bg-pau-primary border-l-2 border-pau-yellow'
          : 'flex items-center gap-3 px-6 py-3 text-sm text-white/70 hover:text-pau-white hover:bg-white/5 border-l-2 border-transparent'
      }
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon size={16} aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export default function AdminSidebar({ open, onClose }) {
  return (
    <nav
      className={[
        'fixed inset-y-0 left-0 z-30 w-72 bg-pau-night border-r border-white/10 overflow-y-auto',
        'transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ].join(' ')}
      aria-label="Navigation administration"
    >
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <span className="text-pau-yellow font-display font-bold text-lg tracking-tight">PAU FC</span>
        <span className="text-xs uppercase tracking-widest text-white/40">Admin</span>
      </div>

      <div className="py-2">
        {groups.map((group) => (
          <div key={group.caption}>
            <p className="text-xs uppercase tracking-widest text-white/40 px-6 py-3">
              {group.caption}
            </p>
            {group.items.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
