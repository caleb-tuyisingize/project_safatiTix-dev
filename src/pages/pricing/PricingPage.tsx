import React from 'react';
import { BusFront, Building2, BadgeDollarSign, Route, WalletCards, ChartColumnIncreasing } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../public/header';

const commuterSteps = [
  {
    title: '1. RURA sets the fare standard',
    text: 'Public transport pricing follows the fare framework set by RURA, so ticket prices stay aligned with regulated route standards.',
    icon: BadgeDollarSign,
  },
  {
    title: '2. Routes are priced by segment',
    text: 'Each route and each route segment can have a fixed price, which helps commuters understand the cost before they travel.',
    icon: Route,
  },
  {
    title: '3. View price before booking',
    text: 'SafariTix shows the fare upfront before checkout, so passengers can compare options and confirm the trip with confidence.',
    icon: BusFront,
  },
];

const commuterTips = [
  'Longer routes usually cost more, so shorter direct trips can be the cheapest option.',
  'If your journey includes a transfer, compare the total route price before booking both legs.',
  'Check the booking screen for the final fare, then choose the route that matches your budget and schedule.',
];

const companySteps = [
  {
    title: '1. Subscription-based access',
    text: 'Transport companies pay a fixed monthly subscription fee to use the platform and manage their ticket operations digitally.',
    icon: WalletCards,
  },
  {
    title: '2. Ticket revenue follows RURA standards',
    text: 'Ticket pricing follows the regulated fare structure, while the platform helps companies organize and track that revenue clearly.',
    icon: Building2,
  },
  {
    title: '3. Track earnings and optimize routes',
    text: 'Route dashboards make it easier to review earnings, spot high-demand trips, and improve route allocation over time.',
    icon: ChartColumnIncreasing,
  },
];

const companyTips = [
  'Use route reports to spot underperforming trips and adjust dispatch planning.',
  'Keep subscription costs predictable while ticket revenue scales with route demand.',
  'Monitor route allocation to make sure each vehicle is assigned to the right flow.',
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-[#0077B6] ring-1 ring-sky-100">
            SafariTix Pricing
          </div>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Pricing
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            A clear look at how ticket fares work for commuters and how transport companies use SafariTix as a subscription platform.
          </p>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-sky-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-[#0077B6] ring-1 ring-sky-100">
                <BusFront className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0077B6]">
                  For Commuters
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">How ticket prices are determined</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {commuterSteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-[#0077B6] ring-1 ring-sky-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-[#0077B6]/5 p-5 ring-1 ring-[#0077B6]/10">
              <h3 className="text-base font-semibold text-slate-900">Tips for cheaper travel</h3>
              <div className="mt-4 grid gap-3">
                {commuterTips.map((tip) => (
                  <div key={tip} className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#F4A261] ring-1 ring-orange-100">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F4A261]">
                  For Transport Companies
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">Subscription model and revenue view</h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {companySteps.map((step) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#F4A261] ring-1 ring-orange-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl bg-[#F4A261]/10 p-5 ring-1 ring-[#F4A261]/15">
              <h3 className="text-base font-semibold text-slate-900">Tips for companies</h3>
              <div className="mt-4 grid gap-3">
                {companyTips.map((tip) => (
                  <div key={tip} className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Transparent for riders</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Riders can see the fare before booking, which keeps the experience clear and trustworthy.
            </p>
          </div>
          <div className="rounded-3xl bg-[#27AE60] p-6 text-white shadow-lg shadow-emerald-600/15">
            <h2 className="text-lg font-bold">Efficient for operators</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              Companies can combine subscription pricing with route insights to manage growth more smoothly.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Simple to explain</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The pricing structure is presented in clear steps so users and businesses can follow it quickly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PricingPage;
