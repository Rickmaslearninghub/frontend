"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, PlayCircle, X } from 'lucide-react';
import { apiFetch, getYouTubeVideoId, type Video } from '../../lib/api';
import VideoPlayer from '../../VideoPlayer';

export default function LevelPage() {
  const params = useParams() as { level?: string };
  const levelKey = params.level || 'beginner';
  const [videos, setVideos] = useState<Video[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const apiLevel = levelKey.charAt(0).toUpperCase() + levelKey.slice(1).toLowerCase();
    apiFetch<Video[]>(`/api/videos/${encodeURIComponent(apiLevel)}`)
      .then(setVideos)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, [levelKey]);

  useEffect(() => {
    const savedProgress = window.localStorage.getItem('rmcodelab_progress');
    if (savedProgress) setProgress(JSON.parse(savedProgress) as Record<string, boolean>);
  }, []);

  const levelTitle = useMemo(() => ({ beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced', professional: 'Professional' }[levelKey.toLowerCase()] || 'Beginner'), [levelKey]);

  const handleWatched = (videoId: string) => {
    const nextProgress = { ...progress, [videoId]: true };
    setProgress(nextProgress);
    window.localStorage.setItem('rmcodelab_progress', JSON.stringify(nextProgress));
  };

  const openPlayer = (video: Video) => setSelectedVideo(video);
  const closePlayer = () => setSelectedVideo(null);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link href="/curriculum" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200">
          <ArrowLeft size={18} /> Back to curriculum
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/70 to-amber-900/50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">Level</p>
          <h1 className="mt-3 text-4xl font-black text-white">{levelTitle}</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Find the videos uploaded by the admin for this level and track the lessons you complete.</p>
        </div>

        {isLoading && <p className="mt-8 text-slate-300">Loading lessons...</p>}
        {error && <p className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-red-200">{error}</p>}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {videos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-10 text-center text-slate-300 lg:col-span-2">
              No videos have been uploaded for {levelTitle} yet.
            </div>
          ) : (
            videos.map((video) => {
              const videoId = getYouTubeVideoId(video.youtubeUrl);
              return (
                <div key={video.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                  <div className="relative overflow-hidden bg-slate-950">
                    {videoId ? (
                    <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt={video.title} className="h-60 w-full object-cover opacity-90" />
                    ) : (
                    <div className="flex h-60 w-full items-center justify-center bg-gray-800 text-gray-300">
                      <PlayCircle size={48} />
                      <span className="ml-3">Embedded video</span>
                    </div>
                    )}
                    <button onClick={() => openPlayer(video)} className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={52} className="text-white/90" />
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="mb-3 inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">{video.level}</div>
                    <h2 className="text-2xl font-bold text-white">{video.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{video.description || 'No description was provided for this lesson.'}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div />
                      <button type="button" onClick={() => handleWatched(video.id)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${progress[video.id] ? 'bg-green-600 text-white' : 'bg-white text-slate-900'}`}>
                        <CheckCircle2 size={16} /> {progress[video.id] ? 'Watched' : 'Mark as watched'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={closePlayer}>
            <div className="max-w-3xl w-full rounded-2xl bg-slate-900 p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-start justify-between">
                <h3 className="text-lg font-bold text-white">{selectedVideo.title}</h3>
                <button onClick={closePlayer} className="rounded bg-white/10 p-2 text-white"><X size={20} /></button>
              </div>
              <VideoPlayer url={selectedVideo.youtubeUrl} title={selectedVideo.title} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
