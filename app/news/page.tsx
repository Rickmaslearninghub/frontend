"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getNewsItems, type NewsItem } from '../lib/site-data';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    setNews(getNewsItems());
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-blue-300 hover:text-blue-200">Back to home</Link>
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 to-blue-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">News</p>
          <h1 className="mt-3 text-4xl font-black text-white">Announcements & updates</h1>
        </div>

        <div className="mt-8 space-y-6">
          {news.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/80 p-8 text-center text-slate-300">No announcements have been added yet.</div>
          ) : (
            news.map((entry) => (
              <article key={entry.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <h2 className="text-2xl font-bold text-white">{entry.title}</h2>
                <p className="mt-3 text-slate-300">{entry.summary}</p>
                {entry.pdfUrl && (
                  <a href={entry.pdfUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-blue-600 px-4 py-2 font-semibold text-white">Open PDF</a>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
