import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, LineChart, Users2, ShieldCheck } from 'lucide-react';
import { Header } from '../public/header';

const blocks = [
  {
    title: 'Performance view',
    description: 'See high-level business metrics in a dashboard designed for clear decision-making.',
    icon: LineChart,
  },
  {
    title: 'Customer intelligence',
    description: 'Understand who is booking, where demand is rising, and which routes need attention.',
    icon: Users2,
  },
  {
    title: 'Secure administration',
    description: 'Manage company actions and records in a reliable interface built for operations teams.',
    icon: ShieldCheck,
  },
];

const CompanyDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-[#E63946]/10 px-4 py-2 text-sm font-semibold text-[#C02B39]">
              Company Dashboard
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A dashboard that turns daily transport data into clear business decisions.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix company dashboards help operators understand performance, demand, and growth opportunities without the clutter.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#E63946] to-[#C92B39] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <LayoutDashboard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Made for modern operators</p>
                  <p className="text-sm text-white/85">Clear, structured, and leadership-ready.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {blocks.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E63946]/10 text-[#C02B39]">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E63946]">Section 1</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Business performance</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Turn route and booking data into a clear view of business health.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E63946]">Section 2</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Demand intelligence</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Identify where passengers are booking and where growth potential is strongest.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E63946]">Section 3</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Leadership-ready insights</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A polished admin experience helps teams make decisions with confidence.
            </p>
          </div>
        </section>

        <div className="mt-14 flex justify-start">
          <Link
            to="/solutions/bus-tracking"
            className="inline-flex items-center gap-2 rounded-full bg-[#E63946] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c92b39]"
          >
            See bus tracking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboardPage;
