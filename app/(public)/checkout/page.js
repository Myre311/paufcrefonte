'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import useCart, { useCartSubtotal, useCartTotal } from '@/lib/cart';

function formatPrice(cents) {
  return (cents / 100).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) + ' €';
}

const shippingSchema = z.object({
  email: z.string().min(1, 'Email requis').email('Email invalide'),
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  address: z.string().min(4, 'Adresse requise'),
  postalCode: z.string().min(4, 'Code postal requis').max(10, 'Code postal trop long'),
  city: z.string().min(1, 'Ville requise'),
  country: z.enum(['FR', 'BE', 'CH']),
  phone: z.string().min(8, 'Téléphone requis').max(20, 'Téléphone invalide'),
});

const inputBase =
  'w-full bg-pau-white border px-4 py-3 text-sm font-sans text-pau-night placeholder-pau-night/40 outline-none transition-colors';

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-sans uppercase tracking-widest text-pau-night/50 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs font-sans text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const coupon = useCart((s) => s.coupon);
  const clear = useCart((s) => s.clear);
  const subtotal = useCartSubtotal();
  const total = useCartTotal();
  const router = useRouter();

  const [fields, setFields] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'FR',
    phone: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function set(key, value) {
    setFields((prev) => ({ ...prev, [key]: value }));
    // Clear error on change
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  if (items.length === 0) {
    return (
      <section className="bg-pau-white text-pau-night min-h-screen py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night mb-4">
            TON PANIER EST VIDE
          </h1>
          <p className="text-pau-night/60 text-sm max-w-md mx-auto mb-10">
            Ajoute des articles avant de passer commande.
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

  const discountCents = coupon?.discountCents ?? 0;

  async function handleSubmit(e) {
    e.preventDefault();

    const parsed = shippingSchema.safeParse(fields);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const mapped = {};
      for (const [k, v] of Object.entries(flat)) {
        mapped[k] = v?.[0];
      }
      setFieldErrors(mapped);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            name: i.name,
            unitPriceCents: i.unitPriceCents,
            quantity: i.quantity,
            customizationId: i.customizationId ?? null,
            customizationLabel: i.customizationLabel ?? null,
          })),
          coupon: coupon ?? null,
          shipping: parsed.data,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        toast.error(data.error ?? 'Une erreur est survenue. Réessaie.');
        return;
      }

      clear();
      router.push(`/checkout/success?order=${data.orderNumber}`);
    } catch {
      toast.error('Erreur réseau. Vérifie ta connexion et réessaie.');
    } finally {
      setSubmitting(false);
    }
  }

  function inputClass(key) {
    return `${inputBase} ${fieldErrors[key] ? 'border-red-400' : 'border-pau-night/20 focus:border-pau-night'}`;
  }

  return (
    <section className="bg-pau-white text-pau-night min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-pau-night/50 mb-3 font-sans">
          BOUTIQUE
        </p>
        <h1 className="font-display text-3xl md:text-4xl uppercase text-pau-night mb-8">
          FINALISER LA COMMANDE
        </h1>

        {/* Demo banner */}
        <div className="mb-10 border border-pau-yellow/40 bg-pau-yellow/10 px-5 py-4">
          <p className="text-sm font-sans text-pau-yellow font-semibold">
            MODE DEMO — Aucun paiement réel n'est effectué
          </p>
          <p className="text-xs font-sans text-pau-night/60 mt-1">
            Cette boutique est en mode démonstration. Saisis n'importe quelle donnée pour
            valider le flow de commande.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
            {/* Left — form */}
            <div className="flex flex-col gap-8">
              {/* Shipping */}
              <div className="bg-pau-night/[0.03] border border-pau-night/10 p-6">
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-6">
                  INFORMATIONS DE LIVRAISON
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" error={fieldErrors.email}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="ton@email.com"
                      value={fields.email}
                      onChange={(e) => set('email', e.target.value)}
                      className={inputClass('email')}
                    />
                  </Field>

                  <Field label="Téléphone" error={fieldErrors.phone}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+33 6 00 00 00 00"
                      value={fields.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      className={inputClass('phone')}
                    />
                  </Field>

                  <Field label="Prénom" error={fieldErrors.firstName}>
                    <input
                      type="text"
                      autoComplete="given-name"
                      placeholder="Prénom"
                      value={fields.firstName}
                      onChange={(e) => set('firstName', e.target.value)}
                      className={inputClass('firstName')}
                    />
                  </Field>

                  <Field label="Nom" error={fieldErrors.lastName}>
                    <input
                      type="text"
                      autoComplete="family-name"
                      placeholder="Nom"
                      value={fields.lastName}
                      onChange={(e) => set('lastName', e.target.value)}
                      className={inputClass('lastName')}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Adresse" error={fieldErrors.address}>
                      <input
                        type="text"
                        autoComplete="street-address"
                        placeholder="Rue, numéro..."
                        value={fields.address}
                        onChange={(e) => set('address', e.target.value)}
                        className={inputClass('address')}
                      />
                    </Field>
                  </div>

                  <Field label="Code postal" error={fieldErrors.postalCode}>
                    <input
                      type="text"
                      autoComplete="postal-code"
                      placeholder="64000"
                      value={fields.postalCode}
                      onChange={(e) => set('postalCode', e.target.value)}
                      className={inputClass('postalCode')}
                    />
                  </Field>

                  <Field label="Ville" error={fieldErrors.city}>
                    <input
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Pau"
                      value={fields.city}
                      onChange={(e) => set('city', e.target.value)}
                      className={inputClass('city')}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="Pays" error={fieldErrors.country}>
                      <select
                        autoComplete="country"
                        value={fields.country}
                        onChange={(e) => set('country', e.target.value)}
                        className={inputClass('country') + ' cursor-pointer'}
                      >
                        <option value="FR">France</option>
                        <option value="BE">Belgique</option>
                        <option value="CH">Suisse</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </div>

              {/* Payment stub */}
              <div className="bg-pau-night/[0.03] border border-pau-night/10 p-6">
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-4">
                  PAIEMENT
                </p>
                <p className="text-sm font-sans text-pau-night/60 mb-6">
                  En mode démonstration, aucun paiement n'est requis. Remplis l'adresse
                  de livraison puis clique sur le bouton pour valider la commande.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-pau-yellow text-pau-night px-8 py-4 font-sans font-semibold uppercase tracking-wider text-sm hover:opacity-80 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'TRAITEMENT EN COURS...' : 'VALIDER LA COMMANDE'}
                </button>
              </div>
            </div>

            {/* Right — summary */}
            <div className="lg:sticky lg:top-28">
              <div className="bg-pau-night/[0.03] border border-pau-night/10 p-6">
                <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-4">
                  TA COMMANDE
                </p>

                <ul className="flex flex-col gap-4 mb-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 items-start">
                      <div className="shrink-0 w-14 h-14 bg-pau-white border border-pau-night/10 relative overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="56px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[7px] font-sans uppercase tracking-widest text-pau-night/20">
                              PAU FC
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-sans font-semibold text-pau-night truncate">
                          {item.name}
                        </p>
                        {item.customizationLabel && (
                          <p className="text-xs text-pau-yellow font-sans mt-0.5">
                            {item.customizationLabel}
                          </p>
                        )}
                        <p className="text-xs text-pau-night/50 font-sans mt-0.5">
                          Qté : {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-sans font-semibold text-pau-night shrink-0">
                        {formatPrice(item.unitPriceCents * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-2 border-t border-pau-night/10 pt-4">
                  <div className="flex justify-between text-sm font-sans text-pau-night/60">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountCents > 0 && (
                    <div className="flex justify-between text-sm font-sans text-pau-yellow">
                      <span>Réduction ({coupon.code})</span>
                      <span>-{formatPrice(discountCents)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-sans text-pau-night/60">
                    <span>Livraison</span>
                    <span>Incluse</span>
                  </div>
                  <div className="flex justify-between text-base font-sans font-semibold text-pau-night border-t border-pau-night/10 pt-3 mt-1">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
