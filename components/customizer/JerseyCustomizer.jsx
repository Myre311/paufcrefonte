'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import CustomizationForm from './CustomizationForm';
import JerseyPreview2D from './JerseyPreview2D';
import useCart from '@/lib/cart';

// Maillot domicile — prix de référence en centimes
const JERSEY_PRICE_CENTS = 8900;

export default function JerseyCustomizer() {
  const [kit, setKit] = useState('home');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    if (!name || !number) {
      toast.error('Saisis un nom et un numéro avant d\'ajouter au panier.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/customizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kit, name, number: Number(number), size, quantity }),
      });
      const data = await res.json();

      if (!data.ok) {
        toast.error('Une erreur est survenue. Réessaie.');
        return;
      }

      const label = `${name} #${number} — ${size}`;

      useCart.getState().addItem({
        productId: `jersey-${kit}`,
        variantId: null,
        slug: 'boutique/personnalisation',
        name: `Maillot personnalisé (${kit === 'home' ? 'Domicile' : kit === 'away' ? 'Extérieur' : 'Third'})`,
        image: null,
        unitPriceCents: JERSEY_PRICE_CENTS,
        quantity,
        customizationId: data.id,
        customizationLabel: label,
      });

      toast.success('Maillot personnalisé ajouté au panier.');
      useCart.getState().setOpen(true);
    } catch {
      toast.error('Une erreur est survenue. Réessaie.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      <div className="lg:sticky lg:top-8">
        <JerseyPreview2D kit={kit} name={name} number={number} />
      </div>

      <CustomizationForm
        kit={kit}
        setKit={setKit}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        size={size}
        setSize={setSize}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
        loading={loading}
      />
    </div>
  );
}
