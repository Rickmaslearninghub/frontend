'use client';

import { useEffect, useState } from 'react';
import { apiFetch, type Course, type NewsItem, type Video } from '../lib/api';

export default function DashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [videoCount, setVideoCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([apiFetch<Course[]>('/api/courses'), apiFetch<NewsItem[]>('/api/news'), apiFetch<Video[]>('/api/videos')])
      .then(([nextCourses, nextNews, videos]) => {
        setCourses(nextCourses.filter((course) => course.isPublished));
        setNews(nextNews.filter((entry) => entry.published));
        setVideoCount(videos.length);
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  const stats = [
    { label: 'Published Courses', value: courses.length.toString() },
    { label: 'Video Lessons', value: videoCount.toString() },
    { label: 'Announcements', value: news.length.toString() },
    { label: 'Open Access', value: '100%' },
  ];
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-900/50 to-amber-900/40 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Student dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold">Welcome back, learner.</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Continue your journey with trending courses, progress tracking, and a modern learning experience.</p>
        </div>

        {isLoading && <p className="mt-8 text-slate-300">Loading dashboard...</p>}
        {error && <p className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-red-200">{error}</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Continue Learning</h2>
              <span className="text-sm text-amber-400">Updated today</span>
            </div>
            <div className="mt-6 space-y-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{course.title}</p>
                      <p className="text-sm text-slate-400">{course.level}</p>
                    </div>
                    <span className="text-sm text-sky-400">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                  </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-amber-500" style={{ width: course.isPublished ? '100%' : '0%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold">Latest News</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              {news.slice(0, 3).map((entry) => <div key={entry.id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><p className="font-semibold text-white">{entry.title}</p><p className="mt-2">{entry.content}</p></div>)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
