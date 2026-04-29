'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images?.length ? images : [];
  const main = validImages[selectedIndex] ?? null;

  return (
    <div>
      <div className="relative aspect-square w-full bg-pau-night/[0.04]">
        {main ? (
          <Image
            src={main}
            alt={`${productName} — vue ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs font-sans uppercase tracking-wider text-pau-night/30">
              Sans image
            </span>
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div
          className="mt-4 grid grid-cols-4 gap-2"
          role="list"
          aria-label="Vignettes produit"
        >
          {validImages.map((src, i) => (
            <button
              key={i}
              role="listitem"
              onClick={() => setSelectedIndex(i)}
              aria-pressed={i === selectedIndex}
              aria-label={`Vue ${i + 1}`}
              className={[
                'relative aspect-square bg-pau-night/[0.04] border transition-colors',
                i === selectedIndex
                  ? 'border-pau-yellow'
                  : 'border-pau-night/10 hover:border-pau-night/30',
              ].join(' ')}
            >
              <Image
                src={src}
                alt={`${productName} — vignette ${i + 1}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
