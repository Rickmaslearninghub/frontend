import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AdminRedirectPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Admin Dashboard Moved
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The admin panel is now on a separate website for better security and performance.
        </p>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Admin Dashboard</h2>
          <a
            href={process.env.NEXT_PUBLIC_ADMIN_URL || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg transition"
          >
            Open Admin Dashboard <ArrowRight size={20} />
          </a>
        </div>

        <div className="space-y-4 text-gray-600">
          <p>Manage videos, courses, and all admin features there.</p>
          <p className="text-sm text-gray-500">Make sure the admin application is running on port 3001.</p>
        </div>

        <Link href="/" className="mt-10 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
          Back to Website
        </Link>
      </div>
    </main>
  );
}
