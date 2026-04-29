import { redirect } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CompteSidebar from '@/components/compte/CompteSidebar';
import { getSupabaseServer } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function CompteLayout({ children }) {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?next=/compte');
  }

  return (
    <>
      <a
        href="#compte-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-pau-yellow focus:text-pau-night focus:px-4 focus:py-2 focus:text-sm focus:font-sans focus:font-semibold focus:uppercase focus:tracking-wider"
      >
        Aller au contenu principal
      </a>
      <Header />
      <div className="bg-pau-night min-h-screen">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row gap-10">
            <CompteSidebar />
            <main
              id="compte-content"
              tabIndex={-1}
              className="flex-1 min-w-0"
            >
              {children}
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
