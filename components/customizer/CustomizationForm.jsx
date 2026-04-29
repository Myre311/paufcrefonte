'use client';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const KITS = [
  { value: 'home', label: 'Domicile' },
  { value: 'away', label: 'Exterieur' },
  { value: 'third', label: 'Third' },
];

const BASE_PRICE = 89;
const FLOCAGE_PRICE = 15;

export default function CustomizationForm({
  kit,
  setKit,
  name,
  setName,
  number,
  setNumber,
  size,
  setSize,
  quantity,
  setQuantity,
  onAddToCart,
}) {
  const hasFlocage = name.trim().length > 0 || (number >= 1 && number <= 99);
  const unitPrice = BASE_PRICE + (hasFlocage ? FLOCAGE_PRICE : 0);
  const total = unitPrice * quantity;
  const canSubmit = name.trim().length > 0 && number >= 1 && number <= 99;

  function handleNameChange(e) {
    setName(e.target.value.toUpperCase().slice(0, 12));
  }

  function handleNumberChange(e) {
    const raw = e.target.value;
    if (raw === '') {
      setNumber('');
      return;
    }
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= 1 && val <= 99) {
      setNumber(val);
    }
  }

  function handleDecrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function handleIncrement() {
    setQuantity((q) => Math.min(10, q + 1));
  }

  const labelClass =
    'block text-[10px] font-sans uppercase tracking-widest text-pau-night/50 mb-3';
  const fieldClass =
    'bg-transparent border-b border-pau-night/20 py-3 focus:border-pau-night focus:outline-none text-pau-night font-sans text-2xl uppercase tracking-widest w-full transition-colors duration-150';
  const kitBtnBase =
    'border px-4 py-3 font-sans text-sm uppercase tracking-widest transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow';
  const kitBtnActive = 'border-pau-yellow bg-pau-yellow/10 text-pau-yellow';
  const kitBtnInactive = 'border-pau-night/20 text-pau-night/60 hover:border-pau-night hover:text-pau-night';

  return (
    <div className="space-y-10">
      <h2 className="font-display text-2xl uppercase text-pau-night">
        TON FLOCAGE
      </h2>

      {/* MODELE */}
      <fieldset>
        <legend className={labelClass}>MODELE</legend>
        <div className="flex gap-3">
          {KITS.map((k) => (
            <button
              key={k.value}
              type="button"
              aria-pressed={kit === k.value}
              onClick={() => setKit(k.value)}
              className={`${kitBtnBase} ${kit === k.value ? kitBtnActive : kitBtnInactive}`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* NOM */}
      <div>
        <label htmlFor="flocage-nom" className={labelClass}>
          NOM (12 CARACTERES MAX)
        </label>
        <input
          id="flocage-nom"
          type="text"
          value={name}
          onChange={handleNameChange}
          maxLength={12}
          placeholder="TON NOM"
          autoComplete="off"
          className={fieldClass}
        />
        <p className="mt-1 text-[10px] font-sans text-pau-night/30 text-right tabular-nums">
          {name.length}/12
        </p>
      </div>

      {/* NUMERO */}
      <div>
        <label htmlFor="flocage-numero" className={labelClass}>
          NUMERO (1-99)
        </label>
        <input
          id="flocage-numero"
          type="number"
          value={number}
          onChange={handleNumberChange}
          min={1}
          max={99}
          placeholder="10"
          className={fieldClass}
        />
      </div>

      {/* TAILLE */}
      <fieldset>
        <legend className={labelClass}>TAILLE</legend>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`${kitBtnBase} min-w-[52px] ${size === s ? kitBtnActive : kitBtnInactive}`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      {/* QUANTITE */}
      <div>
        <p className={labelClass}>QUANTITE</p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleDecrement}
            aria-label="Diminuer la quantite"
            className="w-10 h-10 border border-pau-night/20 text-pau-night font-sans text-xl hover:border-pau-night/60 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow"
          >
            -
          </button>
          <output
            aria-live="polite"
            aria-label="Quantite selectionnee"
            className="font-sans text-xl text-pau-night tabular-nums w-8 text-center"
          >
            {quantity}
          </output>
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Augmenter la quantite"
            className="w-10 h-10 border border-pau-night/20 text-pau-night font-sans text-xl hover:border-pau-night/60 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow"
          >
            +
          </button>
        </div>
      </div>

      {/* PRIX */}
      <div className="border-t border-pau-night/10 pt-6 space-y-1">
        <div className="flex justify-between text-sm font-sans text-pau-night/60">
          <span>Maillot</span>
          <span>{BASE_PRICE} &euro;</span>
        </div>
        {hasFlocage && (
          <div className="flex justify-between text-sm font-sans text-pau-night/60">
            <span>Flocage personnalise</span>
            <span>+ {FLOCAGE_PRICE} &euro;</span>
          </div>
        )}
        <div className="flex justify-between pt-3 border-t border-pau-night/10">
          <span className="font-sans text-pau-night/80 uppercase tracking-widest text-xs">
            Total
          </span>
          <span className="font-display text-3xl text-pau-yellow tabular-nums">
            {total}&nbsp;&euro;
          </span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onAddToCart}
        disabled={!canSubmit}
        aria-disabled={!canSubmit}
        className={`w-full px-8 py-5 font-sans font-semibold uppercase tracking-widest transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pau-yellow ${
          canSubmit
            ? 'bg-pau-yellow text-pau-night hover:bg-white cursor-pointer'
            : 'bg-pau-night/10 text-pau-night/30 cursor-not-allowed'
        }`}
      >
        AJOUTER AU PANIER
      </button>

      {!canSubmit && (
        <p className="text-[10px] font-sans text-pau-night/30 text-center">
          Renseigne un nom et un numero pour activer l&apos;ajout.
        </p>
      )}
    </div>
  );
}
