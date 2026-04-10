import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Repeat, CalendarRange, WalletCards } from 'lucide-react';
import { Header } from '../public/header';

const blocks = [
  {
    title: 'Plan management',
    description: 'Organize subscriptions with clear control over access, renewals, and service levels.',
    icon: BadgeCheck,
  },
  {
    title: 'Automated renewals',
    description: 'Reduce manual follow-up with renewal experiences that feel smooth and predictable.',
    icon: Repeat,
  },
  {
    title: 'Flexible durations',
    description: 'Offer weekly, monthly, or custom plan structures depending on the business need.',
    icon: CalendarRange,
  },
];

const SubscriptionManagementPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-[#27AE60]/10 px-4 py-2 text-sm font-semibold text-[#1F8A4C]">
              Subscription Management
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Subscription tools that make recurring travel feel effortless.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix helps operators structure plans, manage renewals, and keep recurring commuter travel easy to run.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#27AE60] to-[#1F8A4C] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <WalletCards className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Built for recurring value</p>
                  <p className="text-sm text-white/85">Simple subscriptions for modern transport.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {blocks.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#27AE60]/10 text-[#1F8A4C]">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#27AE60]">Section 1</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Recurring access</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Structure plans that support regular travel with a simple, understandable system.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#27AE60]">Section 2</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Renewal flow</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Make subscription renewal feel polished and effortless for passengers and admins.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#27AE60]">Section 3</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Commercial growth</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Turn repeat commuters into a more predictable revenue stream for your company.
            </p>
          </div>
        </section>

        <div className="mt-14 flex justify-start">
          <Link
            to="/solutions/driver-app"
            className="inline-flex items-center gap-2 rounded-full bg-[#27AE60] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1f8a4c]"
          >
            See the driver app
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionManagementPage;
