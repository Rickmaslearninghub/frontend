"use client";

import React from 'react';
import { getYouTubeVideoId } from './lib/api';

type Props = {
  url: string;
  title?: string;
  className?: string;
};

export default function VideoPlayer({ url, title, className }: Props) {
  const youtubeId = getYouTubeVideoId(url);
  let src = '';

  if (youtubeId) {
    src = `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  } else {
    try {
      const parsed = new URL(url);
      // If the provided URL looks like an iframe src (Bunny player), use it directly
      src = parsed.href;
    } catch (e) {
      src = url; // fallback to whatever was provided
    }
  }

  // Responsive 16:9 container
  return (
    <div className={`relative w-full overflow-hidden rounded-2xl bg-black ${className || ''}`} style={{ paddingTop: '56.25%' }}>
      <iframe
        title={title || 'Video player'}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute left-0 top-0 h-full w-full border-0"
      />
    </div>
  );
}
