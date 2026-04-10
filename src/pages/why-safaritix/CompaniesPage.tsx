import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, TrendingUp, Users, CreditCard } from 'lucide-react';
import { Header } from '../public/header';

const benefits = [
  {
    title: 'Digital operations',
    description: 'Run bookings, schedules, and check-ins through one streamlined dashboard.',
    icon: Calendar,
  },
  {
    title: 'Revenue snapshot',
    description: 'See performance, occupancy, and sales patterns in a clear operational view.',
    icon: TrendingUp,
  },
  {
    title: 'Customer insights',
    description: 'Understand passenger demand, route behavior, and booking trends faster.',
    icon: Users,
  },
  {
    title: 'Subscription model',
    description: 'Adopt a modern platform approach that scales with your business.',
    icon: CreditCard,
  },
];

const CompaniesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-[#F4A261]/15 px-4 py-2 text-sm font-semibold text-[#D97706]">
              For Transport Companies
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Move your fleet with cleaner operations and better business insight.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix gives transport companies a modern digital layer for managing bookings, revenue, and customer demand in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-6 py-3 text-sm font-semibold text-[#2B2D42] shadow-lg shadow-[#F4A261]/20 transition hover:-translate-y-0.5 hover:bg-[#e8914e]"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/why-safaritix/drivers"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                For Drivers
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#F4A261] to-[#E76F51] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                Operator benefits
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Designed for growth</p>
                  <p className="text-sm text-white/85">Revenue clarity and smarter operations.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4A261]/10 text-[#D97706]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">{benefit.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
              <h2 className="text-xl font-bold text-slate-900">What companies gain</h2>
              <ul className="mt-5 space-y-3 text-slate-600">
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#F4A261]" />Digital operations that reduce manual work.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#F4A261]" />Revenue snapshots that make reporting easier.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#F4A261]" />Customer insights that support smarter route planning.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#F4A261]" />Subscription model options that scale with growth.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-[#F4A261] p-6 text-[#2B2D42] shadow-lg shadow-[#F4A261]/15">
              <h2 className="text-xl font-bold">Build a stronger transport business</h2>
              <p className="mt-3 text-sm leading-7 text-[#2B2D42]/85">
                SafariTix helps operators modernize their workflows while keeping the passenger experience premium and reliable.
              </p>
              <Link
                to="/app/signup"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2B2D42] transition hover:bg-slate-100"
              >
                Start your operator journey
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompaniesPage;
