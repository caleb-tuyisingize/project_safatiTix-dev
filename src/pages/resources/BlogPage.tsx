import React from 'react';
import { Newspaper, PenSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../public/header';

const sections = [
  {
    title: 'Product stories that matter',
    description:
      'Read updates about product decisions, market lessons, and how modern transport technology is shaping better trips in Rwanda.',
    icon: Newspaper,
  },
  {
    title: 'Operational insights',
    description:
      'Explore practical ideas for bus companies, drivers, and commuter-facing teams looking to improve service quality.',
    icon: PenSquare,
  },
  {
    title: 'Growth and adoption',
    description:
      'See how data, subscriptions, and digital booking patterns can help your transport business move forward with confidence.',
    icon: TrendingUp,
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 ring-1 ring-orange-100">
              Resources / Blog
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              A smarter bus-tech blog for operators, riders, and builders.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              SafariTix blog content keeps the team informed with useful stories, product updates, and growth ideas.
            </p>

            <Link
              to="/resources/documentation"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
            >
              Read Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/75">
                Latest insights
              </p>
              <h2 className="mt-3 text-2xl font-bold">Fresh, useful, and grounded</h2>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Written to help your team stay sharp on product, transport, and customer experience.
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
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
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
            <h2 className="text-lg font-bold text-slate-900">Editorial and practical</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We keep the content useful for teams that need real operational value.
            </p>
          </div>
          <div className="rounded-3xl bg-orange-500 p-6 text-white shadow-lg shadow-orange-500/15">
            <h2 className="text-lg font-bold">Built around growth</h2>
            <p className="mt-3 text-sm leading-7 text-white/90">
              Articles can support marketing, product adoption, and trust-building at the same time.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70">
            <h2 className="text-lg font-bold text-slate-900">Easy to scan</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Clean blocks make it simple for visitors to find the right story quickly.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
