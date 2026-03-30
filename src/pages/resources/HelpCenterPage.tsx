import React from 'react';
import { LifeBuoy, MessageCircleMore, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../public/header';

const sections = [
  {
    title: 'Get answers fast',
    description:
      'Find the most common questions in a clear support layout designed to reduce friction and waiting time.',
    icon: MessageCircleMore,
  },
  {
    title: 'Support with confidence',
    description:
      'Use helpful guidance for booking issues, route questions, and account assistance without hunting through clutter.',
    icon: LifeBuoy,
  },
  {
    title: 'Safe and reliable help',
    description:
      'Trust clear steps and support notes that keep your account, tickets, and travel plans protected.',
    icon: ShieldCheck,
  },
];

const HelpCenterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-blue-100">
              Resources / Help Center
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Support that feels clear, friendly, and easy to trust.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix Help Center gives passengers, drivers, and companies a calm path to solutions.
            </p>

            <Link
              to="/resources/api-reference"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              View API Reference
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-700 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Support center
              </p>
              <h2 className="mt-3 text-2xl font-bold">Help without the hassle</h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Simple support blocks that make it easier to resolve issues and move on.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {sections.map((section) => {
                const Icon = section.icon;

                return (
                  <article
                    key={section.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{section.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{section.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Clear guidance</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Users can jump straight into the support area they actually need.
            </p>
          </div>
          <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg shadow-blue-600/15">
            <h2 className="text-lg font-bold">Responsive support</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              The layout works smoothly across desktop and mobile support journeys.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Trust-first tone</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The copy stays calm, practical, and reassuring for every type of user.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenterPage;
