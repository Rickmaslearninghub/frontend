export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-slate-400">The page you are looking for does not exist.</p>
      </div>
    </main>
  );
}
