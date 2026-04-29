'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const SUBJECTS = [
  { value: 'general', label: 'Général' },
  { value: 'billetterie', label: 'Billetterie' },
  { value: 'boutique', label: 'Boutique' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'presse', label: 'Presse' },
  { value: 'academie', label: 'Académie' },
];

const inputClass =
  'bg-transparent border-b border-pau-night/20 py-4 px-0 focus:border-pau-yellow text-pau-night placeholder-pau-night/30 outline-none w-full transition-colors duration-200 font-sans text-sm';
const labelClass =
  'block text-xs uppercase tracking-widest text-pau-night/60 mb-1';

export default function ContactForm({ defaultSubject = '' }) {
  const [pending, setPending] = useState(false);
  const [fields, setFields] = useState({
    nom: '',
    email: '',
    sujet: defaultSubject || 'general',
    message: '',
  });

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.nom,
          email: fields.email,
          subject: fields.sujet,
          message: fields.message,
        }),
      });

      if (res.ok) {
        toast.success('Message envoyé. Réponse sous 48h.');
        setFields({ nom: '', email: '', sujet: 'general', message: '' });
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div>
        <label htmlFor="nom" className={labelClass}>
          Nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          value={fields.nom}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Votre nom"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="sujet" className={labelClass}>
          Sujet
        </label>
        <select
          id="sujet"
          name="sujet"
          value={fields.sujet}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          {SUBJECTS.map(({ value, label }) => (
            <option key={value} value={value} className="bg-pau-white text-pau-night">
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={fields.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Votre message..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-start bg-pau-yellow text-pau-night px-8 py-4 text-sm font-sans font-semibold uppercase tracking-widest hover:opacity-80 transition-opacity duration-200 disabled:opacity-50"
      >
        {pending ? 'ENVOI...' : 'ENVOYER'}
      </button>
    </form>
  );
}
