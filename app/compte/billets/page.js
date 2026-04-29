import Link from 'next/link';

export const metadata = {
  title: 'Mes billets — Pau Football Club',
};

export default function BilletsPage() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2 font-sans">
          ESPACE CLIENT
        </p>
        <h1 className="font-display text-3xl uppercase text-pau-white">
          MES BILLETS
        </h1>
      </header>

      <div className="bg-pau-primary border border-white/10 p-10 text-center">
        <p className="text-sm text-white/50 font-sans mb-6">
          Vous n&apos;avez pas encore de billet.
        </p>
        <Link
          href="/billetterie"
          className="inline-block text-xs font-sans uppercase tracking-widest bg-pau-yellow text-pau-night px-6 py-3 hover:opacity-90 transition-opacity duration-200"
        >
          ACHETER DES BILLETS
        </Link>
      </div>
    </div>
  );
}
