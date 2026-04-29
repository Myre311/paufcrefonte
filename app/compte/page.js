import { getSupabaseServer } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mon compte — Pau Football Club',
};

function formatDate(date) {
  if (!date) return null;
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

export default async function ComptePage() {
  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata?.first_name || 'Client';

  let lastOrder = null;
  try {
    const dbUser = await prisma.user.findUnique({
      where: { authUserId: user.id },
      select: { id: true },
    });
    if (dbUser) {
      lastOrder = await prisma.order.findFirst({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        select: {
          number: true,
          total: true,
          status: true,
          createdAt: true,
        },
      });
    }
  } catch {
    // Base pas encore migrée ou user pas encore synchronisé
  }

  return (
    <div>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2 font-sans">
          ESPACE CLIENT
        </p>
        <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-white">
          Bonjour, {firstName}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="bg-pau-primary border border-white/10 p-6">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4 font-sans">
            Derniere commande
          </p>
          {lastOrder ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-sans text-pau-white font-semibold">
                {lastOrder.number}
              </p>
              <p className="text-xs text-white/60 font-sans">
                {formatDate(lastOrder.createdAt)}
              </p>
              <p className="text-sm text-pau-white font-sans">
                {formatPrice(lastOrder.total)}
              </p>
              <p className="text-xs text-white/50 uppercase tracking-wider font-sans">
                {lastOrder.status}
              </p>
            </div>
          ) : (
            <p className="text-sm text-white/40 font-sans">Aucune commande.</p>
          )}
        </section>

        <section className="bg-pau-primary border border-white/10 p-6">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4 font-sans">
            Mes billets actifs
          </p>
          <p className="text-sm text-white/40 font-sans">
            Aucun billet pour le moment.
          </p>
        </section>

        <section className="bg-pau-primary border border-white/10 p-6">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-4 font-sans">
            Programme fidelite
          </p>
          <p className="text-sm text-white/40 font-sans">
            Bientot disponible.
          </p>
        </section>
      </div>
    </div>
  );
}
