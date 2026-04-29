import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Commande confirmée — Pau Football Club',
};

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' €';
}

export default async function CheckoutSuccessPage({ searchParams }) {
  const orderNumber = searchParams?.order ?? null;

  let order = null;
  if (orderNumber) {
    try {
      order = await prisma.order.findUnique({
        where: { number: orderNumber },
        include: { items: true },
      });
    } catch {
      // Graceful fallback
    }
  }

  return (
    <section className="bg-pau-white text-pau-night min-h-screen py-32 md:py-48">
      <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-4 font-sans">
          BOUTIQUE
        </p>
        <h1 className="font-display text-4xl md:text-6xl uppercase text-pau-night mb-6">
          MERCI POUR TA COMMANDE
        </h1>

        {order ? (
          <>
            <p className="text-pau-night/60 text-sm max-w-md mx-auto mb-4">
              Ta commande a bien été enregistrée. Un email de confirmation sera envoyé à{' '}
              <span className="text-pau-night">{order.guestEmail}</span>.
            </p>
            <p className="font-display text-2xl text-pau-yellow mb-8">
              {order.number}
            </p>

            {/* Item list */}
            {order.items.length > 0 && (
              <ul className="flex flex-col gap-3 text-left mb-8 border border-pau-night/10 divide-y divide-pau-night/10">
                {order.items.map((item) => (
                  <li key={item.id} className="flex justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-sans font-semibold text-pau-night truncate">
                        {item.productName}
                      </p>
                      {item.variantLabel && (
                        <p className="text-xs font-sans text-pau-yellow mt-0.5">
                          {item.variantLabel}
                        </p>
                      )}
                      <p className="text-xs font-sans text-pau-night/50 mt-0.5">
                        Qté : {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-sans font-semibold text-pau-night shrink-0">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <p className="text-base font-sans font-semibold text-pau-night mb-10">
              Total payé :{' '}
              <span className="text-pau-yellow">{formatPrice(order.total)}</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-pau-night/60 text-sm max-w-md mx-auto mb-4">
              Ta commande a bien été enregistrée. Un email de confirmation t'a été envoyé.
            </p>
            {orderNumber && (
              <p className="font-display text-2xl text-pau-yellow mb-10">
                {orderNumber}
              </p>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/compte/commandes"
            className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
          >
            VOIR MES COMMANDES
          </Link>
          <Link
            href="/boutique"
            className="inline-block border border-pau-night/20 text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:bg-pau-night/[0.03] transition-colors duration-200"
          >
            RETOUR A LA BOUTIQUE
          </Link>
        </div>
      </div>
    </section>
  );
}
