'use client';

import { useState } from 'react';
import Reveal from '@/components/animations/Reveal';

export default function NewsletterInline() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home' }),
      });
    } catch (err) {
      console.error('[newsletter]', err);
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  }

  return (
    <section
      className="py-12 md:py-20 bg-pau-white text-center"
      aria-label="Inscription newsletter"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-pau-night/50 mb-3">
          RESTE DANS L'ACTUALITÉ
        </p>
        <h2 className="font-display uppercase text-3xl md:text-4xl text-pau-night leading-tight mb-4">
          INSCRIS-TOI À LA NEWSLETTER
        </h2>
        <p className="text-base font-sans text-pau-night/60 leading-relaxed max-w-md mx-auto mb-6">
          Résultats, transferts, infos boutique, offres exclusives — reçois l'essentiel du Pau FC directement dans ta boîte.
        </p>

        <Reveal>
        {submitted ? (
          <p className="font-display text-pau-night text-xl uppercase tracking-wider">
            MERCI, À BIENTÔT.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Adresse e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.fr"
              autoComplete="email"
              className="flex-1 bg-pau-white text-pau-night placeholder:text-pau-night/30 text-sm font-sans px-4 py-4 border border-pau-night/20 focus:outline-none focus:border-pau-night transition-colors duration-200 min-w-0 min-h-[44px]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-pau-night text-pau-white px-8 py-4 font-sans font-semibold uppercase tracking-wider hover:bg-pau-yellow hover:text-pau-night transition-colors duration-200 disabled:opacity-60 shrink-0 min-h-[44px]"
            >
              S'INSCRIRE
            </button>
          </form>
        )}
        </Reveal>
      </div>
    </section>
  );
}
