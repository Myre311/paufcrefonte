'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import useCart from '@/lib/cart';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AddToCartForm({ product, variants }) {
  const availableSizes = variants?.length
    ? [...new Set(variants.map((v) => v.size).filter(Boolean))]
    : SIZES;

  const [selectedSize, setSelectedSize] = useState(availableSizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => Math.min(10, q + 1));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedSize) {
      toast.error('Sélectionne une taille');
      return;
    }

    // Resolve the matching variant (if variants passed in)
    const matchedVariant = variants?.find((v) => v.size === selectedSize) ?? null;
    const priceCents = matchedVariant?.priceOverride ?? product.basePrice;

    useCart.getState().addItem({
      productId: product.id,
      variantId: matchedVariant?.id ?? null,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0] ?? null,
      unitPriceCents: priceCents,
      quantity,
    });

    toast.success(`${product.name} (${selectedSize} × ${quantity}) ajouté au panier`);
    useCart.getState().setOpen(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {availableSizes.length > 0 && (
        <fieldset>
          <legend className="text-xs font-sans uppercase tracking-widest text-pau-night/60 mb-3">
            Taille
          </legend>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Sélection taille">
            {availableSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
                className={[
                  'border px-4 py-2 text-sm font-sans uppercase tracking-wider transition-colors',
                  selectedSize === size
                    ? 'bg-pau-yellow text-pau-night border-pau-yellow'
                    : 'border-pau-night/20 text-pau-night hover:border-pau-night/50',
                ].join(' ')}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div>
        <p className="text-xs font-sans uppercase tracking-widest text-pau-night/60 mb-3">
          Quantité
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={decrement}
            aria-label="Diminuer la quantité"
            className="border border-pau-night/20 px-3 py-2 text-pau-night hover:bg-pau-night/[0.03] transition-colors font-sans text-base leading-none"
          >
            -
          </button>
          <output
            aria-live="polite"
            aria-atomic="true"
            className="min-w-[2rem] text-center font-sans font-semibold text-pau-night"
          >
            {quantity}
          </output>
          <button
            type="button"
            onClick={increment}
            aria-label="Augmenter la quantité"
            className="border border-pau-night/20 px-3 py-2 text-pau-night hover:bg-pau-night/[0.03] transition-colors font-sans text-base leading-none"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-pau-yellow text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:opacity-80 transition-opacity"
      >
        AJOUTER AU PANIER
      </button>
    </form>
  );
}
