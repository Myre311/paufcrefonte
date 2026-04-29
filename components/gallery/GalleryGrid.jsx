'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';

export default function GalleryGrid({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);

  function close() {
    setActiveIndex(null);
  }

  function prev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(idx)}
            className="w-full mb-4 break-inside-avoid block text-left hover:opacity-80 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-pau-yellow focus-visible:outline-offset-2"
            aria-label={img.title || `Photo ${idx + 1}`}
          >
            <Image
              src={img.thumbnailUrl || img.imageUrl}
              alt={img.title || ''}
              width={600}
              height={400}
              className="w-full object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {img.title && (
              <p className="text-xs text-white/50 mt-2 px-0 font-sans">{img.title}</p>
            )}
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={activeIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
