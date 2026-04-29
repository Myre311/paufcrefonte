'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,

      addItem(item) {
        const { items } = get();
        const existing = items.find(
          (i) =>
            i.productId === item.productId &&
            i.variantId === item.variantId &&
            i.customizationId === item.customizationId
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === existing.id
                ? { ...i, quantity: Math.min(10, i.quantity + (item.quantity ?? 1)) }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: genId(),
                productId: item.productId,
                variantId: item.variantId ?? null,
                slug: item.slug,
                name: item.name,
                image: item.image ?? null,
                unitPriceCents: item.unitPriceCents,
                quantity: item.quantity ?? 1,
                customizationId: item.customizationId ?? null,
                customizationLabel: item.customizationLabel ?? null,
              },
            ],
          });
        }
      },

      removeItem(id) {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity(id, qty) {
        if (qty <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: Math.min(10, Math.max(1, qty)) } : i
          ),
        });
      },

      clear() {
        set({ items: [], coupon: null });
      },

      async applyCoupon(code) {
        try {
          const res = await fetch('/api/coupons/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          });
          const data = await res.json();
          if (data.ok) {
            set({ coupon: { code: data.code, discountCents: data.discountCents } });
            return { ok: true };
          }
          return { ok: false, error: data.error ?? 'Code invalide' };
        } catch {
          return { ok: false, error: 'Erreur réseau' };
        }
      },

      removeCoupon() {
        set({ coupon: null });
      },

      setOpen(bool) {
        set({ isOpen: bool });
      },

      toggle() {
        set({ isOpen: !get().isOpen });
      },
    }),
    {
      name: 'paufc-cart-v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;

export function useCartCount() {
  return useCart((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
}

export function useCartSubtotal() {
  return useCart((s) =>
    s.items.reduce((acc, i) => acc + i.unitPriceCents * i.quantity, 0)
  );
}

export function useCartTotal() {
  return useCart((s) => {
    const subtotal = s.items.reduce((acc, i) => acc + i.unitPriceCents * i.quantity, 0);
    const discount = s.coupon?.discountCents ?? 0;
    return Math.max(0, subtotal - discount);
  });
}
