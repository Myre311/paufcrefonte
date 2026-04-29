'use client';

import { useState } from 'react';
import Image from 'next/image';
import VideoLightbox from './VideoLightbox';

function formatDuration(seconds) {
  if (!seconds) return null;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function getThumbnail(video) {
  if (video.thumbnailUrl) return video.thumbnailUrl;
  if (video.provider === 'youtube' && video.videoId) {
    return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  }
  return null;
}

export default function VideoGrid({ videos }) {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12">
        {videos.map((video) => {
          const thumb = getThumbnail(video);
          const duration = formatDuration(video.duration);

          return (
            <button
              key={video.id}
              type="button"
              onClick={() => setActive(video)}
              className="group text-left focus-visible:outline-2 focus-visible:outline-pau-yellow focus-visible:outline-offset-2"
              aria-label={`Lire : ${video.title}`}
            >
              <div className="relative aspect-video overflow-hidden bg-pau-primary mb-4">
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:opacity-80 transition-opacity duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-pau-primary" aria-hidden="true" />
                )}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 border border-pau-white/60 flex items-center justify-center group-hover:border-pau-white transition-colors duration-200">
                    <span className="sr-only">Lire</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-pau-white translate-x-0.5"
                      aria-hidden="true"
                    >
                      <path d="M4 2l10 6-10 6V2z" />
                    </svg>
                  </div>
                </div>
                {duration && (
                  <span className="absolute bottom-2 right-2 bg-pau-night/80 text-xs text-white/80 px-2 py-0.5 font-sans tabular-nums">
                    {duration}
                  </span>
                )}
              </div>
              <h3 className="font-sans font-semibold text-sm uppercase text-pau-white leading-snug group-hover:opacity-80 transition-opacity duration-200">
                {video.title}
              </h3>
            </button>
          );
        })}
      </div>

      {active && (
        <VideoLightbox video={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
