import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bus, Clock, MapPin, ShieldCheck } from 'lucide-react';
import { Header } from '../public/header';

const benefits = [
  {
    title: 'Easy route access',
    description: 'See your assigned routes and trip details in a clean, driver-friendly format.',
    icon: Bus,
  },
  {
    title: 'Live updates',
    description: 'Receive schedule and tracking updates as they happen while you are on the road.',
    icon: MapPin,
  },
  {
    title: 'Better efficiency',
    description: 'Reduce confusion, save time, and stay aligned with dispatch and operations.',
    icon: Clock,
  },
  {
    title: 'Support system',
    description: 'Get access to a platform that helps you stay informed and supported every trip.',
    icon: ShieldCheck,
  },
];

const DriversPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-[#27AE60]/10 px-4 py-2 text-sm font-semibold text-[#1F8A4C]">
              For Drivers
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Give drivers the clarity they need to stay on time and in control.
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix keeps driver workflows simple with live trip information, route access, and a dependable support layer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app/login"
                className="inline-flex items-center gap-2 rounded-full bg-[#27AE60] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#27AE60]/20 transition hover:-translate-y-0.5 hover:bg-[#1f8a4c]"
              >
                Driver Login
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/why-safaritix/commuters"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                For Commuters
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-[#27AE60] to-[#1F8A4C] p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                Driver experience
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-lg font-bold">Built for the road</p>
                  <p className="text-sm text-white/85">Fast access, live updates, less friction.</p>
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
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#27AE60]/10 text-[#1F8A4C]">
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
              <h2 className="text-xl font-bold text-slate-900">Why drivers benefit</h2>
              <ul className="mt-5 space-y-3 text-slate-600">
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#27AE60]" />Easy access to route and trip details.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#27AE60]" />Live updates that keep everyone aligned.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#27AE60]" />Better efficiency with less operational confusion.</li>
                <li className="flex gap-3"><span className="mt-2 h-2 w-2 rounded-full bg-[#27AE60]" />Support tools that help every trip run smoothly.</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-[#27AE60] p-6 text-white shadow-lg shadow-[#27AE60]/15">
              <h2 className="text-xl font-bold">Keep every journey moving</h2>
              <p className="mt-3 text-sm leading-7 text-white/90">
                SafariTix helps drivers work with more confidence, better coordination, and less stress.
              </p>
              <Link
                to="/app/login"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1F8A4C] transition hover:bg-slate-100"
              >
                Open driver portal
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DriversPage;
