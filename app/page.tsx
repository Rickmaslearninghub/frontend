"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, BookOpen, Brain, Facebook, FileText, Instagram, Mail, Menu, Music2, Phone, ShieldCheck, Sparkles, Youtube, Zap } from 'lucide-react';
import { CONTACT_EMAIL, LEVELS, getBannerText, getVideoLibrary } from './lib/site-data';

const featuredCourses = [
  { title: 'AI & Automation', description: 'Practical automation systems, AI workflows, and business transformation.' },
  { title: 'Python Programming', description: 'Solve real-world problems with Python, automation, and coding logic.' },
  { title: 'Web Development', description: 'Build modern websites, dashboards, and digital products from scratch.' },
  { title: 'Canva Masterclass', description: 'Create high-impact graphics and creative assets for brands and business.' },
  { title: 'Prompt Engineering', description: 'Master AI prompting, tool workflows, and productivity systems.' },
  { title: 'Video Editing', description: 'Edit short-form and professional stories for online growth and business.' },
];

const stats = [
  { value: '10,000+', label: 'Students' },
  { value: '250+', label: 'Video Lessons' },
  { value: '50+', label: 'Professional Courses' },
  { value: '95%', label: 'Completion Rate' },
];

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', feedback: '' });
  const [bannerText, setBannerTextState] = useState('');

  useEffect(() => {
    setBannerTextState(getBannerText());
  }, []);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent('RMCodeLab Academy Feedback');
    const body = encodeURIComponent(`Name: ${contactForm.name}\n\nFeedback:\n${contactForm.feedback}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setShowContactModal(false);
    setContactForm({ name: '', feedback: '' });
  };

  const startLearning = () => {
    // Direct to beginner level (no login required)
    window.location.href = '/curriculum/beginner';
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-12">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-black tracking-tight text-transparent bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text">
              RMCodeLab Academy
            </Link>

            <div className="hidden items-center gap-7 md:flex">
              <Link href="/" className="font-medium text-slate-700 transition hover:text-blue-600">Home</Link>
              <Link href="/curriculum" className="font-medium text-slate-700 transition hover:text-blue-600">Curriculum</Link>
              <Link href="/my-courses" className="font-medium text-slate-700 transition hover:text-blue-600">My Courses</Link>
              <Link href="#" className="font-medium text-slate-700 transition hover:text-blue-600">Donate</Link>
              <Link href="/news" className="font-medium text-slate-700 transition hover:text-blue-600">News</Link>
              <button type="button" onClick={() => setShowContactModal(true)} className="font-medium text-slate-700 transition hover:text-blue-600">Contact</button>
            </div>

            <div className="hidden items-center gap-3 md:flex">
            {/* Login/Register removed — all levels are open */}
            </div>

            <button type="button" onClick={() => setMobileMenuOpen((current) => !current)} className="rounded-lg border border-slate-200 p-2 md:hidden">
              <Menu size={20} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 space-y-3 border-t border-slate-200 pt-4 md:hidden">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-700">Home</Link>
              <Link href="/curriculum" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-700">Curriculum</Link>
              <Link href="/my-courses" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-700">My Courses</Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-700">Donate</Link>
              <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="block font-medium text-slate-700">News</Link>
              <button type="button" onClick={() => { setShowContactModal(true); setMobileMenuOpen(false); }} className="block w-full text-left font-medium text-slate-700">Contact</button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative px-6 pb-20 pt-20 lg:px-12 lg:pt-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-amber-50" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              <Zap size={16} /> Welcome to excellence
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900 lg:text-6xl">
              Master <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">AI</span> and digital skills.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-slate-600">
              Learn AI, programming, website development, business systems, graphic design, video editing, prompt engineering, and more from beginner to professional levels.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/login?redirect=/curriculum/beginner" onClick={startLearning} className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-amber-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-xl">
                Start Learning Free <ArrowRight size={20} />
              </Link>
              <Link href="/curriculum" className="flex items-center justify-center gap-2 rounded-full border-2 border-blue-600 px-8 py-4 text-lg font-bold text-blue-600 transition hover:bg-blue-50">
                Explore Courses <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredCourses.map((course) => (
              <div key={course.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-amber-500 text-white">
                  {course.title.includes('AI') ? <Brain size={22} /> : course.title.includes('Python') ? <BookOpen size={22} /> : course.title.includes('Web') ? <Zap size={22} /> : <Sparkles size={22} />}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-600">Levels</p>
            <h2 className="mt-4 text-4xl font-black text-slate-900">Choose your learning path</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {LEVELS.map((level) => (
              <Link key={level} href={`/curriculum/${level.toLowerCase()}`} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl">
                <div className="mb-5 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-amber-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{level}</div>
                <h3 className="text-2xl font-bold text-slate-900">{level} level</h3>
                <p className="mt-3 text-slate-600">Access a curated lesson library and learning roadmap designed for your stage.</p>
                <div className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-600">
                  Open level <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white lg:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-blue-200">Ready to transform your career?</p>
              <h2 className="mt-4 text-4xl font-black">Build the skills that open new opportunities.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/curriculum/beginner" className="rounded-full bg-white px-7 py-3 text-center font-bold text-blue-700 transition hover:bg-slate-100">Start Your Free Trial</Link>
              <Link href="/browse-videos" className="rounded-full border border-white/40 px-7 py-3 text-center font-bold text-white transition hover:bg-white/5">Browse All Videos</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-slate-100 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300">What you get</p>
            <h2 className="mt-4 text-4xl font-black">Everything you need to learn with confidence</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: <BadgeCheck className="text-amber-300" />, title: 'Structured curriculum', text: 'Course content arranged by clear level progression and real-world projects.' },
              { icon: <ShieldCheck className="text-blue-300" />, title: 'Trusted support', text: 'Access lessons, announcements, and practical materials built for independent learning.' },
              { icon: <FileText className="text-emerald-300" />, title: 'Record your progress', text: 'Track completed videos and stay motivated through each level of the learning journey.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800">{item.icon}</div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-100 px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-slate-600">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/curriculum" className="hover:text-blue-600">Curriculum</Link></li>
              <li><Link href="/my-courses" className="hover:text-blue-600">My Courses</Link></li>
              <li><button type="button" onClick={() => setShowContactModal(true)} className="hover:text-blue-600">Contact</button></li>
              <li><button type="button" onClick={() => setShowPrivacy(true)} className="hover:text-blue-600">Privacy Policy</button></li>
              <li><button type="button" onClick={() => setShowTerms(true)} className="hover:text-blue-600">Terms</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">Connect</h3>
            <div className="mt-5 space-y-3 text-slate-600">
              <p className="flex items-center gap-2"><Mail size={16} /> {CONTACT_EMAIL}</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +255616435291</p>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a href="https://facebook.com/rmcodelab" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500"><Facebook size={18} /></a>
              <a href="https://instagram.com/rmcodelab" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"><Instagram size={18} /></a>
              <a href="https://tiktok.com/@rmcodelab" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800"><Music2 size={18} /></a>
              <a href="https://youtube.com/@rmcodelab" target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500"><Youtube size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">News</h3>
            <div className="mt-5 space-y-3 text-slate-600">
              {getVideoLibrary().slice(0, 3).map((video) => (
                <div key={video.id} className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="font-semibold text-slate-900">{video.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{video.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-blue-200 bg-gradient-to-r from-blue-600 to-amber-500 py-3 text-white shadow-2xl">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block min-w-full animate-marquee px-6 font-semibold">
            {bannerText || 'Learn with confidence. Build your future with RMCodeLab Academy.'} • {bannerText || 'Learn with confidence. Build your future with RMCodeLab Academy.'} • {bannerText || 'Learn with confidence. Build your future with RMCodeLab Academy.'}
          </div>
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setShowContactModal(false)}>
          <div className="w-full max-w-lg rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">Send Feedback</h3>
              <button type="button" onClick={() => setShowContactModal(false)} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600">Close</button>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Your name</label>
                <input value={contactForm.name} onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })} required className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Feedback</label>
                <textarea value={contactForm.feedback} onChange={(event) => setContactForm({ ...contactForm, feedback: event.target.value })} required rows={5} className="w-full resize-none rounded-2xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Tell us what you think..." />
              </div>
              <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-amber-500 px-4 py-3 font-bold text-white">Submit Feedback</button>
            </form>
          </div>
        </div>
      )}

      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setShowPrivacy(false)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">Privacy Policy</h3>
              <button type="button" onClick={() => setShowPrivacy(false)} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600">Close</button>
            </div>
            <div className="space-y-4 text-sm leading-7 text-slate-600">
              <p>RMCodeLab Academy respects your privacy. We collect only the information needed to provide access to courses, manage user accounts, and improve the learning experience.</p>
              <p>Your personal information, including your email address and password for your account, is kept secure and is used only for authentication and account recovery purposes. We do not sell or trade your information to third parties.</p>
              <p>We may store limited analytics and usage information to understand how learners use the platform, improve content quality, and troubleshoot performance issues.</p>
              <p>When you access videos and course resources, we may use cookies or browser storage to remember your selected level, account session, and learning progress so the experience remains smooth and personalized.</p>
              <p>By continuing to use RMCodeLab Academy, you agree that your information may be processed in line with this privacy policy.</p>
            </div>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setShowTerms(false)}>
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">Terms and Conditions</h3>
              <button type="button" onClick={() => setShowTerms(false)} className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600">Close</button>
            </div>
            <div className="space-y-4 text-sm leading-7 text-slate-600">
              <p>Welcome to RMCodeLab Academy. These terms govern your access to and use of the platform, including video lessons, course materials, announcements, and associated learning resources.</p>
              <p>You agree to use the website only for lawful educational purposes. You must not copy, reuse, redistribute, or republish course content without written permission from the platform owners.</p>
              <p>Account access is provided to learners who register and maintain valid login information. You are responsible for keeping your email and password secure and for all activities that occur under your account.</p>
              <p>RMCodeLab Academy may update course content, improve learning tools, and change access rules over time. We reserve the right to remove or modify content when necessary for quality, legal, or operational reasons.</p>
              <p>All course offerings and educational materials are provided "as is" for learning purposes. We do not guarantee any specific income, employment outcome, or professional result from using the platform.</p>
              <p>By using this website, you agree that the platform is intended for educational support and practice, and you will not misuse, abuse, or attempt to interfere with the integrity of its system.</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
