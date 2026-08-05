import React, {
  FormEvent,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Heart,
  MapPin,
  Search,
  Shield,
  Star,
  Ticket,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../components/AuthContext';

// ─── Types ────────────────────────────────────────────────────────────────────

type BusSearchResult = {
  schedule_id: string;
  route_id?: string;
  bus_id?: string;
  bus_plate?: string;
  company_name?: string;
  pickup_stop: string;
  dropoff_stop: string;
  departure_date?: string | null;
  departure_time?: string | null;
  available_seats?: number;
  capacity?: number;
  price?: number;
};

type SearchFormData = {
  from: string;
  to: string;
  date: string;
  passengers: number;
};

type SortKey = 'price' | 'departure' | 'seats' | 'recommended';

type FilterState = {
  maxPrice: number;
  companies: string[];
  minSeats: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const POPULAR_ROUTES = [
  { from: 'Kigali', to: 'Musanze', duration: '2h 30m', price: 2500, departures: 14 },
  { from: 'Kigali', to: 'Huye', duration: '3h 00m', price: 3000, departures: 10 },
  { from: 'Kigali', to: 'Rubavu', duration: '3h 30m', price: 3500, departures: 8 },
  { from: 'Kigali', to: 'Nyagatare', duration: '3h 45m', price: 3200, departures: 6 },
];

const RECENT_ROUTES = [
  { from: 'Kigali', to: 'Musanze' },
  { from: 'Kigali', to: 'Huye' },
];

// ─── Utilities ────────────────────────────────────────────────────────────────

const parseMaybeJson = async (res: Response) => {
  try { return await res.json(); } catch { return null; }
};

const fmt = {
  currency: (v?: number) =>
    v === undefined || Number.isNaN(Number(v))
      ? 'RWF 0'
      : `RWF ${Number(v).toLocaleString()}`,
  date: (v?: string | null) => {
    if (!v) return 'TBD';
    const d = new Date(`${v}T00:00:00`);
    return Number.isNaN(d.getTime())
      ? v
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
  time: (v?: string | null) => (v ? String(v).slice(0, 5) : 'TBD'),
  seats: (available = 0, capacity = 0) => {
    const pct = capacity > 0 ? available / capacity : 0;
    if (pct === 0) return { label: 'Sold out', color: 'text-red-500', bg: 'bg-red-50' };
    if (pct < 0.2) return { label: `${available} left`, color: 'text-orange-600', bg: 'bg-orange-50' };
    return { label: `${available} seats`, color: 'text-emerald-600', bg: 'bg-emerald-50' };
  },
};

const normalizeResult = (bus: any, form: SearchFormData): BusSearchResult => ({
  schedule_id: String(bus.schedule_id || bus.scheduleId || bus.id || ''),
  route_id: bus.route_id || bus.routeId || '',
  bus_id: bus.bus_id || bus.busId || '',
  bus_plate: bus.bus_plate || bus.plate_number || bus.busPlate || '',
  company_name: bus.company_name || bus.companyName || 'SafariTix operator',
  pickup_stop: bus.pickup_stop || bus.from_stop || bus.from || bus.routeFrom || form.from,
  dropoff_stop: bus.dropoff_stop || bus.to_stop || bus.to || bus.routeTo || form.to,
  departure_date: bus.departure_date || bus.date || null,
  departure_time: bus.departure_time || bus.time || null,
  available_seats: Number(bus.available_seats ?? bus.seatsAvailable ?? bus.availableSeats ?? 0),
  capacity: Number(bus.capacity ?? bus.totalSeats ?? bus.seatCapacity ?? 0),
  price: Number(bus.price ?? 0),
});

// ─── Shared Primitives ────────────────────────────────────────────────────────

const Badge = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

// ─── Hero Section ─────────────────────────────────────────────────────────────

function RouteIllustration() {
  return (
    <svg
      viewBox="0 0 420 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-md opacity-90"
      aria-hidden="true"
    >
      {/* Road */}
      <path
        d="M20 220 Q120 140 210 130 Q300 120 400 60"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="28"
        strokeLinecap="round"
      />
      <path
        d="M20 220 Q120 140 210 130 Q300 120 400 60"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="34"
        strokeLinecap="round"
      />
      {/* Dashed center line */}
      <path
        d="M20 220 Q120 140 210 130 Q300 120 400 60"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="12 10"
        className="animate-dash"
      />

      {/* Origin dot */}
      <circle cx="20" cy="220" r="10" fill="#F4A261" />
      <circle cx="20" cy="220" r="6" fill="white" />

      {/* Destination dot */}
      <circle cx="400" cy="60" r="10" fill="#F4A261" />
      <circle cx="400" cy="60" r="6" fill="white" />

      {/* Animated bus */}
      <g style={{ animation: 'moveBus 4s ease-in-out infinite' }}>
        <rect x="192" y="117" width="36" height="22" rx="5" fill="#F4A261" />
        <rect x="196" y="120" width="10" height="7" rx="1.5" fill="rgba(255,255,255,0.8)" />
        <rect x="214" y="120" width="10" height="7" rx="1.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="197" cy="139" r="3" fill="#1a1a2e" />
        <circle cx="223" cy="139" r="3" fill="#1a1a2e" />
      </g>

      {/* City skylines (minimal) */}
      <g opacity="0.2">
        <rect x="0" y="195" width="8" height="25" rx="1" fill="white" />
        <rect x="10" y="185" width="10" height="35" rx="1" fill="white" />
        <rect x="22" y="200" width="6" height="20" rx="1" fill="white" />
      </g>
      <g opacity="0.2" transform="translate(370, 35)">
        <rect x="0" y="0" width="8" height="20" rx="1" fill="white" />
        <rect x="10" y="-8" width="10" height="28" rx="1" fill="white" />
        <rect x="22" y="-2" width="6" height="22" rx="1" fill="white" />
      </g>

      <style>{`
        @keyframes moveBus {
          0%, 100% { transform: translate(-20px, 10px); }
          50% { transform: translate(20px, -10px); }
        }
        .animate-dash {
          stroke-dashoffset: 0;
          animation: dashMove 2s linear infinite;
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -44; }
        }
      `}</style>
    </svg>
  );
}

// ─── Search Card ──────────────────────────────────────────────────────────────

function SearchCard({
  form,
  loading,
  onChange,
  onSubmit,
  onSwap,
}: {
  form: SearchFormData;
  loading: boolean;
  onChange: (next: SearchFormData) => void;
  onSubmit: (e: FormEvent) => void;
  onSwap: () => void;
}) {
  const inputBase =
    'w-full bg-transparent pt-5 pb-1.5 px-0 text-sm font-medium text-[#1F2937] outline-none placeholder-transparent peer';
  const labelBase =
    'absolute left-0 top-0 text-[10px] font-semibold uppercase tracking-widest text-[#0077B6] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#9CA3AF] peer-placeholder-shown:tracking-normal peer-placeholder-shown:uppercase peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-[#0077B6] peer-focus:tracking-widest';
  const field = 'relative border-b border-[#E5E7EB] focus-within:border-[#0077B6] transition-colors';

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl bg-white shadow-xl shadow-[#0077B6]/10 border border-[#E5E7EB] overflow-hidden"
    >
      {/* Tab bar */}
      <div className="flex border-b border-[#E5E7EB]">
        <button
          type="button"
          className="px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#0077B6] border-b-2 border-[#0077B6] bg-[#F0F9FF]"
        >
          One Way
        </button>
        <button
          type="button"
          className="px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] hover:text-[#1F2937] transition-colors"
        >
          Round Trip
        </button>
      </div>

      <div className="p-5 md:p-7">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr_1fr_auto_auto] md:items-end">
          {/* From */}
          <div className={field}>
            <MapPin className="absolute right-0 bottom-2 h-4 w-4 text-[#9CA3AF]" />
            <label className={labelBase} htmlFor="from-input">From</label>
            <input
              id="from-input"
              value={form.from}
              onChange={(e) => onChange({ ...form, from: e.target.value })}
              placeholder="Departure city"
              className={inputBase}
              required
              list="cities-from"
            />
            <datalist id="cities-from">
              {RECENT_ROUTES.map((r) => <option key={r.from} value={r.from} />)}
              <option value="Kigali" />
              <option value="Musanze" />
              <option value="Huye" />
              <option value="Rubavu" />
              <option value="Nyagatare" />
            </datalist>
          </div>

          {/* Swap */}
          <div className="flex justify-center md:pb-1.5">
            <button
              type="button"
              onClick={onSwap}
              aria-label="Swap origin and destination"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#0077B6] shadow-sm hover:bg-[#F0F9FF] hover:scale-110 active:scale-95 transition-all"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* To */}
          <div className={field}>
            <MapPin className="absolute right-0 bottom-2 h-4 w-4 text-[#9CA3AF]" />
            <label className={labelBase} htmlFor="to-input">To</label>
            <input
              id="to-input"
              value={form.to}
              onChange={(e) => onChange({ ...form, to: e.target.value })}
              placeholder="Destination city"
              className={inputBase}
              required
              list="cities-to"
            />
            <datalist id="cities-to">
              <option value="Kigali" />
              <option value="Musanze" />
              <option value="Huye" />
              <option value="Rubavu" />
              <option value="Nyagatare" />
            </datalist>
          </div>

          {/* Date */}
          <div className={field}>
            <Calendar className="absolute right-0 bottom-2 h-4 w-4 text-[#9CA3AF]" />
            <label className={labelBase} htmlFor="date-input">Travel date</label>
            <input
              id="date-input"
              type="date"
              value={form.date}
              onChange={(e) => onChange({ ...form, date: e.target.value })}
              className={`${inputBase} cursor-pointer`}
              required
            />
          </div>

          {/* Passengers */}
          <div className={`${field} min-w-[100px]`}>
            <Users className="absolute right-0 bottom-2 h-4 w-4 text-[#9CA3AF]" />
            <label className={labelBase} htmlFor="pax-input">Passengers</label>
            <select
              id="pax-input"
              value={form.passengers}
              onChange={(e) => onChange({ ...form, passengers: Number(e.target.value) })}
              className={`${inputBase} cursor-pointer appearance-none`}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0077B6] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0077B6]/30 hover:bg-[#005F8E] hover:shadow-[#0077B6]/40 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            <Search className="h-4 w-4" />
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>

        {/* Recent routes */}
        {RECENT_ROUTES.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">
              Recent
            </span>
            {RECENT_ROUTES.map((r) => (
              <button
                key={`${r.from}-${r.to}`}
                type="button"
                onClick={() => onChange({ ...form, from: r.from, to: r.to })}
                className="flex items-center gap-1 rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#1F2937] hover:border-[#0077B6] hover:text-[#0077B6] transition-colors"
              >
                <TrendingUp className="h-3 w-3 opacity-50" />
                {r.from} → {r.to}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}

// ─── Popular Routes ───────────────────────────────────────────────────────────

function PopularRoutes({ onSelect }: { onSelect: (from: string, to: string) => void }) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1F2937] [font-family:Montserrat,sans-serif]">
          Popular routes
        </h2>
        <span className="text-xs font-semibold uppercase tracking-widest text-[#0077B6]">
          Today's schedule
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_ROUTES.map((route) => (
          <button
            key={`${route.from}-${route.to}`}
            type="button"
            onClick={() => onSelect(route.from, route.to)}
            className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-4 text-left shadow-sm hover:border-[#0077B6]/40 hover:shadow-md transition-all"
          >
            {/* accent line */}
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#0077B6] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF]">Route</p>
                <p className="mt-1 font-bold text-[#1F2937]">{route.from}</p>
                <div className="my-1 flex items-center gap-1">
                  <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                  <MapPin className="h-3 w-3 text-[#0077B6]" />
                  <div className="h-px flex-1 border-t border-dashed border-[#D1D5DB]" />
                </div>
                <p className="font-bold text-[#1F2937]">{route.to}</p>
              </div>
              <Badge className="bg-[#F0F9FF] text-[#0077B6]">
                {fmt.currency(route.price)}
              </Badge>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {route.duration}
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3 text-[#F4A261]" /> {route.departures} today
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Filters & Sorting ────────────────────────────────────────────────────────

function SortBar({
  sort,
  onSort,
  count,
  filtersOpen,
  onToggleFilters,
}: {
  sort: SortKey;
  onSort: (k: SortKey) => void;
  count: number;
  filtersOpen: boolean;
  onToggleFilters: () => void;
}) {
  const options: { key: SortKey; label: string }[] = [
    { key: 'recommended', label: 'Recommended' },
    { key: 'price', label: 'Lowest price' },
    { key: 'departure', label: 'Earliest' },
    { key: 'seats', label: 'Most seats' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-[#1F2937]">
        <span className="text-[#0077B6]">{count}</span> bus{count !== 1 ? 'es' : ''} found
      </p>
      <div className="flex items-center gap-2">
        <div className="flex overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
          {options.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSort(opt.key)}
              className={`px-3 py-2 text-xs font-semibold transition-colors ${
                sort === opt.key
                  ? 'bg-[#0077B6] text-white'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggleFilters}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
            filtersOpen
              ? 'border-[#0077B6] bg-[#0077B6] text-white'
              : 'border-[#E5E7EB] bg-white text-[#1F2937] hover:border-[#0077B6] hover:text-[#0077B6]'
          }`}
        >
          <Filter className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>
    </div>
  );
}

function FiltersPanel({
  filters,
  onChange,
  onClose,
  results,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
  results: BusSearchResult[];
}) {
  const companies = useMemo(
    () => [...new Set(results.map((r) => r.company_name || 'Unknown').filter(Boolean))],
    [results],
  );
  const maxPrice = useMemo(
    () => Math.max(...results.map((r) => r.price ?? 0), 10000),
    [results],
  );

  return (
    <aside className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#1F2937]">Filters</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#1F2937] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 space-y-5">
        {/* Price */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
            Max price
          </label>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={500}
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[#0077B6]"
          />
          <div className="mt-1 flex justify-between text-xs text-[#9CA3AF]">
            <span>RWF 0</span>
            <span className="font-semibold text-[#0077B6]">{fmt.currency(filters.maxPrice)}</span>
          </div>
        </div>

        {/* Min seats */}
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
            Min available seats
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ ...filters, minSeats: n })}
                className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                  filters.minSeats === n
                    ? 'border-[#0077B6] bg-[#F0F9FF] text-[#0077B6]'
                    : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#0077B6]'
                }`}
              >
                {n}+
              </button>
            ))}
          </div>
        </div>

        {/* Companies */}
        {companies.length > 1 && (
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-[#6B7280]">
              Operator
            </label>
            <div className="space-y-1.5">
              {companies.map((c) => (
                <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.companies.length === 0 || filters.companies.includes(c)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...filters.companies, c]
                        : filters.companies.filter((x) => x !== c);
                      onChange({ ...filters, companies: next });
                    }}
                    className="h-4 w-4 rounded accent-[#0077B6]"
                  />
                  <span className="text-[#1F2937]">{c}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Result Card ──────────────────────────────────────────────────────────────

function ResultCard({
  result,
  onSelect,
  onFavorite,
  isFavorite,
}: {
  result: BusSearchResult;
  onSelect: (r: BusSearchResult) => void;
  onFavorite: (id: string) => void;
  isFavorite: boolean;
}) {
  const seatInfo = fmt.seats(result.available_seats, result.capacity);
  const sold = (result.available_seats ?? 0) <= 0;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
      {/* Top color strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0077B6] to-[#00B4D8]" />

      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Left: company + route */}
          <div className="flex items-start gap-3">
            {/* Logo placeholder */}
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0F9FF] text-[#0077B6]">
              <span className="text-lg font-black">
                {(result.company_name || 'S').charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-[#1F2937]">{result.company_name || 'SafariTix operator'}</p>
                <Badge className="bg-[#F0FDF4] text-emerald-700">
                  <Shield className="h-2.5 w-2.5" /> Verified
                </Badge>
              </div>
              <p className="mt-0.5 text-sm text-[#6B7280]">
                {result.pickup_stop} → {result.dropoff_stop}
              </p>
            </div>
          </div>

          {/* Right: price + favorite */}
          <div className="flex items-start gap-3">
            <div className="text-right">
              <p className="text-xs text-[#9CA3AF]">Starting from</p>
              <p className="text-xl font-black text-[#0077B6] [font-family:Montserrat,sans-serif]">
                {fmt.currency(result.price)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onFavorite(result.schedule_id)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              className="rounded-full p-1.5 text-[#D1D5DB] hover:text-red-400 transition-colors"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${isFavorite ? 'fill-red-400 text-red-400' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Time + seats row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-[#F8FAFC] px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Date</p>
            <p className="mt-0.5 text-sm font-bold text-[#1F2937]">{fmt.date(result.departure_date)}</p>
          </div>
          <div className="rounded-xl bg-[#F8FAFC] px-3 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Departs</p>
            <p className="mt-0.5 text-sm font-bold text-[#1F2937]">{fmt.time(result.departure_time)}</p>
          </div>
          <div className={`rounded-xl px-3 py-2.5 ${seatInfo.bg}`}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Seats</p>
            <p className={`mt-0.5 text-sm font-bold ${seatInfo.color}`}>{seatInfo.label}</p>
          </div>
        </div>

        {/* Rating + CTA */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3.5 w-3.5 ${s <= 4 ? 'fill-[#F4A261] text-[#F4A261]' : 'text-[#D1D5DB]'}`}
              />
            ))}
            <span className="ml-1 text-xs text-[#6B7280]">4.0 (128 reviews)</span>
          </div>

          <button
            onClick={() => onSelect(result)}
            disabled={sold}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold shadow transition-all ${
              sold
                ? 'cursor-not-allowed bg-[#F3F4F6] text-[#9CA3AF]'
                : 'bg-[#0077B6] text-white shadow-[#0077B6]/25 hover:bg-[#005F8E] hover:shadow-[#0077B6]/40 active:scale-95'
            }`}
          >
            <Ticket className="h-4 w-4" />
            {sold ? 'Sold out' : 'Book now'}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="h-1 animate-pulse bg-gradient-to-r from-[#E5E7EB] to-[#F3F4F6]" />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 animate-pulse rounded-xl bg-[#F3F4F6]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-36 animate-pulse rounded-full bg-[#F3F4F6]" />
            <div className="h-3 w-48 animate-pulse rounded-full bg-[#F3F4F6]" />
          </div>
          <div className="h-8 w-24 animate-pulse rounded-xl bg-[#F3F4F6]" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-[#F3F4F6]" />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="h-4 w-32 animate-pulse rounded-full bg-[#F3F4F6]" />
          <div className="h-9 w-28 animate-pulse rounded-xl bg-[#F3F4F6]" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  hasSearched,
  onReset,
}: {
  hasSearched: boolean;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F9FF]">
        <Search className="h-8 w-8 text-[#0077B6]" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#1F2937] [font-family:Montserrat,sans-serif]">
        {hasSearched ? 'No buses found' : 'Find your next trip'}
      </h3>
      <p className="mt-2 text-sm text-[#6B7280]">
        {hasSearched
          ? 'Try different route names or a later travel date — more services may be available.'
          : 'Enter departure city, destination, and date to discover available buses.'}
      </p>
      {hasSearched && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#0077B6] px-5 py-2.5 text-sm font-semibold text-[#0077B6] hover:bg-[#F0F9FF] transition-colors"
        >
          <X className="h-4 w-4" /> Clear search
        </button>
      )}
    </div>
  );
}

// ─── Error Banner ─────────────────────────────────────────────────────────────

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#E63946]/25 bg-[#E63946]/8 px-4 py-3 text-sm text-[#B32633]">
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="flex-shrink-0 rounded-full p-0.5 hover:bg-[#E63946]/15 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SearchBusPage() {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [form, setForm] = useState<SearchFormData>({
    from: '',
    to: '',
    date: new Date().toISOString().slice(0, 10),
    passengers: 1,
  });
  const [results, setResults] = useState<BusSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 999999,
    companies: [],
    minSeats: 1,
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const resultsRef = useRef<HTMLDivElement>(null);

  // Reset filter maxPrice when results change
  useEffect(() => {
    const max = Math.max(...results.map((r) => r.price ?? 0), 10000);
    setFilters((f) => ({ ...f, maxPrice: max }));
  }, [results]);

  const filteredAndSorted = useMemo(() => {
    let list = results.filter((r) => {
      if ((r.price ?? 0) > filters.maxPrice) return false;
      if ((r.available_seats ?? 0) < filters.minSeats) return false;
      if (filters.companies.length > 0 && !filters.companies.includes(r.company_name || ''))
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'price') return (a.price ?? 0) - (b.price ?? 0);
      if (sort === 'departure') {
        const at = `${a.departure_date || ''} ${a.departure_time || ''}`;
        const bt = `${b.departure_date || ''} ${b.departure_time || ''}`;
        return at.localeCompare(bt);
      }
      if (sort === 'seats') return (b.available_seats ?? 0) - (a.available_seats ?? 0);
      // recommended: departure time as fallback
      const at = `${a.departure_date || ''} ${a.departure_time || ''}`;
      const bt = `${b.departure_date || ''} ${b.departure_time || ''}`;
      return at.localeCompare(bt);
    });

    return list;
  }, [results, sort, filters]);

  const handleSearch = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!form.from || !form.to || !form.date) {
        setError('Please fill in all fields to search.');
        return;
      }
      if (form.from.trim().toLowerCase() === form.to.trim().toLowerCase()) {
        setError('Departure and destination cannot be the same city.');
        return;
      }

      setLoading(true);
      setError('');
      setHasSearched(true);

      try {
        const query = new URLSearchParams({
          from: form.from.trim(),
          to: form.to.trim(),
          date: form.date,
        });

        const res = await fetch(`/api/search-trips?${query}`, {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });
        const payload = await parseMaybeJson(res);

        if (res.ok && (payload?.success === true || Array.isArray(payload?.trips))) {
          const buses: BusSearchResult[] = (Array.isArray(payload?.trips) ? payload.trips : [])
            .map((bus: any) => normalizeResult(bus, form))
            .filter((b: BusSearchResult) => Boolean(b.schedule_id));
          setResults(buses);

          // Scroll to results
          setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
        } else {
          setResults([]);
          setError(payload?.message || 'Unable to fetch buses right now. Please try again.');
        }
      } catch {
        setResults([]);
        setError('Network error while searching. Please check your connection.');
      } finally {
        setLoading(false);
      }
    },
    [form, accessToken],
  );

  const handleSwap = useCallback(() => {
    setForm((f) => ({ ...f, from: f.to, to: f.from }));
  }, []);

  const handlePopularRoute = useCallback((from: string, to: string) => {
    setForm((f) => ({ ...f, from, to }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectBus = useCallback(
    (result: BusSearchResult) => {
      const params = new URLSearchParams({
        trip_id: result.schedule_id,
        from: result.pickup_stop,
        to: result.dropoff_stop,
      });
      navigate(`/commuter/seat-map?${params}`, {
        state: {
          trip: {
            trip_id: result.schedule_id,
            route_id: result.route_id || '',
            from_stop: result.pickup_stop,
            to_stop: result.dropoff_stop,
            departure_time: result.departure_time || '',
            departure_date: result.departure_date || '',
            available_seats: result.available_seats ?? 0,
            capacity: result.capacity ?? 0,
            price: result.price ?? 0,
            bus_plate: result.bus_plate || '',
            company_name: result.company_name || 'SafariTix operator',
          },
        },
      });
    },
    [navigate],
  );

  const handleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Hero ── */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#023E8A] via-[#0077B6] to-[#0096C7] px-4 pb-24 pt-10 md:px-8 md:pt-14">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-10 left-1/3 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#90E0EF]">
              SafariTix · Bus Booking
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white [font-family:Montserrat,sans-serif] md:text-5xl">
              Where are you<br />
              <span className="text-[#F4A261]">headed today?</span>
            </h1>
            <p className="mt-3 text-base text-[#ADE8F4]">
              Search hundreds of buses across Rwanda — compare prices, pick your seat, and book in seconds.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-[#ADE8F4]">
              <span className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-[#F4A261]" /> Secure booking
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#F4A261]" /> Instant confirmation
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-[#F4A261]" /> Top-rated operators
              </span>
            </div>
          </div>
          <div className="hidden w-full max-w-sm md:block">
            <RouteIllustration />
          </div>
        </div>
      </header>

      {/* ── Search card (overlapping hero) ── */}
      <div className="-mt-14 px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <SearchCard
            form={form}
            loading={loading}
            onChange={setForm}
            onSubmit={handleSearch}
            onSwap={handleSwap}
          />
        </div>
      </div>

      <main className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:px-8">
        {error && <ErrorBanner message={error} onDismiss={() => setError('')} />}

        {/* Popular routes (only before first search) */}
        {!hasSearched && (
          <PopularRoutes onSelect={handlePopularRoute} />
        )}

        {/* Results */}
        <div ref={resultsRef}>
          {loading ? (
            <div className="space-y-4">
              <div className="h-8 w-48 animate-pulse rounded-full bg-[#E5E7EB]" />
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : hasSearched ? (
            <div className="space-y-4">
              <SortBar
                sort={sort}
                onSort={setSort}
                count={filteredAndSorted.length}
                filtersOpen={filtersOpen}
                onToggleFilters={() => setFiltersOpen((o) => !o)}
              />

              <div className={`grid gap-4 ${filtersOpen ? 'lg:grid-cols-[280px_1fr]' : ''}`}>
                {filtersOpen && (
                  <FiltersPanel
                    filters={filters}
                    onChange={setFilters}
                    onClose={() => setFiltersOpen(false)}
                    results={results}
                  />
                )}

                <div className="space-y-4">
                  {filteredAndSorted.length === 0 ? (
                    <EmptyState hasSearched={hasSearched} onReset={() => { setResults([]); setHasSearched(false); }} />
                  ) : (
                    filteredAndSorted.map((result) => (
                      <ResultCard
                        key={result.schedule_id}
                        result={result}
                        onSelect={handleSelectBus}
                        onFavorite={handleFavorite}
                        isFavorite={favorites.has(result.schedule_id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}