'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const schema = z
  .object({
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caracteres.'),
    passwordConfirm: z.string().min(1, 'Confirmation requise.'),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['passwordConfirm'],
  });

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [fields, setFields] = useState({ password: '', passwordConfirm: '' });
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
      const { error } = await supabase.auth.updateUser({
        password: parsed.data.password,
      });

      if (error) {
        setGlobalError('Impossible de reinitialiser le mot de passe. Le lien est peut-etre expire.');
        return;
      }

      router.push('/compte');
      router.refresh();
    } catch {
      setGlobalError('Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <h1 className="font-display text-2xl uppercase text-pau-white text-center mb-8">
        NOUVEAU MOT DE PASSE
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        {globalError && (
          <p role="alert" className="text-sm text-red-400 mb-6 text-center">
            {globalError}
          </p>
        )}

        <div className="flex flex-col gap-6 mb-8">
          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
            >
              Nouveau mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={fields.password}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? 'password-error' : 'password-hint'}
              className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
            />
            {fieldErrors.password ? (
              <p id="password-error" className="mt-1 text-xs text-red-400">
                {fieldErrors.password}
              </p>
            ) : (
              <p id="password-hint" className="mt-1 text-xs text-white/40 font-sans">
                8 caracteres minimum
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              value={fields.passwordConfirm}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.passwordConfirm}
              aria-describedby={
                fieldErrors.passwordConfirm ? 'passwordConfirm-error' : undefined
              }
              className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
            />
            {fieldErrors.passwordConfirm && (
              <p id="passwordConfirm-error" className="mt-1 text-xs text-red-400">
                {fieldErrors.passwordConfirm}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-pau-yellow text-pau-night text-sm font-sans font-semibold uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
        >
          {pending ? 'ENREGISTREMENT...' : 'ENREGISTRER'}
        </button>
      </form>
    </>
  );
}
