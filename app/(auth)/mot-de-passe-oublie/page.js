'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const schema = z.object({
  email: z.string().email('Adresse e-mail invalide.'),
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setEmailError('');

    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message ?? 'Adresse invalide.');
      return;
    }

    setPending(true);
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.resetPasswordForEmail(parsed.data.email, {
        redirectTo: `${SITE_URL}/reinitialiser-mot-de-passe`,
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setPending(false);
    }
  }

  if (submitted) {
    return (
      <>
        <h1 className="font-display text-2xl uppercase text-pau-white text-center mb-6">
          VERIFIEZ VOS E-MAILS
        </h1>
        <p className="text-sm text-white/70 text-center font-sans leading-relaxed mb-8">
          Si l&apos;adresse est connue, vous recevrez un lien de reinitialisation.
        </p>
        <div className="text-center">
          <Link
            href="/connexion"
            className="text-xs uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors duration-200 font-sans"
          >
            Retour a la connexion
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="font-display text-2xl uppercase text-pau-white text-center mb-4">
        MOT DE PASSE OUBLIE
      </h1>
      <p className="text-sm text-white/50 text-center font-sans mb-8">
        Renseignez votre adresse e-mail pour recevoir un lien.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-8">
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
          >
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
            className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
          />
          {emailError && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {emailError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-pau-yellow text-pau-night text-sm font-sans font-semibold uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
        >
          {pending ? 'ENVOI...' : 'RECEVOIR LE LIEN'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/connexion"
          className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200 font-sans"
        >
          Retour a la connexion
        </Link>
      </div>
    </>
  );
}
