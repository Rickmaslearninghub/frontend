export default function BrowseVideosPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900 to-violet-900 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">Browse videos</p>
          <h1 className="mt-3 text-4xl font-black text-white">Advertisements coming soon</h1>
          <p className="mt-4 max-w-2xl text-slate-300">This section is reserved for ad placements and sponsored promotions. Training videos remain behind the level-based learning system.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <div key={slot} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-4 inline-flex rounded-full bg-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-900">Ad slot {slot}</div>
              <h2 className="text-2xl font-bold text-white">Sponsored content</h2>
              <p className="mt-3 text-slate-300">This area is reserved for future promotions, partnership banners, and business placements.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
