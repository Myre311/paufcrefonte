'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const NAV = [
  { label: 'Tableau de bord', href: '/compte' },
  { label: 'Mes commandes', href: '/compte/commandes' },
  { label: 'Mes billets', href: '/compte/billets' },
  { label: 'Mon profil', href: '/compte/profil' },
  { label: 'Mes abonnements', href: '/compte/abonnements' },
  { label: 'Mes favoris', href: '/compte/favoris' },
];

export default function CompteSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <nav aria-label="Navigation du compte">
        <ul className="flex flex-col">
          {NAV.map(({ label, href }) => {
            const active =
              href === '/compte'
                ? pathname === '/compte'
                : pathname === href || pathname.startsWith(href + '/');
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    'block text-sm font-sans py-3 px-4 border-l-2 transition-colors duration-200',
                    active
                      ? 'border-pau-yellow text-pau-white bg-white/5'
                      : 'border-transparent text-white/60 hover:text-pau-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-8 px-4">
        <button
          onClick={handleSignOut}
          className="w-full text-xs font-sans uppercase tracking-widest border border-white/20 py-2 text-white/60 hover:text-pau-white hover:bg-white/5 transition-colors duration-200"
        >
          DECONNEXION
        </button>
      </div>
    </aside>
  );
}
