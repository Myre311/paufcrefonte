import PageHeader from '@/components/admin/PageHeader';
import { Download } from 'lucide-react';

const EXPORT_TYPES = [
  { label: 'Commandes', description: 'Toutes les commandes avec detail client et articles.', resource: 'commandes' },
  { label: 'Clients', description: 'Liste clients avec email, date inscription et nombre de commandes.', resource: 'clients' },
  { label: 'Stock', description: 'Vue complete du stock par variante avec alertes.', resource: 'stock' },
  { label: 'Newsletter', description: 'Abonnes confirmes avec segments.', resource: 'newsletter' },
  { label: 'Codes promo', description: 'Tous les coupons avec statistiques d\'utilisation.', resource: 'codes-promo' },
];

export const metadata = { title: 'Exports' };

export default function ExportsPage() {
  return (
    <>
      <PageHeader title="Exports" subtitle="Telechargement de donnees au format CSV" />
      <div className="px-6 md:px-8 pb-8 max-w-2xl space-y-3">
        {EXPORT_TYPES.map((e) => (
          <div key={e.resource} className="bg-pau-primary border border-white/10 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-pau-white">{e.label}</p>
              <p className="text-xs text-white/40 mt-0.5">{e.description}</p>
            </div>
            <button
              type="button"
              disabled
              className="shrink-0 flex items-center gap-2 text-xs px-4 py-2 bg-white/10 text-white/70 border border-white/20 uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={`Exporter ${e.label} en CSV`}
            >
              <Download size={14} aria-hidden="true" />
              CSV
            </button>
          </div>
        ))}
        <p className="text-xs text-white/30 pt-2">Les exports seront actives dans une prochaine version.</p>
      </div>
    </>
  );
}
