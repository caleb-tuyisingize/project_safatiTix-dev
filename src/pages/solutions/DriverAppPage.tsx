import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Route, RadioTower, ShieldAlert } from 'lucide-react';
import { Header } from '../public/header';

const blocks = [
  {
    title: 'Route access',
    description: "Give drivers a clean screen that highlights the day's assigned journey and route details.",
    icon: Route,
  },
  {
    title: 'Live operational updates',
    description: 'Keep drivers informed with trip changes and timing updates as they happen.',
    icon: RadioTower,
  },
  {
    title: 'Support-first design',
    description: 'Place the essential information and safety cues exactly where the driver expects them.',
    icon: ShieldAlert,
  },
];

const DriverAppPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
              Driver App
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A focused driver experience with less noise and more clarity.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix driver tools are designed to keep the on-road experience calm, efficient, and easy to follow.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-6 text-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-slate-700">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Minimal, readable, practical</p>
                  <p className="text-sm text-slate-600">Everything drivers need in one glance.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {blocks.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Section 1</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Readable on the road</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Present trip details in a simple layout that stays understandable at speed.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Section 2</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Operational flow</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Reduce friction between trip schedules, dispatch updates, and route execution.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Section 3</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Safer support</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Give drivers support cues that feel dependable and easy to access.
            </p>
          </div>
        </section>

        <div className="mt-14 flex justify-start">
          <Link
            to="/solutions/company-dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            See company dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DriverAppPage;
