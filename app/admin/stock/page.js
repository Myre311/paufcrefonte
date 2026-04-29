export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import PageHeader from '@/components/admin/PageHeader';

async function getStock() {
  const items = await prisma.stockItem
    .findMany({
      include: {
        variant: {
          include: { product: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })
    .catch(() => []);

  return items.map((item) => {
    const available = item.onHand - item.reserved;
    let statusLabel;
    let rowClass;

    if (available <= 0) {
      statusLabel = 'RUPTURE';
      rowClass = 'bg-red-500/5 border-l-2 border-red-500/50';
    } else if (available <= item.lowStock) {
      statusLabel = 'FAIBLE';
      rowClass = 'bg-pau-yellow/5 border-l-2 border-pau-yellow/50';
    } else {
      statusLabel = 'OK';
      rowClass = '';
    }

    return {
      id: item.id,
      product: item.variant.product.name,
      variant: [item.variant.size, item.variant.color].filter(Boolean).join(' · ') || item.variant.sku,
      available,
      reserved: item.reserved,
      threshold: item.lowStock,
      statusLabel,
      rowClass,
    };
  });
}

export default async function StockPage() {
  const stock = await getStock();

  return (
    <>
      <PageHeader title="Stock" subtitle="Vue consolidee par variante" />
      <div className="px-6 md:px-8 pb-8">
        <div className="bg-pau-primary border border-white/10 overflow-x-auto">
          {stock.length === 0 ? (
            <p className="p-8 text-sm text-white/40">Aucune donnee de stock.</p>
          ) : (
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="bg-pau-night border-y border-white/10">
                  {['Produit', 'Variante', 'Disponible', 'Reserve', 'Seuil alerte', 'Statut'].map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 text-xs uppercase tracking-widest text-white/40 font-medium whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stock.map((row) => (
                  <tr key={row.id} className={`border-b border-white/5 ${row.rowClass}`}>
                    <td className="px-4 py-3 text-sm text-white/80">{row.product}</td>
                    <td className="px-4 py-3 text-sm text-white/60">{row.variant}</td>
                    <td className="px-4 py-3 text-sm text-white/80 font-medium">{row.available}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{row.reserved}</td>
                    <td className="px-4 py-3 text-sm text-white/50">{row.threshold}</td>
                    <td className="px-4 py-3">
                      <span
                        className={[
                          'inline-block px-2 py-0.5 text-xs uppercase tracking-wider',
                          row.statusLabel === 'RUPTURE'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                            : row.statusLabel === 'FAIBLE'
                            ? 'bg-pau-yellow/15 text-pau-yellow border border-pau-yellow/30'
                            : 'bg-white/10 text-white/80 border border-white/20',
                        ].join(' ')}
                      >
                        {row.statusLabel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
