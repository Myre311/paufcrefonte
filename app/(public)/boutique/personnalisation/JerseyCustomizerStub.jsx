'use client';

import { useState } from 'react';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function JerseyCustomizerStub() {
  const [nom, setNom] = useState('');
  const [numero, setNumero] = useState('');
  const [taille, setTaille] = useState(SIZES[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div
        className="aspect-square bg-pau-primary border border-white/10 flex flex-col items-center justify-center gap-4"
        aria-label="Apercu 3D du maillot — module en cours de chargement"
      >
        <p className="font-display text-xl uppercase text-white/30 tracking-wider">
          Module 3D
        </p>
        <p className="text-xs font-sans uppercase tracking-widest text-white/20">
          MODULE 3D EN COURS DE CHARGEMENT
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl uppercase text-white mb-8">
          TON FLOCAGE
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="flocage-nom"
              className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2"
            >
              Nom (12 caractères max)
            </label>
            <input
              id="flocage-nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value.slice(0, 12).toUpperCase())}
              maxLength={12}
              placeholder="TON NOM"
              className="w-full bg-pau-primary border border-white/10 px-4 py-3 text-white font-sans text-sm uppercase tracking-wider placeholder:text-white/20 focus:outline-none focus:border-pau-yellow/50"
            />
            <p className="mt-1 text-xs font-sans text-white/30 text-right">
              {nom.length}/12
            </p>
          </div>

          <div>
            <label
              htmlFor="flocage-numero"
              className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2"
            >
              Numero (1-99)
            </label>
            <input
              id="flocage-numero"
              type="number"
              value={numero}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (e.target.value === '') {
                  setNumero('');
                } else if (!isNaN(val) && val >= 1 && val <= 99) {
                  setNumero(String(val));
                }
              }}
              min={1}
              max={99}
              placeholder="10"
              className="w-full bg-pau-primary border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-pau-yellow/50"
            />
          </div>

          <div>
            <label
              htmlFor="flocage-taille"
              className="block text-xs font-sans uppercase tracking-widest text-white/60 mb-2"
            >
              Taille
            </label>
            <select
              id="flocage-taille"
              value={taille}
              onChange={(e) => setTaille(e.target.value)}
              className="w-full bg-pau-primary border border-white/10 px-4 py-3 text-white font-sans text-sm focus:outline-none focus:border-pau-yellow/50"
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full bg-white/10 text-white/30 px-8 py-4 font-sans font-semibold uppercase tracking-wider cursor-not-allowed"
          >
            AJOUTER AU PANIER
          </button>

          <p className="text-xs font-sans text-white/30 text-center">
            Le configurateur 3D sera disponible prochainement.
          </p>
        </form>
      </div>
    </div>
  );
}
