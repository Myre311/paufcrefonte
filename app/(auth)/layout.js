import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Connexion — Pau Football Club',
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-pau-night flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors duration-200 font-sans"
          >
            <span aria-hidden="true">&larr;</span>
            Retour à l&apos;accueil
          </Link>
        </div>

        <div className="bg-pau-primary border border-white/10 p-8">
          <div className="flex justify-center mb-8">
            <Link href="/" aria-label="Pau FC — accueil">
              <Image
                src="/images/homepage/Logo-Pau-FC-2023.png"
                alt="Pau FC"
                width={48}
                height={48}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
