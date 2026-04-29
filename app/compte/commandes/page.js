import { getSupabaseServer } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mes commandes — Pau Football Club',
};

const STATUS_LABELS = {
  pending: 'En attente',
  paid: 'Payee',
  preparing: 'En preparation',
  shipped: 'Expediee',
  delivered: 'Livree',
  cancelled: 'Annulee',
  refunded: 'Remboursee',
};

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function formatPrice(centimes) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(centimes / 100);
}

export default async function CommandesPage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let orders = [];
  try {
    const dbUser = await prisma.user.findUnique({
      where: { authUserId: user.id },
      select: { id: true },
    });
    if (dbUser) {
      orders = await prisma.order.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        select: {
          number: true,
          total: true,
          status: true,
          createdAt: true,
          items: {
            select: { productName: true, quantity: true },
          },
        },
      });
    }
  } catch {
    // Base pas encore migrée ou user pas encore synchronisé
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2 font-sans">
          ESPACE CLIENT
        </p>
        <h1 className="font-display text-3xl uppercase text-pau-white">
          MES COMMANDES
        </h1>
      </header>

      {orders.length === 0 ? (
        <div className="bg-pau-primary border border-white/10 p-10 text-center">
          <p className="text-sm text-white/50 font-sans">
            Vous n&apos;avez pas encore passe de commande.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th scope="col" className="text-left py-3 px-4 font-sans font-normal text-xs uppercase tracking-widest">
                  Numero
                </th>
                <th scope="col" className="text-left py-3 px-4 font-sans font-normal text-xs uppercase tracking-widest">
                  Date
                </th>
                <th scope="col" className="text-left py-3 px-4 font-sans font-normal text-xs uppercase tracking-widest">
                  Articles
                </th>
                <th scope="col" className="text-left py-3 px-4 font-sans font-normal text-xs uppercase tracking-widest">
                  Total
                </th>
                <th scope="col" className="text-left py-3 px-4 font-sans font-normal text-xs uppercase tracking-widest">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.number}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-pau-white font-semibold">
                    {order.number}
                  </td>
                  <td className="py-4 px-4 text-white/60">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-4 px-4 text-white/60">
                    {order.items.map((item) => `${item.quantity}x ${item.productName}`).join(', ')}
                  </td>
                  <td className="py-4 px-4 text-pau-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs uppercase tracking-wider text-white/50">
                      {STATUS_LABELS[order.status] ?? order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
