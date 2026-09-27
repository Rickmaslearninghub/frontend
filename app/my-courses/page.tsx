"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { apiFetch, type Video } from '../lib/api';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Professional'] as const;

export default function MyCoursesPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      apiFetch<Video[]>('/api/videos'),
      Promise.resolve(window.localStorage.getItem('rmcodelab_progress')),
    ])
      .then(([nextVideos, savedProgress]) => {
        setVideos(nextVideos);
        if (savedProgress) setProgress(JSON.parse(savedProgress) as Record<string, boolean>);
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const levelSummary = useMemo(() => {
    return LEVELS.map((level) => {
      const levelVideos = videos.filter((video) => video.level === level);
      const watched = levelVideos.filter((video) => progress[video.id]).length;
      const percentage = levelVideos.length === 0 ? 0 : Math.round((watched / levelVideos.length) * 100);
      return { level, total: levelVideos.length, watched, percentage };
    });
  }, [videos, progress]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200">Back to home</Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/70 to-amber-900/50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">My Courses</p>
          <h1 className="mt-3 text-4xl font-black text-white">Your learning progress</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Track the videos you have watched from start to finish and review your level completion percentage.</p>
        </div>

        {isLoading && <p className="mt-8 text-slate-300">Loading your progress...</p>}
        {error && <p className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-red-200">{error}</p>}
        <div className="mt-8 space-y-6">
          {levelSummary.map((summary) => (
            <div key={summary.level} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-blue-300">{summary.level}</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{summary.level} level</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">Watched videos: {summary.watched} / {summary.total}</p>
                  <p className="text-3xl font-black text-amber-300">{summary.percentage}%</p>
                </div>
              </div>
              <div className="mt-5 h-3 rounded-full bg-slate-800">
                <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-amber-500" style={{ width: `${summary.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
