'use client';

import { useEffect, useCallback } from 'react';

function buildEmbedUrl(video) {
  const { provider, videoId, videoUrl } = video;

  if (provider === 'youtube' && videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  if (provider === 'vimeo' && videoId) {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
  }
  // direct fallback handled separately
  return null;
}

export default function VideoLightbox({ video, onClose }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const embedUrl = buildEmbedUrl(video);

  return (
    <div
      className="fixed inset-0 z-50 bg-pau-night/95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-6 right-6 text-white/60 hover:text-white text-sm uppercase tracking-widest transition-colors duration-200"
      >
        FERMER
      </button>

      <div
        className="relative w-full max-w-5xl mx-6 aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            title={video.title}
          />
        )}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-white/70 font-sans">{video.title}</p>
      </div>
    </div>
  );
}
