"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LEVELS, getVideoLibrary } from '../lib/site-data';

export default function CurriculumPage() {
  const router = useRouter();
  const [videos, setVideos] = useState(() => getVideoLibrary().filter((video) => video.isPublished));

  useEffect(() => {
    setVideos(getVideoLibrary().filter((video) => video.isPublished));
  }, []);

  const handleLevelOpen = (level: string) => {
    router.push(`/curriculum/${level.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200">
          <ArrowLeft size={18} /> Back to home
        </Link>

        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/70 to-amber-900/50 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">Curriculum</p>
          <h1 className="mt-3 text-4xl font-black text-white lg:text-5xl">Select your level</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Choose one of the four learning levels to access the videos uploaded by the admin for that stage.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {LEVELS.map((level) => {
            const levelVideos = videos.filter((video) => video.level === level);
            return (
              <button key={level} type="button" onClick={() => handleLevelOpen(level)} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-left transition hover:border-blue-400 hover:bg-slate-900">
                <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{level}</div>
                <h2 className="text-2xl font-bold text-white">{level}</h2>
                <p className="mt-3 text-sm text-slate-300">{levelVideos.length} {levelVideos.length === 1 ? 'video' : 'videos'} available</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  {levelVideos.slice(0, 3).map((video) => (
                    <li key={video.id} className="truncate">• {video.title}</li>
                  ))}
                </ul>
                <div className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-300">
                  Open {level} videos <ArrowLeft className="rotate-180" size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
