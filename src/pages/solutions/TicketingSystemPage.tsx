import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, Ticket, Bus, CalendarDays } from 'lucide-react';
import { Header } from '../public/header';

const blocks = [
  {
    title: 'Fast seat reservation',
    description: 'Allow passengers to reserve seats quickly with a clean booking journey built for conversion.',
    icon: Ticket,
  },
  {
    title: 'Flexible trip options',
    description: 'Support multiple routes, departures, and ticket types in a way that stays easy to understand.',
    icon: CalendarDays,
  },
  {
    title: 'Payment readiness',
    description: 'Make the checkout experience feel secure, modern, and compatible with local payment rails.',
    icon: CreditCard,
  },
];

const TicketingSystemPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="inline-flex rounded-full bg-[#F4A261]/15 px-4 py-2 text-sm font-semibold text-[#C26D1F]">
              Ticketing System
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Ticketing that feels fast, calm, and trustworthy.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix ticketing gives riders a simple way to choose seats, confirm trips, and complete secure checkout.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#F4A261] to-[#E76F51] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Built for clean conversion</p>
                  <p className="text-sm text-white/85">Move users from search to booking smoothly.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
              {blocks.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4A261]/10 text-[#C26D1F]">
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A261]">Section 1</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Seat selection</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Let riders choose preferred seats with confidence and minimal friction.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A261]">Section 2</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Checkout flow</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Keep payment and confirmation steps short, clear, and reassuring.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F4A261]">Section 3</p>
            <h3 className="mt-3 text-xl font-bold text-slate-900">Revenue-ready design</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The booking system is built to support reliable sales and smoother operations.
            </p>
          </div>
        </section>

        <div className="mt-14 flex justify-start">
          <Link
            to="/solutions/company-dashboard"
            className="inline-flex items-center gap-2 rounded-full bg-[#F4A261] px-6 py-3 text-sm font-semibold text-[#2B2D42] transition hover:-translate-y-0.5 hover:bg-[#e8914e]"
          >
            See company dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TicketingSystemPage;
