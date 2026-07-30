import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Ticket,
  MapPin,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Shield,
  Smartphone,
  Bus,
  QrCode,
  Radio,
  BarChart3,
  Route as RouteIcon,
  Bell,
  Wallet,
  UserCog,
  FileText,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Navigation,
  Gauge,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  PlayCircle,
} from "lucide-react";

// NOTE: adjust this import to match where your existing Header component lives.
import { Header } from "./header";
import {
  Container,
  Reveal,
  LandingStyles,
  SectionHeading,
  Eyebrow,
  GradientBlob,
  GlassPanel,
  FeatureCard,
  StatBlock,
  PricingCard,
  FaqItem,
  TestimonialCard,
} from "../../components/landing/shared";

import { RouteTicker } from "../../components/landing/RouteTicker";

interface LandingPageProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

export function LandingPage({ onLoginClick, onSignupClick }: LandingPageProps) {
  const navigate = useNavigate();
  const [audience, setAudience] = useState<"passengers" | "companies">(
    "passengers",
  );

  const handleLoginClick = () =>
    onLoginClick ? onLoginClick() : navigate("/app/login");
  const handleSignupClick = () =>
    onSignupClick ? onSignupClick() : navigate("/app/signup");

  const features = [
    {
      icon: Ticket,
      title: "Online ticket booking",
      description:
        "Search every route on one map and confirm a seat in under a minute, on web or mobile.",
    },
    {
      icon: Radio,
      title: "Live GPS bus tracking",
      description:
        "Passengers watch their bus move in real time — no more guessing or standing at the wrong stage.",
    },
    {
      icon: QrCode,
      title: "QR code e-tickets",
      description:
        "Boarding is a scan, not a queue. Every ticket is verifiable and impossible to duplicate.",
    },
    {
      icon: Users,
      title: "Seat selection",
      description:
        "A live seat map shows exactly what is free, so nobody boards to find their seat taken.",
    },
    {
      icon: Bus,
      title: "Fleet management",
      description:
        "Track every vehicle, its maintenance schedule, and its assigned crew from one screen.",
    },
    {
      icon: RouteIcon,
      title: "Route management",
      description:
        "Build routes, stops, and fare tables once — reuse them across every schedule you run.",
    },
    {
      icon: Smartphone,
      title: "Driver mobile app",
      description:
        "Drivers start trips, share location, and update status without a second device.",
    },
    {
      icon: Bell,
      title: "Real-time notifications",
      description:
        "Delays, gate changes, and boarding calls reach passengers before they have to ask.",
    },
    {
      icon: BarChart3,
      title: "Revenue analytics",
      description:
        "Occupancy, revenue per route, and peak-hour demand, updated as trips happen.",
    },
    {
      icon: Wallet,
      title: "Payment integration",
      description:
        "Mobile money and card payments settle straight to operator accounts, automatically reconciled.",
    },
    {
      icon: UserCog,
      title: "Role-based access",
      description:
        "Dispatchers, finance, and drivers each see exactly what their job requires — nothing more.",
    },
    {
      icon: FileText,
      title: "Reports & insights",
      description:
        "Export finance-ready reports for owners, investors, or regulators in a click.",
    },
  ];
  const whyRows = [
    {
      icon: Gauge,
      title: "Less manual work",
      description:
        "Manifests, seat charts, and settlements generate themselves instead of living in a notebook.",
    },
    {
      icon: TrendingUp,
      title: "More seats filled",
      description:
        "Operators on SafariTix see bookings rise as passengers discover routes they run.",
    },
    {
      icon: ShieldCheck,
      title: "Less fraud",
      description:
        "Every ticket is a unique, scannable record — duplicate and forged tickets stop working.",
    },
    {
      icon: Sparkles,
      title: "Happier passengers",
      description:
        "Live ETAs and digital tickets replace uncertainty with a trip people can plan around.",
    },
    {
      icon: Radio,
      title: "Real-time oversight",
      description:
        "Know where every bus is, right now, instead of calling drivers for updates.",
    },
    {
      icon: BarChart3,
      title: "Sharper decisions",
      description:
        "See which routes, hours, and buses actually make money — and adjust with evidence.",
    },
  ];

  const journeySteps = [
    {
      title: "Search",
      description:
        "Enter a route and date; every operator running it appears side by side.",
    },
    {
      title: "Choose operator",
      description: "Compare price, departure time, and bus class in one list.",
    },
    {
      title: "Select seat",
      description: "Pick a seat from a live map — window, aisle, or front row.",
    },
    {
      title: "Pay online",
      description: "Mobile money or card, confirmed instantly.",
    },
    {
      title: "Receive ticket",
      description:
        "A QR e-ticket lands in the app immediately — no printing required.",
    },
    {
      title: "Track bus",
      description: "Watch the bus approach the stage with a live ETA.",
    },
    {
      title: "Travel",
      description: "Board with a scan and go — the whole trip is on record.",
    },
  ];

  const driverSteps = [
    {
      title: "Start trip",
      description: "One tap opens the manifest and begins the journey log.",
    },
    {
      title: "Share GPS",
      description:
        "Location streams to dispatch and to booked passengers automatically.",
    },
    {
      title: "Update status",
      description:
        "Mark boarding, departed, or delayed so the board stays accurate.",
    },
    {
      title: "Navigate route",
      description:
        "Turn-by-turn guidance follows the assigned route and stops.",
    },
    {
      title: "Finish trip",
      description:
        "Close out the manifest; revenue and mileage log themselves.",
    },
  ];

  const testimonials = [
    {
      name: "Amina Wanjiru",
      role: "Daily commuter, Nairobi",
      initials: "AW",
      quote:
        "I book from my desk and watch the bus arrive on the map. I have not stood at a stage guessing in months.",
    },
    {
      name: "Denis Mugisha",
      role: "Operations lead, Nyati Coach",
      initials: "DM",
      quote:
        "Occupancy on our Kigali–Kampala route is up since passengers can find and book us directly.",
    },
    {
      name: "Furaha Massawe",
      role: "Fleet manager, Baraka Line",
      initials: "FM",
      quote:
        "Settlements used to take a day of reconciling notebooks. Now the dashboard has it before the bus even arrives.",
    },
  ];

  const faqs = [
    {
      q: "Does SafariTix work with operators who already have their own booking process?",
      a: "Yes. Routes, fares, and schedules can be imported, and SafariTix runs alongside existing station operations while your team transitions at its own pace.",
    },
    {
      q: "What payment methods are supported?",
      a: "Mobile money (M-Pesa, MTN, Airtel Money), Visa and Mastercard, and bank settlement for operators — all reconciled automatically in the dashboard.",
    },
    {
      q: "How does live tracking work without extra hardware?",
      a: "The driver app streams GPS location from the driver\u2019s existing smartphone. No separate tracking unit is required to get started.",
    },
    {
      q: "Can government or regulatory agencies get reporting access?",
      a: "Enterprise plans include a read-only reporting seat so regulators can view compliance and safety data without touching operational tools.",
    },
    {
      q: "Is there a contract, or can we cancel anytime?",
      a: "Starter and Growth are month to month. Enterprise is an annual agreement with a dedicated rollout plan.",
    },
  ];

  return (
    <div className="st-font-body bg-white">
      <LandingStyles />
      <Header
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#071827] pb-16 pt-20 sm:pt-28">
        <GradientBlob className="left-[-10%] top-[-10%] h-[420px] w-[420px] bg-[#0077B6]/30" />
        <GradientBlob className="right-[-14%] top-[20%] h-[380px] w-[380px] bg-[#005F8E]/25" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Eyebrow>Bus transport, run digitally</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="st-font-display mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[3.4rem]">
                  The operating system for
                  <span className="bg-gradient-to-r from-[#7CC3E8] to-white bg-clip-text text-transparent">
                    {" "}
                    East Africa's bus networks
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-[1.125rem] leading-relaxed text-white/70">
                  One platform for booking, fleet management, and live tracking
                  — so passengers travel with confidence and operators run every
                  route, driver, and shilling from a single dashboard.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleSignupClick}
                    className="group flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[0.9375rem] font-semibold text-[#0B1220] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Start free
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </button>
                  <button className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-white/10">
                    <PlayCircle size={18} />
                    Watch demo
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Hero visual: stacked product mockups */}
            <Reveal delay={120} className="relative">
              <div className="relative mx-auto h-[420px] max-w-[440px] sm:h-[460px]">
                {/* Dashboard card */}
                <GlassPanel className="absolute left-0 top-0 w-[86%] p-5">
                  <div className="flex items-center justify-between">
                    <span className="st-font-mono text-[0.6875rem] uppercase tracking-wider text-white/50">
                      Operator dashboard
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full bg-[#16A34A]/15 px-2.5 py-1 text-[0.6875rem] font-medium text-[#16A34A]">
                      <span className="st-live-dot h-1.5 w-1.5 rounded-full bg-[#16A34A]" />{" "}
                      Live
                    </span>
                  </div>
                  <div className="mt-4 st-font-mono text-[1.6rem] font-semibold text-white">
                    KES 4.82M
                  </div>
                  <div className="text-[0.75rem] text-white/50">
                    Revenue — today
                  </div>
                  <div className="mt-4 flex items-end gap-1.5">
                    {[38, 52, 44, 68, 58, 74, 62, 82].map((h, i) => (
                      <div
                        key={i}
                        className="w-full rounded-t-sm bg-gradient-to-t from-[#0077B6] to-[#7CC3E8]"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </GlassPanel>

                {/* Tracking map card */}
                <GlassPanel className="absolute right-0 top-[38%] w-[74%] p-4">
                  <div className="flex items-center justify-between">
                    <span className="st-font-mono text-[0.6875rem] uppercase tracking-wider text-white/50">
                      NBO → MSA
                    </span>
                    <Navigation size={14} className="text-[#7CC3E8]" />
                  </div>
                  <div className="relative mt-3 h-24 overflow-hidden rounded-xl bg-[#0B2536]">
                    <svg
                      viewBox="0 0 200 100"
                      className="absolute inset-0 h-full w-full"
                    >
                      <path
                        d="M10 80 Q 70 20 100 50 T 190 20"
                        fill="none"
                        stroke="#7CC3E8"
                        strokeOpacity="0.4"
                        strokeWidth="2"
                        strokeDasharray="4 5"
                      />
                      <circle cx="10" cy="80" r="3" fill="#ffffff" />
                      <circle cx="190" cy="20" r="3" fill="#ffffff" />
                      <circle
                        cx="100"
                        cy="50"
                        r="5"
                        fill="#0077B6"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 flex justify-between st-font-mono text-[0.75rem] text-white/70">
                    <span>ETA 22 min</span>
                    <span>82 km/h</span>
                  </div>
                </GlassPanel>

                {/* Ticket card */}
                <GlassPanel className="absolute bottom-0 left-[6%] w-[62%] p-4">
                  <div className="flex items-center justify-between">
                    <span className="st-font-mono text-[0.6875rem] uppercase tracking-wider text-white/50">
                      E-ticket
                    </span>
                    <QrCode size={16} className="text-white/70" />
                  </div>
                  <div className="mt-2 text-[0.9375rem] font-semibold text-white">
                    Seat 14A · Equator Express
                  </div>
                  <div className="mt-1 st-font-mono text-[0.75rem] text-white/50">
                    Nairobi → Mombasa · 07:40
                  </div>
                </GlassPanel>
              </div>
            </Reveal>
          </div>

          {/* Ticker */}
          <Reveal delay={100} className="mt-16">
            <RouteTicker />
          </Reveal>

          {/* Stats */}
          <Reveal delay={140}>
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
              <StatBlock value="100,000+" label="Tickets processed" />
              <StatBlock value="50+" label="Bus companies" />
              <StatBlock value="99.9%" label="Platform uptime" />
              <StatBlock value="24/7" label="Live monitoring" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Everything, one platform"
            title="Built to run the whole operation"
            subtitle="From the passenger's first search to the driver's last stop, every part of the trip lives in SafariTix."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 40}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ LIVE TRACKING SHOWCASE ============ */}
      <section className="relative overflow-hidden bg-[#071827] py-24 sm:py-28">
        <GradientBlob className="left-[10%] top-[10%] h-[300px] w-[300px] bg-[#0077B6]/25" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Live tracking</Eyebrow>
            <h2 className="st-font-display mt-4 text-[2rem] font-semibold leading-tight text-white sm:text-[2.5rem]">
              Every bus, visible in real time
            </h2>
            <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-white/70">
              GPS updates stream from the driver's phone straight to the
              passenger app and the operator dashboard — the same signal, three
              views.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: Navigation,
                  label: "ETA to next stop",
                  value: "22 minutes",
                },
                {
                  icon: RouteIcon,
                  label: "Distance remaining",
                  value: "38.4 km",
                },
                { icon: Gauge, label: "Current speed", value: "82 km/h" },
                {
                  icon: MapPin,
                  label: "Passenger location",
                  value: "Matched to nearest stage",
                },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex items-center gap-3 text-white/85"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#7CC3E8]">
                    {(() => {
                      const Icon = row.icon;
                      return <Icon size={17} />;
                    })()}
                  </span>
                  <span className="text-sm text-white/60">{row.label}</span>
                  <span className="st-font-mono ml-auto text-sm font-medium">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative rounded-[28px] border border-white/10 bg-[#0B2536] p-6">
              <svg viewBox="0 0 400 260" className="h-[260px] w-full">
                <path
                  d="M20 220 C 90 60, 180 210, 260 120 S 380 40, 380 40"
                  fill="none"
                  stroke="#7CC3E8"
                  strokeOpacity="0.35"
                  strokeWidth="3"
                  strokeDasharray="6 8"
                />
                <circle cx="20" cy="220" r="5" fill="#fff" />
                <circle cx="380" cy="40" r="5" fill="#fff" />
                <g>
                  <circle
                    cx="220"
                    cy="150"
                    r="9"
                    fill="#0077B6"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  <circle
                    cx="220"
                    cy="150"
                    r="16"
                    fill="none"
                    stroke="#0077B6"
                    strokeOpacity="0.4"
                    strokeWidth="2"
                  />
                </g>
                <text
                  x="30"
                  y="240"
                  fill="#ffffff80"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  NAIROBI
                </text>
                <text
                  x="322"
                  y="30"
                  fill="#ffffff80"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  MOMBASA
                </text>
              </svg>
              <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3">
                <div>
                  <div className="text-[0.8125rem] font-medium text-white">
                    Bus 07 · Equator Express
                  </div>
                  <div className="st-font-mono text-[0.75rem] text-white/50">
                    Route NBO–MSA
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-[#16A34A]/15 px-2.5 py-1 text-[0.75rem] font-medium text-[#16A34A]">
                  <span className="st-live-dot h-1.5 w-1.5 rounded-full bg-[#16A34A]" />{" "}
                  On time
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ WHY SAFARITIX (with audience tabs) ============ */}
      <section className="bg-[#F6FAFC] py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Why it matters"
            title="Fewer problems, better numbers"
            subtitle="Not a feature list — the outcomes operators and passengers actually notice."
          />
          <div className="mb-10 flex justify-center gap-2">
            {(["passengers", "companies"] as const).map((a) => (
              <button
                key={a}
                onClick={() => setAudience(a)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  audience === a
                    ? "bg-[#0077B6] text-white"
                    : "bg-white text-[#5B6B78] border border-[#DCE8F0]"
                }`}
              >
                {a === "passengers" ? "For passengers" : "For operators"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(audience === "passengers"
              ? whyRows.slice(0, 3).concat(whyRows[4])
              : whyRows
            ).map((row, i) => (
              <Reveal key={row.title} delay={i * 40}>
                <div className="rounded-[20px] bg-white p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#E6F4FB] text-[#0077B6]">
                    {(() => {
                      const Icon = row.icon;
                      return <Icon size={20} />;
                    })()}
                  </div>
                  <h3 className="st-font-display mt-5 text-[1.05rem] font-semibold text-[#0B1220]">
                    {row.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#5B6B78]">
                    {row.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ PASSENGER JOURNEY ============ */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Passenger journey"
            title="From search to seat, in one flow"
          />
          <div className="relative mt-4">
            <div className="absolute left-0 right-0 top-[26px] hidden h-px border-t border-dashed border-[#DCE8F0] lg:block" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-7 lg:gap-4">
              {journeySteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 60}>
                  <div className="relative">
                    <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-[#0077B6] bg-white st-font-mono text-sm font-semibold text-[#0077B6]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="st-font-display mt-4 text-[0.9375rem] font-semibold text-[#0B1220]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[#5B6B78]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============ DRIVER EXPERIENCE ============ */}
      <section className="bg-[#F6FAFC] py-24 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Driver app</Eyebrow>
            <h2 className="st-font-display mt-4 text-[2rem] font-semibold leading-tight text-[#0B1220] sm:text-[2.5rem]">
              Everything a driver needs, one phone
            </h2>
            <div className="mt-8 space-y-5">
              {driverSteps.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <span className="st-font-mono flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0077B6]/10 text-[0.8125rem] font-semibold text-[#0077B6]">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-[#0B1220]">
                      {step.title}
                    </div>
                    <div className="text-sm text-[#5B6B78]">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="flex justify-center">
            <div className="relative h-[440px] w-[220px] rounded-[36px] border-8 border-[#0B1220] bg-[#0B1220] shadow-[0_30px_60px_rgba(11,18,32,0.25)]">
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-[#071827] p-4">
                <div className="st-font-mono text-[0.6875rem] text-white/40">
                  Trip · NBO–MSA
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#16A34A]/15 px-3 py-2 text-[0.75rem] font-medium text-[#16A34A]">
                  <span className="st-live-dot h-1.5 w-1.5 rounded-full bg-[#16A34A]" />{" "}
                  Sharing GPS
                </div>
                <div className="mt-4 flex-1 rounded-2xl bg-[#0B2536]" />
                <button className="mt-4 rounded-xl bg-[#0077B6] py-3 text-center text-sm font-semibold text-white">
                  Update status
                </button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Trusted across the region"
            title="What people say about riding — and running — on SafariTix"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <TestimonialCard
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  initials={t.initials}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ PRICING ============ */}
      <section className="bg-[#F6FAFC] py-24 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Plans that scale with your fleet"
            subtitle="Start free. Move up as routes and buses grow."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <PricingCard
              name="Starter"
              price="Free"
              cadence=""
              description="For a single route or a small operator getting started."
              features={[
                "Up to 3 active buses",
                "Online booking & e-tickets",
                "Basic live tracking",
                "Email support",
              ]}
              cta="Start free"
              onClick={handleSignupClick}
            />
            <PricingCard
              name="Growth"
              price="$79"
              cadence="/ month"
              description="For operators running multiple routes and drivers daily."
              features={[
                "Up to 25 active buses",
                "Full fleet & route management",
                "Revenue analytics dashboard",
                "Priority support",
              ]}
              featured
              cta="Start free trial"
              onClick={handleSignupClick}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              cadence=""
              description="For large networks and government-regulated fleets."
              features={[
                "Unlimited buses & routes",
                "Regulatory reporting access",
                "Dedicated onboarding",
                "SLA-backed support",
              ]}
              cta="Talk to sales"
              onClick={handleLoginClick}
            />
          </div>
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <section className="bg-white py-24 sm:py-28">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Common questions" align="left" />
          <div>
            {faqs.map((f) => (
              <FaqItem key={f.q} question={f.q} answer={f.a} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden bg-[#071827] py-24">
        <GradientBlob className="left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 bg-[#0077B6]/30" />
        <Container className="relative text-center">
          <h2 className="st-font-display mx-auto max-w-2xl text-[2.25rem] font-semibold leading-tight text-white sm:text-[3rem]">
            Ready to modernize your transport business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.0625rem] text-white/70">
            Set up your first route in minutes — no hardware, no long contracts.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleSignupClick}
              className="flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[0.9375rem] font-semibold text-[#0B1220] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start free <ArrowRight size={17} />
            </button>
            <button
              onClick={handleLoginClick}
              className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Book a demo <ArrowUpRight size={17} />
            </button>
          </div>
        </Container>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#0B1220] py-16 text-white">
        <Container>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
            <div className="col-span-2">
              <div className="st-font-display flex items-center gap-2 text-lg font-semibold">
                <Bus size={20} className="text-[#7CC3E8]" /> SafariTix
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                The operating system for East Africa's bus networks — booking,
                fleet management, and live tracking in one platform.
              </p>
              <div className="mt-6 flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
                  >
                    <Icon size={16} />
                  </span>
                ))}
              </div>
            </div>
            {[
              {
                title: "Product",
                links: [
                  "Booking",
                  "Fleet management",
                  "Live tracking",
                  "Driver app",
                ],
              },
              { title: "Company", links: ["About", "Careers", "Press"] },
              {
                title: "Resources",
                links: ["Help center", "API docs", "Status"],
              },
              { title: "Legal", links: ["Privacy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="st-font-mono text-[0.75rem] font-semibold uppercase tracking-wider text-white/40">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        to="#"
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <span className="text-[0.8125rem] text-white/40">
              © {new Date().getFullYear()} SafariTix. All rights reserved.
            </span>
            <span className="flex items-center gap-1.5 text-[0.8125rem] text-white/40">
              <Building2 size={13} /> Built for East Africa's transport
              operators
            </span>
          </div>
        </Container>
      </footer>
    </div>
  );
}
