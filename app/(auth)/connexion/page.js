'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const schema = z.object({
  email: z.string().email('Adresse e-mail invalide.'),
  password: z.string().min(1, 'Mot de passe requis.'),
});

function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/compte';

  const [fields, setFields] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [pending, setPending] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError('');

    const parsed = schema.safeParse(fields);
    if (!parsed.success) {
      const errs = {};
      for (const issue of parsed.error.issues) {
        errs[issue.path[0]] = issue.message;
      }
      setFieldErrors(errs);
      return;
    }

    setPending(true);
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });

      if (error) {
        setGlobalError('Identifiant ou mot de passe incorrect.');
        return;
      }

      router.push(next);
      router.refresh();
    } catch {
      setGlobalError('Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {globalError && (
        <p role="alert" className="text-sm text-red-400 mb-6 text-center">
          {globalError}
        </p>
      )}

      <div className="flex flex-col gap-6 mb-8">
        <div>
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
            value={fields.email}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
          />
          {fieldErrors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-400">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
          >
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
          />
          {fieldErrors.password && (
            <p id="password-error" className="mt-1 text-xs text-red-400">
              {fieldErrors.password}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-pau-yellow text-pau-night text-sm font-sans font-semibold uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
      >
        {pending ? 'CONNEXION...' : 'SE CONNECTER'}
      </button>
    </form>
  );
}

export default function ConnexionPage() {
  return (
    <>
      <h1 className="font-display text-2xl uppercase text-pau-white text-center mb-8">
        SE CONNECTER
      </h1>

      <Suspense>
        <ConnexionForm />
      </Suspense>

      <div className="mt-6 text-center">
        <Link
          href="/mot-de-passe-oublie"
          className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200 font-sans"
        >
          Mot de passe oublie ?
        </Link>
      </div>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-white/50 font-sans mb-3">Pas encore inscrit ?</p>
        <Link
          href="/inscription"
          className="inline-block text-xs font-sans uppercase tracking-widest border border-white/20 px-6 py-2 text-pau-white hover:bg-white/5 transition-colors duration-200"
        >
          CREER UN COMPTE
        </Link>
      </div>
    </>
  );
}
