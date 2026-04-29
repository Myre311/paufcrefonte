'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const schema = z
  .object({
    firstName: z.string().min(1, 'Prenom requis.'),
    lastName: z.string().min(1, 'Nom requis.'),
    email: z.string().email('Adresse e-mail invalide.'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caracteres.'),
    passwordConfirm: z.string().min(1, 'Confirmation requise.'),
    cgv: z.literal(true, { errorMap: () => ({ message: 'Vous devez accepter les CGV.' }) }),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    message: 'Les mots de passe ne correspondent pas.',
    path: ['passwordConfirm'],
  });

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  cgv: false,
};

export default function InscriptionPage() {
  const router = useRouter();
  const [fields, setFields] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [pending, setPending] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setGlobalError('');

    const parsed = schema.safeParse({ ...fields });
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
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          data: {
            first_name: parsed.data.firstName,
            last_name: parsed.data.lastName,
          },
        },
      });

      if (error) {
        setGlobalError('Une erreur est survenue lors de la creation du compte.');
        return;
      }

      router.push('/compte/profil');
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
        CREER MON COMPTE
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        {globalError && (
          <p role="alert" className="text-sm text-red-400 mb-6 text-center">
            {globalError}
          </p>
        )}

        <div className="flex flex-col gap-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
              >
                Prenom
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={fields.firstName}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.firstName}
                aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
              />
              {fieldErrors.firstName && (
                <p id="firstName-error" className="mt-1 text-xs text-red-400">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
              >
                Nom
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={fields.lastName}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.lastName}
                aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
                className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
              />
              {fieldErrors.lastName && (
                <p id="lastName-error" className="mt-1 text-xs text-red-400">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

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

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                id="cgv"
                name="cgv"
                type="checkbox"
                checked={fields.cgv}
                onChange={handleChange}
                aria-invalid={!!fieldErrors.cgv}
                aria-describedby={fieldErrors.cgv ? 'cgv-error' : undefined}
                className="mt-0.5 w-4 h-4 accent-pau-yellow flex-shrink-0"
              />
              <span className="text-xs text-white/60 font-sans leading-relaxed">
                J&apos;accepte les{' '}
                <Link href="/cgv" className="text-pau-yellow hover:opacity-80 transition-opacity duration-200">
                  conditions generales de vente
                </Link>
              </span>
            </label>
            {fieldErrors.cgv && (
              <p id="cgv-error" className="mt-1 text-xs text-red-400">
                {fieldErrors.cgv}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-pau-yellow text-pau-night text-sm font-sans font-semibold uppercase tracking-widest py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
        >
          {pending ? 'CREATION EN COURS...' : 'CREER MON COMPTE'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <p className="text-xs text-white/50 font-sans mb-3">Deja un compte ?</p>
        <Link
          href="/connexion"
          className="inline-block text-xs font-sans uppercase tracking-widest border border-white/20 px-6 py-2 text-pau-white hover:bg-white/5 transition-colors duration-200"
        >
          SE CONNECTER
        </Link>
      </div>
    </>
  );
}
