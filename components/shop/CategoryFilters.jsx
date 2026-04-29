'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { label: 'TOUS', value: '' },
  { label: 'MAILLOTS', value: 'maillots' },
  { label: 'LIFESTYLE', value: 'lifestyle' },
  { label: 'JUNIOR', value: 'junior' },
  { label: 'ACCESSOIRES', value: 'accessoires' },
];

export default function CategoryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('cat') ?? '';

  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('cat', value);
    } else {
      params.delete('cat');
    }
    router.push(`/boutique?${params.toString()}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12">
      <nav aria-label="Filtres catégories" className="flex flex-wrap gap-6 py-4">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => handleClick(cat.value)}
              aria-pressed={isActive}
              className={[
                'text-sm font-sans uppercase tracking-wider transition-colors',
                isActive
                  ? 'text-pau-yellow underline underline-offset-4 decoration-pau-yellow'
                  : 'text-pau-night/60 hover:text-pau-night',
              ].join(' ')}
            >
              {cat.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
