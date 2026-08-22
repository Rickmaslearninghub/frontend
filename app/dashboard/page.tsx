const stats = [
  { label: 'Courses Enrolled', value: '24' },
  { label: 'Completed', value: '12' },
  { label: 'Certificates', value: '7' },
  { label: 'Hours Learned', value: '148' }
];

const courses = [
  { title: 'AI Fundamentals', level: 'Beginner', progress: 78 },
  { title: 'React Mastery', level: 'Intermediate', progress: 54 },
  { title: 'Business Automation', level: 'Professional', progress: 32 }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-sky-900/50 to-amber-900/40 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Student dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold">Welcome back, learner.</h1>
          <p className="mt-3 max-w-2xl text-slate-300">Continue your journey with trending courses, progress tracking, and a modern learning experience.</p>
        </div>

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
              {courses.map((course) => (
                <div key={course.title} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{course.title}</p>
                      <p className="text-sm text-slate-400">{course.level}</p>
                    </div>
                    <span className="text-sm text-sky-400">{course.progress}%</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-amber-500" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold">Latest News</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">New AI Business Systems course</p>
                <p className="mt-2">Fresh modules on automation, workflows, and AI-driven operations are now live.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="font-semibold text-white">Live community Q&A</p>
                <p className="mt-2">Join the weekly live session with instructors and industry mentors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
