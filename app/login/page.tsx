"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { getAuthUser, getPendingRedirect, getRegisteredAccounts, setAuthUser, setPendingRedirect } from '../lib/site-data';

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect') || getPendingRedirect();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (getAuthUser()) {
      router.push(redirectParam || '/curriculum');
    }
  }, [redirectParam, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accounts = getRegisteredAccounts();
    const match = accounts.find((account) => account.email.toLowerCase() === form.email.toLowerCase().trim() && account.password === form.password);

    if (!match) {
      setError('Incorrect email or password. Please create an account or use the correct details.');
      return;
    }

    setAuthUser({ name: match.name, email: match.email, password: match.password });
    setPendingRedirect(redirectParam || '/curriculum');
    router.push(redirectParam || '/curriculum');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 text-slate-300">Sign in to continue your learning journey.</p>

        {error && <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="Email"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400"
          />
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="Password"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400"
          />
          <button type="submit" className="w-full rounded-2xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-500">Login</button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          New here? <Link href="/register" className="text-amber-400">Create account</Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">Loading...</main>}>
      <LoginPageContent />
    </Suspense>
  );
}
