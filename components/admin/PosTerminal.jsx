'use client';

import { useState } from 'react';
import { Search, X, Plus, Minus } from 'lucide-react';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR') + ' €';
}

export default function PosTerminal({ initialProducts }) {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState([]);

  const filtered = query.trim()
    ? initialProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(query.toLowerCase()))
      )
    : initialProducts;

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.variantId === product.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === product.variantId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function updateQty(variantId, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.variantId === variantId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(variantId) {
    setCart((prev) => prev.filter((i) => i.variantId !== variantId));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 md:px-8 pb-8">
      <section aria-labelledby="pos-search-heading">
        <h2 id="pos-search-heading" className="text-xs uppercase tracking-widest text-white/40 pb-3">
          Recherche produit
        </h2>

        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nom ou SKU..."
            aria-label="Rechercher un produit"
            className="w-full bg-pau-primary border border-white/10 pl-9 pr-4 py-2.5 text-sm text-pau-white placeholder-white/30 focus:outline-none focus:border-pau-yellow/50"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.slice(0, 12).map((p) => (
            <button
              key={p.variantId}
              type="button"
              onClick={() => addToCart(p)}
              className="bg-pau-primary border border-white/10 hover:border-pau-yellow/40 p-3 text-left transition-colors"
            >
              {p.image ? (
                <img src={p.image} alt={p.name} className="w-full h-20 object-cover bg-white/5 mb-2" />
              ) : (
                <div className="w-full h-20 bg-white/5 mb-2" aria-hidden="true" />
              )}
              <p className="text-xs text-pau-white truncate">{p.name}</p>
              {p.variantLabel && (
                <p className="text-xs text-white/40 truncate">{p.variantLabel}</p>
              )}
              <p className="text-xs text-pau-yellow mt-1">{formatPrice(p.price)}</p>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-white/40">
              Aucun produit trouve.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="pos-cart-heading" className="flex flex-col">
        <h2 id="pos-cart-heading" className="text-xs uppercase tracking-widest text-white/40 pb-3">
          Ticket en cours
        </h2>

        <div className="bg-pau-primary border border-white/10 flex-1 flex flex-col">
          {cart.length === 0 ? (
            <p className="flex-1 flex items-center justify-center text-sm text-white/30 py-16">
              Aucun article
            </p>
          ) : (
            <ul className="flex-1 divide-y divide-white/5">
              {cart.map((item) => (
                <li key={item.variantId} className="flex items-center gap-3 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-pau-white truncate">{item.name}</p>
                    {item.variantLabel && (
                      <p className="text-xs text-white/40">{item.variantLabel}</p>
                    )}
                    <p className="text-xs text-pau-yellow">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(item.variantId, -1)}
                      aria-label={`Retirer une unite de ${item.name}`}
                      className="p-1 text-white/50 hover:text-pau-white"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span className="text-sm w-5 text-center">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.variantId, 1)}
                      aria-label={`Ajouter une unite de ${item.name}`}
                      className="p-1 text-white/50 hover:text-pau-white"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm text-pau-white w-16 text-right tabular-nums">
                    {formatPrice(item.price * item.qty)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.variantId)}
                    aria-label={`Supprimer ${item.name} du ticket`}
                    className="p-1 text-white/30 hover:text-red-400"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-white/10 p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-widest text-white/40">Total</span>
              <span className="font-display text-2xl text-pau-white tabular-nums">{formatPrice(total)}</span>
            </div>
            <button
              type="button"
              disabled={cart.length === 0}
              className="w-full bg-pau-yellow text-pau-night font-medium text-sm py-3 uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pau-yellow/90 transition-colors"
            >
              ENCAISSER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
