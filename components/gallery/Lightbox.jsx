'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-pau-night/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Visionneuse photo"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-6 right-6 text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-200"
      >
        FERMER
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Photo précédente"
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl leading-none transition-colors duration-200"
      >
        &larr;
      </button>

      <div
        className="relative max-w-5xl w-full mx-12 aspect-[4/3]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={current.imageUrl}
          alt={current.title || ''}
          fill
          sizes="90vw"
          className="object-contain"
          priority
        />
        {current.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-pau-night/70 px-6 py-4">
            <p className="text-sm text-white/80 font-sans">{current.title}</p>
            {current.photographer && (
              <p className="text-xs text-white/40 mt-1">Photo : {current.photographer}</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Photo suivante"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl leading-none transition-colors duration-200"
      >
        &rarr;
      </button>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 tabular-nums">
        {currentIndex + 1} / {images.length}
      </p>
    </div>
  );
}
