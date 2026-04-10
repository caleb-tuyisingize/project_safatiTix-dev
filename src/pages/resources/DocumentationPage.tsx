import React from 'react';
import { BookOpen, LayoutTemplate, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../public/header';

const sections = [
  {
    title: 'Start with the core guides',
    description:
      'Get a clean overview of how SafariTix works, what each product area does, and the fastest way to launch a bus travel workflow.',
    icon: BookOpen,
  },
  {
    title: 'Follow step-by-step setup',
    description:
      'Use practical walkthroughs to connect routes, configure bookings, and shape your operations without unnecessary guesswork.',
    icon: LayoutTemplate,
  },
  {
    title: 'Scale with confidence',
    description:
      'Reference implementation details, best practices, and product tips that help your team move faster as you grow.',
    icon: Sparkles,
  },
];

const DocumentationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 ring-1 ring-cyan-100">
              Resources / Documentation
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Documentation built for fast teams and confident launches.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix documentation gives your team a clear path from first setup to a fully working travel experience.
            </p>

            <Link
              to="/resources/help-center"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
            >
              Open Help Center
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-cyan-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-sky-700 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Documentation hub
              </p>
              <h2 className="mt-3 text-2xl font-bold">Everything in one place</h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Organized guidance, concise explanations, and a smoother path to implementation.
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
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
            <h2 className="text-lg font-bold text-slate-900">Readable by design</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Content is split into practical modules so new team members can find answers quickly.
            </p>
          </div>
          <div className="rounded-3xl bg-cyan-600 p-6 text-white shadow-lg shadow-cyan-600/15">
            <h2 className="text-lg font-bold">Useful for operations</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              Documentation stays focused on the real workflows your bus business needs every day.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Built to scale</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Start simple, then expand with clear references as your rollout grows.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocumentationPage;
