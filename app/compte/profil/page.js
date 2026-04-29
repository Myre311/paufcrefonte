'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { getSupabaseBrowser } from '@/lib/supabase/client';

const schema = z.object({
  firstName: z.string().min(1, 'Prenom requis.'),
  lastName: z.string().min(1, 'Nom requis.'),
  phone: z.string().optional(),
  line1: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().default('FR'),
});

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  line1: '',
  postalCode: '',
  city: '',
  country: 'FR',
};

export default function ProfilPage() {
  const [fields, setFields] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const supabase = getSupabaseBrowser();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const meta = user.user_metadata ?? {};
      setFields((prev) => ({
        ...prev,
        email: user.email ?? '',
        firstName: meta.first_name ?? '',
        lastName: meta.last_name ?? '',
      }));
      setLoaded(true);
    }
    loadUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
      const res = await fetch('/api/compte/profil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error ?? 'Erreur lors de la sauvegarde.');
        return;
      }

      toast.success('Profil mis a jour.');
    } catch {
      toast.error('Une erreur est survenue. Veuillez reessayer.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2 font-sans">
          ESPACE CLIENT
        </p>
        <h1 className="font-display text-3xl uppercase text-pau-white">
          MON PROFIL
        </h1>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset disabled={!loaded} className="border-0 p-0 m-0">
          <legend className="sr-only">Informations personnelles</legend>

          <div className="bg-pau-primary border border-white/10 p-6 mb-6">
            <h2 className="text-xs uppercase tracking-widest text-white/50 mb-6 font-sans">
              Informations personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  value={fields.email}
                  readOnly
                  aria-readonly="true"
                  className="w-full bg-transparent border-b border-white/10 pb-2 text-white/40 text-sm font-sans cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-white/30 font-sans">
                  L&apos;adresse e-mail ne peut pas etre modifiee.
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
                >
                  Telephone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <div className="bg-pau-primary border border-white/10 p-6 mb-8">
            <h2 className="text-xs uppercase tracking-widest text-white/50 mb-6 font-sans">
              Adresse de livraison
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="line1"
                  className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
                >
                  Rue
                </label>
                <input
                  id="line1"
                  name="line1"
                  type="text"
                  autoComplete="address-line1"
                  value={fields.line1}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
                >
                  Code postal
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  autoComplete="postal-code"
                  value={fields.postalCode}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
                >
                  Ville
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={fields.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-sans"
                >
                  Pays
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  autoComplete="country"
                  value={fields.country}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-pau-white text-sm font-sans focus:outline-none focus:border-pau-yellow transition-colors duration-200"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={pending || !loaded}
            className="text-sm font-sans font-semibold uppercase tracking-widest bg-pau-yellow text-pau-night px-8 py-3 hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
          >
            {pending ? 'ENREGISTREMENT...' : 'ENREGISTRER'}
          </button>
        </fieldset>
      </form>
    </div>
  );
}
