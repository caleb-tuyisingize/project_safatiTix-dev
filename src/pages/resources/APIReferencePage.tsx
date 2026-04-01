import React from 'react';
import { Code2, Braces, KeyRound, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../public/header';

const sections = [
  {
    title: 'Endpoint overview',
    description:
      'See the core API areas in a simple structure that helps developers and partners move quickly.',
    icon: Code2,
  },
  {
    title: 'Authentication guidance',
    description:
      'Understand how to use keys, tokens, and secure access patterns for reliable integration.',
    icon: KeyRound,
  },
  {
    title: 'Payload and response details',
    description:
      'Review request and response shapes so your implementation stays consistent and easy to maintain.',
    icon: Braces,
  },
];

const APIReferencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 ring-1 ring-rose-100">
              Resources / API Reference
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              API reference made for clean integrations and confident builds.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix API reference keeps technical teams aligned with a simple, structured, and secure developer experience.
            </p>

            <Link
              to="/resources/documentation"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700"
            >
              Back to Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-rose-600 to-pink-600 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Developer reference
              </p>
              <h2 className="mt-3 text-2xl font-bold">Technical clarity first</h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Clean reference blocks help your team build without second-guessing the structure.
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-700 ring-1 ring-rose-100">
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
            <h2 className="text-lg font-bold text-slate-900">Developer-friendly</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              The layout stays readable for both engineering and product teams.
            </p>
          </div>
          <div className="rounded-3xl bg-rose-600 p-6 text-white shadow-lg shadow-rose-600/15">
            <h2 className="text-lg font-bold">Security-aware</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              Authentication and payload guidance are presented with a trust-first tone.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Easy to extend</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A structured API reference makes future endpoints easier to add cleanly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default APIReferencePage;
