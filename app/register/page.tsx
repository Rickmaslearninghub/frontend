"use client";

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useState } from 'react';
import { getAuthUser, getPendingRedirect, getRegisteredAccounts, setAuthUser, setPendingRedirect, setRegisteredAccounts } from '../lib/site-data';

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect') || getPendingRedirect();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (getAuthUser()) {
      router.push(redirectParam || '/curriculum');
    }
  }, [redirectParam, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const accounts = getRegisteredAccounts();
    const alreadyExists = accounts.some((account) => account.email.toLowerCase() === email);
    if (alreadyExists) {
      setError('An account with this email already exists. Please sign in instead.');
      return;
    }

    const account = { name: form.name.trim() || 'New learner', email, password };
    const nextAccounts = [...accounts, account];
    setRegisteredAccounts(nextAccounts);
    setAuthUser(account);
    setPendingRedirect(redirectParam || '/curriculum');
    router.push(redirectParam || '/curriculum');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
        <h1 className="text-3xl font-semibold text-white">Create your account</h1>
        <p className="mt-2 text-slate-300">Save your email and password after registration. You will need them to sign in again.</p>

        {error && <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Full Name" />
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Email" required />
          <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-400" placeholder="Password" required />
          <button type="submit" className="w-full rounded-2xl bg-amber-500 px-4 py-3 font-semibold text-slate-950">Register</button>
        </form>
        <p className="mt-4 text-sm text-slate-400">
          Already have an account? <Link href="/login" className="text-amber-400">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">Loading...</main>}>
      <RegisterPageContent />
    </Suspense>
  );
}
