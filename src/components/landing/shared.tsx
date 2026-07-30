import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Check, type LucideIcon } from "lucide-react";

/* =========================
   Container
========================= */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

/* =========================
   Reveal Animation
========================= */

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
}

/* =========================
   Global Styles
========================= */

export function LandingStyles() {
  return (
    <style>{`
      .st-font-display{
        font-family: Inter,sans-serif;
      }

      .st-font-body{
        font-family: Inter,sans-serif;
      }

      .st-font-mono{
        font-family: ui-monospace,SFMono-Regular,monospace;
      }

      .st-live-dot{
        animation:pulse 1.5s infinite;
      }

      @keyframes pulse{
        0%{opacity:1;}
        50%{opacity:.25;}
        100%{opacity:1;}
      }
    `}</style>
  );
}

/* =========================
   Heading
========================= */

export function Eyebrow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="inline-flex rounded-full bg-sky-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-14 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <h2 className="mt-5 text-4xl font-bold text-slate-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* =========================
   Decorative Blob
========================= */

export function GradientBlob({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] ${className}`}
    />
  );
}

/* =========================
   Glass Panel
========================= */

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================
   Feature Card
========================= */

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  const Icon = icon;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
        <Icon size={24} />
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/* =========================
   Stat Block
========================= */

export function StatBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-4xl font-bold text-white">
        {value}
      </div>

      <div className="mt-2 text-white/60">
        {label}
      </div>
    </div>
  );
}

/* =========================
   Pricing Card
========================= */

export function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-8 ${
        highlighted
          ? "border-sky-600 bg-sky-600 text-white shadow-2xl"
          : "border-slate-200 bg-white"
      }`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>

      <div className="mt-6 text-5xl font-bold">
        {price}
      </div>

      <p className="mt-3 opacity-80">
        {description}
      </p>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3"
          >
            <Check size={18} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full rounded-xl py-3 font-semibold ${
          highlighted
            ? "bg-white text-sky-700"
            : "bg-sky-600 text-white"
        }`}
      >
        Get Started
      </button>
    </div>
  );
}/* =========================
   FAQ Item
========================= */

export function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-slate-900">
          {question}
        </span>

        <span className="text-2xl font-light text-slate-500">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <p className="mt-4 leading-7 text-slate-600">
          {answer}
        </p>
      )}
    </div>
  );
}

/* =========================
   Testimonial Card
========================= */

export function TestimonialCard({
  quote,
  name,
  role,
  initials,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="text-lg leading-8 text-slate-700">
        "{quote}"
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-600 font-semibold text-white">
          {initials}
        </div>

        <div>
          <div className="font-semibold text-slate-900">
            {name}
          </div>

          <div className="text-sm text-slate-500">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}
