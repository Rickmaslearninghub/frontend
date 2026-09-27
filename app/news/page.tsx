"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { apiFetch, type NewsItem } from '../lib/api';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch<NewsItem[]>('/api/news')
      .then((items) => setNews(items.filter((item) => item.published)))
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-300 hover:text-blue-200">Back to home</Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-blue-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">News</p>
          <h1 className="mt-3 text-4xl font-black text-white">Announcements & updates</h1>
        </div>

        {isLoading && <p className="mt-8 text-slate-300">Loading announcements...</p>}
        {error && <p className="mt-8 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 text-red-200">{error}</p>}
        <div className="mt-8 space-y-6">
          {!isLoading && news.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/80 p-8 text-center text-slate-300">No announcements have been added yet.</div>
          ) : (
            news.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h2 className="text-2xl font-bold text-white">{entry.title}</h2>
                <p className="mt-3 text-slate-300">{entry.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
