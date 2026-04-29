import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Outils' };

const tools = [
  { label: 'Purger le cache', description: 'Invalide le cache Next.js et Prisma.', danger: false },
  { label: 'Regenerer le sitemap', description: 'Force la regeneration de sitemap.xml.', danger: false },
  { label: 'Vider les sessions', description: 'Supprime toutes les sessions actives.', danger: false },
  { label: 'Exporter commandes CSV', description: 'Telecharge les commandes au format CSV.', danger: false },
  { label: 'Re-seeder la BDD', description: 'Reinitialise la base avec les donnees de demonstration. Action irreversible.', danger: true },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader title="Outils" subtitle="Actions d'administration systeme" />
      <div className="px-6 md:px-8 pb-8 max-w-2xl space-y-3">
        {tools.map((tool) => (
          <div key={tool.label} className="bg-pau-primary border border-white/10 p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-pau-white">{tool.label}</p>
              <p className="text-xs text-white/40 mt-0.5">{tool.description}</p>
            </div>
            <button
              type="button"
              disabled
              className={[
                'shrink-0 text-xs px-4 py-2 uppercase tracking-wider font-medium disabled:opacity-40 disabled:cursor-not-allowed',
                tool.danger
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-white/10 text-white/70 border border-white/20',
              ].join(' ')}
            >
              {tool.label.split(' ')[0]}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
