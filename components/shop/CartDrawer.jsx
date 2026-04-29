'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useCart, { useCartSubtotal, useCartTotal } from '@/lib/cart';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' €';
}

export default function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const setOpen = useCart((s) => s.setOpen);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const closeRef = useRef(null);
  const router = useRouter();

  // Focus close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    }
  }, [isOpen]);

  // ESC closes drawer
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, setOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const discountCents = coupon?.discountCents ?? 0;

  function handleCheckout() {
    setOpen(false);
    router.push('/checkout');
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[59]"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Ton panier"
        className="fixed inset-y-0 right-0 w-full sm:w-96 max-w-full bg-pau-night border-l border-white/10 z-[60] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-white/60">
              PANIER
            </span>
            {items.length > 0 && (
              <span className="bg-pau-yellow text-pau-night text-[10px] font-sans font-semibold leading-none rounded-full w-5 h-5 flex items-center justify-center">
                {items.reduce((a, i) => a + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer le panier"
            className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/60 hover:text-pau-white transition-colors duration-200"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <p className="text-white/40 text-sm font-sans mb-4">Ton panier est vide.</p>
              <Link
                href="/boutique"
                onClick={() => setOpen(false)}
                className="text-pau-yellow text-xs font-sans uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Découvrir la boutique
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="shrink-0 w-16 h-16 bg-pau-primary border border-white/10 relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[8px] font-sans uppercase tracking-widest text-white/20">
                          PAU FC
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-sans font-semibold text-pau-white truncate">
                      {item.name}
                    </p>
                    {item.variantId && (
                      <p className="text-xs text-white/50 font-sans mt-0.5">
                        {item.variantId}
                      </p>
                    )}
                    {item.customizationLabel && (
                      <p className="text-xs text-pau-yellow font-sans mt-0.5">
                        {item.customizationLabel}
                      </p>
                    )}
                    <p className="text-sm text-pau-white font-sans mt-1">
                      {formatPrice(item.unitPriceCents)}
                    </p>

                    {/* Qty + remove */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/20">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer la quantité"
                          className="px-2 py-1 text-white/60 hover:text-pau-white transition-colors text-sm leading-none"
                        >
                          -
                        </button>
                        <span className="px-2 text-sm font-sans text-pau-white min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter la quantité"
                          className="px-2 py-1 text-white/60 hover:text-pau-white transition-colors text-sm leading-none"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Retirer ${item.name} du panier`}
                        className="text-white/30 hover:text-white/70 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-white/10 px-6 py-5 flex flex-col gap-3">
            <div className="flex justify-between text-sm font-sans text-white/60">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discountCents > 0 && (
              <div className="flex justify-between text-sm font-sans text-pau-yellow">
                <span>Réduction ({coupon.code})</span>
                <span>-{formatPrice(discountCents)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-sans font-semibold text-pau-white border-t border-white/10 pt-3">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full bg-pau-yellow text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity duration-200"
            >
              PASSER COMMANDE
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
