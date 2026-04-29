'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import useCart, { useCartSubtotal, useCartTotal } from '@/lib/cart';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' €';
}

export default function PanierPage() {
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const applyCoupon = useCart((s) => s.applyCoupon);
  const removeCoupon = useCart((s) => s.removeCoupon);
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const router = useRouter();

  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  async function handleApplyCoupon(e) {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    const result = await applyCoupon(couponInput.trim().toUpperCase());
    setCouponLoading(false);
    if (result.ok) {
      toast.success('Code promo appliqué.');
      setCouponInput('');
    } else {
      toast.error(result.error ?? 'Code invalide.');
    }
  }

  const discountCents = coupon?.discountCents ?? 0;

  if (items.length === 0) {
    return (
      <section className="bg-pau-white text-pau-night min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-pau-night/50 mb-3 font-sans">
            BOUTIQUE
          </p>
          <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night mb-4">
            TON PANIER EST VIDE
          </h1>
          <p className="text-pau-night/60 text-sm max-w-md mx-auto mb-10">
            Ton panier ne contient aucun article pour l'instant. Explore la boutique pour
            trouver maillots, textile et accessoires aux couleurs du Pau FC.
          </p>
          <Link
            href="/boutique"
            className="inline-block bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200"
          >
            DECOUVRIR LA BOUTIQUE
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-pau-white text-pau-night min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-3 font-sans">
          BOUTIQUE
        </p>
        <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night mb-8">
          TON PANIER
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* Left — item list */}
          <div>
            <ul className="flex flex-col divide-y divide-pau-night/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-6 py-6">
                  {/* Thumbnail */}
                  <div className="shrink-0 w-24 h-24 bg-pau-white border border-pau-night/10 relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[8px] font-sans uppercase tracking-widest text-pau-night/20">
                          PAU FC
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-sans font-semibold text-pau-night truncate">
                          {item.name}
                        </p>
                        {item.variantId && (
                          <p className="text-xs text-pau-night/50 font-sans mt-0.5">
                            {item.variantId}
                          </p>
                        )}
                        {item.customizationLabel && (
                          <p className="text-xs text-pau-yellow font-sans mt-0.5">
                            {item.customizationLabel}
                          </p>
                        )}
                      </div>
                      <p className="text-base font-sans font-semibold text-pau-night shrink-0">
                        {formatPrice(item.unitPriceCents * item.quantity)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      {/* Qty */}
                      <div className="flex items-center border border-pau-night/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer la quantité"
                          className="px-3 py-2 text-pau-night/60 hover:text-pau-night transition-colors text-sm leading-none"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm font-sans text-pau-night min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter la quantité"
                          className="px-3 py-2 text-pau-night/60 hover:text-pau-night transition-colors text-sm leading-none"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm text-pau-night/50 font-sans">
                        {formatPrice(item.unitPriceCents)} / unité
                      </p>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Retirer ${item.name} du panier`}
                        className="ml-auto text-pau-night/30 hover:text-pau-night/70 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link
                href="/boutique"
                className="text-xs font-sans uppercase tracking-widest text-pau-night/40 hover:text-pau-night transition-colors duration-200"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>

          {/* Right — order summary sticky */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-pau-night/[0.03] border border-pau-night/10 p-6 flex flex-col gap-4">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-2">
                RESUME DE LA COMMANDE
              </p>

              {/* Coupon form */}
              {!coupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Code promo"
                    aria-label="Code promo"
                    className="flex-1 bg-pau-white border border-pau-night/20 px-3 py-2 text-sm font-sans text-pau-night placeholder-pau-night/40 outline-none focus:border-pau-night transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading}
                    className="bg-pau-night/10 hover:bg-pau-night/20 text-pau-night px-4 py-2 text-xs font-sans uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'APPLIQUER'}
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-sm font-sans">
                  <span className="text-pau-yellow">{coupon.code} appliqué</span>
                  <button
                    type="button"
                    onClick={() => removeCoupon()}
                    className="text-pau-night/40 hover:text-pau-night/70 text-xs uppercase tracking-wider transition-colors"
                  >
                    Retirer
                  </button>
                </div>
              )}

              <div className="border-t border-pau-night/10 pt-4 flex flex-col gap-3">
                <div className="flex justify-between text-sm font-sans text-pau-night/60">
                  <span>Sous-total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountCents > 0 && (
                  <div className="flex justify-between text-sm font-sans text-pau-yellow">
                    <span>Réduction</span>
                    <span>-{formatPrice(discountCents)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-sans text-pau-night/60">
                  <span>Livraison</span>
                  <span>Calculée au checkout</span>
                </div>
                <div className="flex justify-between text-base font-sans font-semibold text-pau-night border-t border-pau-night/10 pt-3">
                  <span>Total estimé</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="w-full bg-pau-yellow text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity duration-200"
              >
                PASSER COMMANDE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
