import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bus, CreditCard, MapPin, Ticket } from 'lucide-react';
import { Header } from '../public/header';

const benefits = [
  {
    title: 'Ease of booking',
    description: 'Book in a few taps with a clean, fast flow designed for commuters on the move.',
    icon: Ticket,
  },
  {
    title: 'Real-time tracking',
    description: 'Follow your bus live, see accurate location updates, and avoid waiting in the dark.',
    icon: MapPin,
  },
  {
    title: 'Flexible tickets',
    description: 'Manage trips more easily with simple booking details and flexible travel options.',
    icon: Bus,
  },
  {
    title: 'Safe & cashless',
    description: 'Pay securely with mobile money or card for a smooth, modern travel experience.',
    icon: CreditCard,
  },
];

const CommutersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-[#0077B6]/10 px-4 py-2 text-sm font-semibold text-[#0077B6]">
              For Commuters
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Travel smarter with a bus platform built for everyday riders.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix helps commuters book faster, track buses in real time, and pay safely without the stress of queues or cash handling.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#0077B6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0077B6]/20 transition hover:-translate-y-0.5 hover:bg-[#005f8e]"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/why-safaritix/companies"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                For Companies
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#0077B6] to-[#0A6FA5] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                Passenger benefits
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Built for smooth commutes</p>
                  <p className="text-sm text-white/85">Fast, clear, and reliable every day.</p>
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0077B6]/10 text-[#0077B6]">
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
              <h2 className="text-xl font-bold text-slate-900">Why commuters love SafariTix</h2>
              <ul className="mt-5 space-y-3 text-slate-600">
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#0077B6]" />Book from anywhere, anytime.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#0077B6]" />Track live bus locations with confidence.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#0077B6]" />Save time with flexible trip management.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#0077B6]" />Pay safely using cashless methods.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-[#0077B6] p-6 text-white shadow-lg shadow-[#0077B6]/15">
              <h2 className="text-xl font-bold">Ready to ride smarter?</h2>
              <p className="mt-3 text-sm leading-7 text-white/90">
                Join the passengers choosing a faster, cleaner travel experience across Rwanda.
              </p>
              <Link
                to="/app/signup"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0077B6] transition hover:bg-slate-100"
              >
                Create your account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CommutersPage;
