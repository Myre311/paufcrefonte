import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/shop/CartDrawer';

export const dynamic = 'force-dynamic';

export default function PublicLayout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-pau-yellow focus:text-pau-night focus:px-4 focus:py-2 focus:text-sm focus:font-sans focus:font-semibold focus:uppercase focus:tracking-wider"
      >
        Aller au contenu principal
      </a>
      <Header />
      <CartDrawer />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
