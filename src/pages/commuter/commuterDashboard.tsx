import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Bus,
  Calendar,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Download,
  HelpCircle,
  History,
  LayoutDashboard,
  Loader2,
  LogOut,
  MapPin,
  Menu,
  Navigation,
  QrCode,
  RefreshCw,
  Route,
  Search,
  Settings,
  Star,
  Ticket,
  TrendingUp,
  X,
  XCircle,
  AlertTriangle,
  Headphones,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext";
import PassengerTracking from "../../components/PassengerTracking";
import BookingList from "./dashboard/components/BookingList";
import ComplaintSection from "./dashboard/components/ComplaintSection";
import {
  AppAlert,
  BookingFilter,
  BookingRecord,
  NotificationRecord,
} from "./dashboard/types";
import {
  authHeaders,
  dedupeBookings,
  formatCurrency,
  formatDate,
  formatTime,
  isActiveBooking,
  isCanceledBooking,
  isPastBooking,
  normalizeBooking,
  normalizeNotification,
  parseMaybeJson,
} from "./dashboard/utils";

// ─── helpers ────────────────────────────────────────────────────────────────

function isCancelable(booking: BookingRecord) {
  if (booking.status === "CANCELLED" || booking.status === "COMPLETED")
    return false;
  if (!booking.scheduleDate || !booking.departureTime) return true;
  const dt = new Date(`${booking.scheduleDate}T${booking.departureTime}`);
  if (Number.isNaN(dt.getTime())) return true;
  return (dt.getTime() - Date.now()) / (1000 * 60) >= 15;
}

function filterBookings(bookings: BookingRecord[], filter: BookingFilter) {
  if (filter === "all") return bookings;
  if (filter === "canceled") return bookings.filter(isCanceledBooking);
  if (filter === "past")
    return bookings.filter((b) => !isCanceledBooking(b) && isPastBooking(b));
  return bookings.filter((b) => !isCanceledBooking(b) && isActiveBooking(b));
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const today = new Date().toLocaleDateString("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// ─── sidebar nav items ───────────────────────────────────────────────────────

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  section?: string;
};

// ─── sub-components ──────────────────────────────────────────────────────────

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className="flex items-center justify-center rounded-full bg-sky-600 font-bold text-white flex-shrink-0 select-none"
    >
      {initials}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  barPct,
  barColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  barPct: number;
  barColor: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-default">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-50">
          {icon}
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 font-montserrat">
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
      <div className="mt-3 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${barPct}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

function QuickActionCard({
  icon,
  label,
  description,
  iconBg,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  iconBg: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-2xl p-4 text-left hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col gap-3 w-full"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const s = status?.toUpperCase();
  if (s === "CONFIRMED" || s === "ACTIVE")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
        <CheckCircle className="w-3 h-3" />
        Confirmed
      </span>
    );
  if (s === "CANCELLED")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600">
        <XCircle className="w-3 h-3" />
        Cancelled
      </span>
    );
  if (s === "COMPLETED")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600">
        <CheckCircle className="w-3 h-3" />
        Completed
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700">
      <Calendar className="w-3 h-3" />
      {status || "Pending"}
    </span>
  );
}

function TripCard({
  booking,
  onViewTicket,
  onTrackBus,
  onCancel,
  canceling,
}: {
  booking: BookingRecord;
  onViewTicket: (b: BookingRecord) => void;
  onTrackBus: (b: BookingRecord) => void;
  onCancel: (b: BookingRecord) => void;
  canceling: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:border-sky-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* operator badge */}
        <div className="w-11 h-11 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
          <Bus className="w-5 h-5 text-sky-600" />
        </div>

        {/* route info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
            <span className="truncate">{booking.fromStop}</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="truncate">{booking.toStop}</span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(booking.scheduleDate)}
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3" />
              {formatTime(booking.departureTime)}
            </span>
            {booking.seatNumber && (
              <span className="flex items-center gap-1">
                <Ticket className="w-3 h-3" />
                Seat {booking.seatNumber}
              </span>
            )}
            {booking.busPlate && (
              <span className="flex items-center gap-1">
                <Bus className="w-3 h-3" />
                {booking.busPlate}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={booking.status} />
            {booking.fare && (
              <span className="text-xs font-semibold text-sky-600">
                {formatCurrency(booking.fare)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={() => onViewTicket(booking)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          QR Ticket
        </button>
        {isActiveBooking(booking) && (
          <button
            onClick={() => onTrackBus(booking)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-600 text-xs font-semibold text-white hover:bg-sky-700 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" />
            Track bus
          </button>
        )}
        {isCancelable(booking) && (
          <button
            onClick={() => onCancel(booking)}
            disabled={canceling}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {canceling ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <X className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function TimelineItem({
  icon,
  iconBg,
  iconColor,
  title,
  detail,
  time,
  last,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  time: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        {!last && <div className="w-px flex-1 bg-gray-100 mt-1 mb-0" />}
      </div>
      <div className={`pb-4 flex-1 min-w-0 ${last ? "" : ""}`}>
        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function NotifItem({ notif }: { notif: NotificationRecord }) {
  return (
    <div
      className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-colors cursor-pointer hover:bg-gray-50 ${
        !notif.isRead ? "bg-sky-50/50" : ""
      }`}
    >
      {!notif.isRead && (
        <span className="w-2 h-2 rounded-full bg-sky-500 flex-shrink-0 mt-2" />
      )}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug text-gray-800 ${!notif.isRead ? "font-semibold" : ""}`}
        >
          {notif.message || notif.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ""}
        </p>
      </div>
    </div>
  );
}

function AlertBanner({
  alert,
  onDismiss,
}: {
  alert: AppAlert;
  onDismiss: (id: string) => void;
}) {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    info: "bg-sky-50 border-sky-200 text-sky-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
  } as const;
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${styles[alert.type]}`}
    >
      <span className="flex-1">{alert.message}</span>
      <button
        onClick={() => onDismiss(alert.id)}
        className="hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function TicketPreviewModal({
  booking,
  onClose,
}: {
  booking: BookingRecord;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-200">
                Boarding pass
              </p>
              <h4 className="mt-1.5 text-lg font-bold font-montserrat">
                {booking.fromStop} → {booking.toStop}
              </h4>
              <p className="text-sm text-sky-200 mt-0.5">
                {formatDate(booking.scheduleDate)} ·{" "}
                {formatTime(booking.departureTime)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: "Seat", value: booking.seatNumber },
              { label: "Fare", value: formatCurrency(booking.fare) },
              { label: "Bus plate", value: booking.busPlate },
              { label: "Reference", value: booking.bookingRef || booking.id },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-gray-50 px-3 py-2.5">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                  {label}
                </p>
                <p className="font-semibold text-gray-800 mt-0.5 truncate">
                  {value || "—"}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center">
            <div className="inline-flex rounded-2xl bg-white p-4 shadow-sm">
              <QRCodeSVG
                value={booking.bookingRef || booking.id}
                size={160}
                level="H"
                includeMargin
              />
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Show this QR code to the driver when boarding.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-sky-600 text-white font-semibold text-sm hover:bg-sky-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── main component ──────────────────────────────────────────────────────────

export default function CommuterDashboard() {
  const { user, accessToken, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [alerts, setAlerts] = useState<AppAlert[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("all");
  const [selectedTrackingBooking, setSelectedTrackingBooking] =
    useState<BookingRecord | null>(null);
  const [ticketPreview, setTicketPreview] = useState<BookingRecord | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [searchDate, setSearchDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const userName = user?.name || "Commuter";

  // ── alerts ──────────────────────────────────────────────────────────────
  const pushAlert = (type: AppAlert["type"], message: string) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setAlerts((c) => [...c, { id, type, message }]);
    window.setTimeout(
      () => setAlerts((c) => c.filter((a) => a.id !== id)),
      5000,
    );
  };

  const dismissAlert = (id: string) =>
    setAlerts((c) => c.filter((a) => a.id !== id));

  // ── data loading ─────────────────────────────────────────────────────────
  const loadBookings = async () => {
    if (!accessToken) {
      setBookings([]);
      return;
    }
    setLoadingBookings(true);
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/my-tickets", { headers: authHeaders(accessToken) }),
        fetch("/api/tickets", { headers: authHeaders(accessToken) }),
      ]);
      const [p1, p2] = await Promise.all([
        parseMaybeJson(r1),
        parseMaybeJson(r2),
      ]);
      const list1 = Array.isArray(p1?.tickets) ? p1.tickets : [];
      const list2 = Array.isArray(p2?.tickets) ? p2.tickets : [];
      const merged = dedupeBookings([...list1, ...list2].map(normalizeBooking));
      setBookings(merged.filter((b) => Boolean(b.id)));
    } catch {
      pushAlert("error", "Failed to load your bookings. Please try again.");
    } finally {
      setLoadingBookings(false);
    }
  };

  const loadNotifications = async () => {
    if (!accessToken) {
      setNotifications([]);
      setLoadingNotifications(false);
      return;
    }
    setLoadingNotifications(true);
    try {
      const r = await fetch("/api/notifications?limit=8", {
        headers: authHeaders(accessToken),
      });
      const p = await parseMaybeJson(r);
      if (r.ok)
        setNotifications(
          Array.isArray(p?.data) ? p.data.map(normalizeNotification) : [],
        );
    } catch {
      // silent
    } finally {
      setLoadingNotifications(false);
    }
  };

  const refreshDashboard = async () => {
    setRefreshing(true);
    await Promise.all([loadBookings(), loadNotifications()]);
    setRefreshing(false);
  };

  useEffect(() => {
    void refreshDashboard();
  }, [accessToken]);

  useEffect(() => {
    if (!selectedTrackingBooking) {
      setSelectedTrackingBooking(bookings.find(isActiveBooking) || null);
      return;
    }
    if (!bookings.some((b) => b.id === selectedTrackingBooking.id))
      setSelectedTrackingBooking(bookings.find(isActiveBooking) || null);
  }, [bookings]);

  useEffect(() => {
    if (location.pathname === "/commuter/bookings") {
      setActiveFilter("all");
      setTimeout(
        () =>
          document
            .getElementById("bookings-panel")
            ?.scrollIntoView({ behavior: "smooth" }),
        120,
      );
    }
  }, [location.pathname]);

  // ── derived state ────────────────────────────────────────────────────────
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );
  const filteredBookings = useMemo(
    () => filterBookings(bookings, activeFilter),
    [bookings, activeFilter],
  );

  const metrics = useMemo(
    () => ({
      total: bookings.length,
      upcoming: bookings.filter(
        (b) => !isCanceledBooking(b) && isActiveBooking(b),
      ).length,
      canceled: bookings.filter(isCanceledBooking).length,
      completed: bookings.filter((b) => b.status === "COMPLETED").length,
    }),
    [bookings],
  );

  const upcomingTrips = useMemo(
    () =>
      bookings
        .filter((b) => !isCanceledBooking(b) && isActiveBooking(b))
        .slice(0, 3),
    [bookings],
  );

  // ── actions ──────────────────────────────────────────────────────────────
  const goToSearch = () => {
    const p = new URLSearchParams();
    if (searchFrom.trim()) p.set("from", searchFrom.trim());
    if (searchTo.trim()) p.set("to", searchTo.trim());
    if (searchDate) p.set("date", searchDate);
    navigate(`/commuter/search${p.toString() ? `?${p}` : ""}`);
  };

  const handleTrackBus = (booking: BookingRecord) =>
    navigate(`/track-bus/${booking.id}`, { state: { booking } });

  const handleCancelBooking = async (booking: BookingRecord) => {
    if (!accessToken) {
      pushAlert("error", "You are not authenticated.");
      return;
    }
    if (!isCancelable(booking)) {
      pushAlert(
        "error",
        "This booking can no longer be cancelled (less than 15 min to departure).",
      );
      return;
    }
    if (!window.confirm("Cancel this booking?")) return;
    setCancelingId(booking.id);
    try {
      const r = await fetch(`/api/tickets/${booking.id}/cancel`, {
        method: "PATCH",
        headers: authHeaders(accessToken, true),
      });
      const p = await parseMaybeJson(r);
      if (!r.ok)
        throw new Error(p?.message || p?.error || "Failed to cancel booking.");
      setBookings((c) =>
        c.map((b) =>
          b.id === booking.id ||
          b.id === p?.ticket?.id ||
          b.bookingRef === booking.bookingRef
            ? { ...b, status: p?.ticket?.status || "CANCELLED" }
            : b,
        ),
      );
      await loadBookings();
      pushAlert("success", "Booking cancelled successfully.");
    } catch (err: any) {
      pushAlert("error", err?.message || "Failed to cancel booking.");
    } finally {
      setCancelingId(null);
    }
  };

  // ── nav items ─────────────────────────────────────────────────────────────
  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: "search",
      label: "Search trips",
      icon: <Search className="w-4 h-4" />,
    },
    {
      id: "tickets",
      label: "My tickets",
      icon: <Ticket className="w-4 h-4" />,
      badge: metrics.upcoming,
    },
    { id: "live", label: "Live trips", icon: <MapPin className="w-4 h-4" /> },
    {
      id: "saved",
      label: "Saved routes",
      icon: <Bookmark className="w-4 h-4" />,
    },
    {
      id: "payments",
      label: "Payment history",
      icon: <CreditCard className="w-4 h-4" />,
      section: "Account",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      badge: unreadCount,
    },
    {
      id: "help",
      label: "Help center",
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    if (id === "search") navigate("/commuter/search");
    if (id === "tickets")
      document
        .getElementById("bookings-panel")
        ?.scrollIntoView({ behavior: "smooth" });
    if (id === "live")
      document
        .getElementById("track-panel")
        ?.scrollIntoView({ behavior: "smooth" });
  };

  // ── sidebar ────────────────────────────────────────────────────────────
  const SidebarContent = () => {
    let lastSection = "";
    return (
      <div className="flex flex-col h-full">
        {/* logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 rounded-xl bg-sky-600 flex items-center justify-center">
            <Bus className="w-4 h-4 text-white" />
          </div>
          <span className="font-montserrat font-bold text-gray-900">
            Safari<span className="text-sky-600">Tix</span>
          </span>
        </div>

        {/* nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const showSection = item.section && item.section !== lastSection;
            if (item.section) lastSection = item.section;
            return (
              <React.Fragment key={item.id}>
                {showSection && (
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pt-4 pb-1">
                    {item.section}
                  </p>
                )}
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    activeSection === item.id
                      ? "bg-sky-600 text-white shadow-[0_4px_14px_rgba(0,119,182,0.3)]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge ? (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        activeSection === item.id
                          ? "bg-white/25 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* user footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <Avatar name={userName} size={34} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-400">Commuter</p>
            </div>
            <button
              onClick={signOut}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-inter flex">
      {/* ── desktop sidebar ─────────────────────────────────────── */}
      <aside className="hidden lg:flex w-60 xl:w-64 flex-col border-r border-gray-200 bg-white flex-shrink-0 sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* ── mobile sidebar overlay ──────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative z-50 w-64 h-full bg-white shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── page ────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 h-14 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* search */}
          <div className="flex-1 max-w-xs hidden sm:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 h-9">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search trips, tickets…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
              aria-label="Quick search"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={refreshDashboard}
              disabled={refreshing}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("notifications-panel")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ""}`}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </button>
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <div className="ml-1">
              <Avatar name={userName} size={34} />
            </div>
          </div>
        </header>

        {/* main scroll area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
            {/* alerts */}
            {alerts.length > 0 && (
              <div className="space-y-2">
                {alerts.map((a) => (
                  <AlertBanner key={a.id} alert={a} onDismiss={dismissAlert} />
                ))}
              </div>
            )}

            {/* ── HERO ──────────────────────────────────────────── */}
            <section
              className="rounded-3xl p-7 md:p-9 text-white relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #0077B6 0%, #005F8E 55%, #00436A 100%)",
              }}
            >
              {/* decorative circles */}
              <div className="pointer-events-none absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/5" />
              <div className="pointer-events-none absolute right-20 -bottom-14 w-40 h-40 rounded-full bg-amber-400/10" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-200 mb-2">
                    {today}
                  </p>
                  <h1 className="font-montserrat text-2xl md:text-3xl font-bold leading-tight">
                    {greeting()}, {userName.split(" ")[0]} 👋
                  </h1>
                  <p className="mt-2 text-sky-200 text-sm max-w-md">
                    {metrics.upcoming > 0
                      ? `You have ${metrics.upcoming} upcoming trip${metrics.upcoming > 1 ? "s" : ""}. Stay on track.`
                      : "No upcoming trips yet — book one to get started."}
                  </p>
                </div>
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => navigate("/commuter/search")}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/25 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Find a bus
                  </button>
                  <button
                    onClick={goToSearch}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-sm font-bold text-white hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/30"
                  >
                    <Ticket className="w-4 h-4" />
                    Book ticket
                  </button>
                </div>
              </div>
            </section>

            {/* ── STAT CARDS ────────────────────────────────────── */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={<Calendar className="w-5 h-5 text-sky-600" />}
                label="Upcoming trips"
                value={loadingBookings ? "…" : metrics.upcoming}
                trend={
                  metrics.upcoming > 0 ? `+${metrics.upcoming}` : undefined
                }
                barPct={Math.min(
                  (metrics.upcoming / Math.max(metrics.total, 1)) * 100,
                  100,
                )}
                barColor="#0077B6"
              />

              <StatCard
                icon={<Ticket className="w-5 h-5 text-amber-500" />}
                label="Active tickets"
                value={loadingBookings ? "…" : metrics.upcoming}
                trend="Active"
                barPct={60}
                barColor="#F4A261"
              />

              <StatCard
                icon={<Route className="w-5 h-5 text-emerald-600" />}
                label="Total trips"
                value={loadingBookings ? "…" : metrics.total}
                barPct={Math.min((metrics.total / 50) * 100, 100)}
                barColor="#27AE60"
              />
            </section>

            {/* ── SEARCH PANEL ──────────────────────────────────── */}
            <section className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
                Plan a trip
              </p>
              <h2 className="font-montserrat font-bold text-gray-900 text-lg mb-4">
                Find available buses
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  goToSearch();
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
              >
                {[
                  {
                    label: "From",
                    value: searchFrom,
                    onChange: setSearchFrom,
                    placeholder: "e.g. Kigali",
                    type: "text",
                  },
                  {
                    label: "To",
                    value: searchTo,
                    onChange: setSearchTo,
                    placeholder: "e.g. Musanze",
                    type: "text",
                  },
                  {
                    label: "Date",
                    value: searchDate,
                    onChange: setSearchDate,
                    placeholder: "",
                    type: "date",
                  },
                ].map(({ label, value, onChange, placeholder, type }) => (
                  <label key={label} className="block">
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">
                      {label}
                    </span>
                    <input
                      type={type}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      placeholder={placeholder}
                      className="w-full h-10 border border-gray-200 rounded-xl px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all bg-white"
                    />
                  </label>
                ))}
                <button
                  type="submit"
                  className="h-10 flex items-center justify-center gap-2 bg-sky-600 text-white rounded-xl text-sm font-bold hover:bg-sky-700 transition-colors px-5 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  Search buses
                </button>
              </form>
            </section>

            {/* ── QUICK ACTIONS ─────────────────────────────────── */}
            <section>
              <h2 className="font-montserrat font-bold text-gray-900 text-sm mb-3">
                Quick actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <QuickActionCard
                  icon={<Bus className="w-5 h-5 text-sky-600" />}
                  iconBg="#E8F4FB"
                  label="Book ticket"
                  description="Choose route, seat & pay"
                  onClick={goToSearch}
                />
                <QuickActionCard
                  icon={<MapPin className="w-5 h-5 text-emerald-600" />}
                  iconBg="#E8F8F0"
                  label="Track bus"
                  description="Live location of your trip"
                  onClick={() =>
                    document
                      .getElementById("track-panel")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                />
                <QuickActionCard
                  icon={<Download className="w-5 h-5 text-amber-600" />}
                  iconBg="#FFF3E8"
                  label="Download ticket"
                  description="PDF boarding pass"
                />
                <QuickActionCard
                  icon={<History className="w-5 h-5 text-violet-600" />}
                  iconBg="#F0EEFF"
                  label="View history"
                  description="All past trips & receipts"
                  onClick={() => navigate("/commuter/bookings")}
                />
                <QuickActionCard
                  icon={<Headphones className="w-5 h-5 text-red-500" />}
                  iconBg="#FEE2E2"
                  label="Get support"
                  description="Chat or submit complaint"
                  onClick={() =>
                    document
                      .getElementById("complaints-panel")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                />
                <QuickActionCard
                  icon={<QrCode className="w-5 h-5 text-sky-600" />}
                  iconBg="#E8F4FB"
                  label="Scan QR"
                  description="Check in at boarding"
                />
              </div>
            </section>

            {/* ── UPCOMING TRIPS + ACTIVITY ──────────────────────── */}
            <section className="grid lg:grid-cols-2 gap-6">
              {/* upcoming trips */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat font-bold text-gray-900">
                    Upcoming trips
                  </h2>
                  <button
                    onClick={() =>
                      document
                        .getElementById("bookings-panel")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                {loadingBookings ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 text-sky-500 animate-spin" />
                  </div>
                ) : upcomingTrips.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-gray-200 py-10 px-4 text-center">
                    <Bus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-400">
                      No upcoming trips
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Book a ticket to see your trips here.
                    </p>
                    <button
                      onClick={goToSearch}
                      className="mt-4 px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors"
                    >
                      Book now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingTrips.map((b) => (
                      <TripCard
                        key={b.id}
                        booking={b}
                        onViewTicket={setTicketPreview}
                        onTrackBus={handleTrackBus}
                        onCancel={handleCancelBooking}
                        canceling={cancelingId === b.id}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* recent activity */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat font-bold text-gray-900">
                    Recent activity
                  </h2>
                  <button className="text-xs text-sky-600 font-semibold hover:underline flex items-center gap-1">
                    Full history <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <TimelineItem
                    icon={<Ticket className="w-3.5 h-3.5" />}
                    iconBg="#E8F4FB"
                    iconColor="#0077B6"
                    title="Ticket booked"
                    detail="Kigali → Musanze · RWF 3,500"
                    time="Today at 06:12"
                  />
                  <TimelineItem
                    icon={<CheckCircle className="w-3.5 h-3.5" />}
                    iconBg="#E8F8F0"
                    iconColor="#27AE60"
                    title="Payment confirmed"
                    detail="MoMo · RWF 3,500 · Ref #TXN29381"
                    time="Today at 06:12"
                  />
                  <TimelineItem
                    icon={<Bus className="w-3.5 h-3.5" />}
                    iconBg="#FFF3E8"
                    iconColor="#b36421"
                    title="Bus departed"
                    detail="Musanze → Rubavu · Yesterday"
                    time="Yesterday at 14:02"
                  />
                  <TimelineItem
                    icon={<XCircle className="w-3.5 h-3.5" />}
                    iconBg="#FEE2E2"
                    iconColor="#E63946"
                    title="Ticket cancelled"
                    detail="Kigali → Huye · Refund pending"
                    time="25 Jun at 09:45"
                    last
                  />
                </div>
              </div>
            </section>

            {/* ── NOTIFICATIONS ─────────────────────────────────── */}
            <section
              id="notifications-panel"
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-montserrat font-bold text-gray-900">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                      {unreadCount}
                    </span>
                  )}
                </h2>
                <button className="text-xs text-sky-600 font-semibold hover:underline">
                  Mark all read
                </button>
              </div>

              {loadingNotifications ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 py-8 text-center">
                  <Bell className="w-7 h-7 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">You're all caught up</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((n) => (
                    <NotifItem key={n.id} notif={n} />
                  ))}
                </div>
              )}
            </section>

            {/* ── ALL BOOKINGS ───────────────────────────────────── */}
            <section id="bookings-panel">
              {/* filter tabs */}
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                {(
                  ["all", "upcoming", "past", "canceled"] as BookingFilter[]
                ).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                      activeFilter === f
                        ? "bg-sky-600 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-700"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <BookingList
                bookings={filteredBookings}
                loading={loadingBookings}
                activeFilter={activeFilter}
                cancelingId={cancelingId}
                accessToken={accessToken}
                onFilterChange={setActiveFilter}
                onViewTicket={setTicketPreview}
                onCancelBooking={handleCancelBooking}
                onTrackBus={handleTrackBus}
              />
            </section>

            {/* ── BUS TRACKING ──────────────────────────────────── */}
            <section
              id="track-panel"
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-600 mb-1">
                    Live
                  </p>
                  <h2 className="font-montserrat font-bold text-gray-900">
                    Bus tracking
                  </h2>
                </div>
                {selectedTrackingBooking && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-700">
                    {selectedTrackingBooking.fromStop} →{" "}
                    {selectedTrackingBooking.toStop}
                  </span>
                )}
              </div>

              {selectedTrackingBooking ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Departure",
                        value: `${formatDate(selectedTrackingBooking.scheduleDate)} · ${formatTime(selectedTrackingBooking.departureTime)}`,
                      },
                      {
                        label: "Seat",
                        value: selectedTrackingBooking.seatNumber || "—",
                      },
                      {
                        label: "Reference",
                        value:
                          selectedTrackingBooking.bookingRef ||
                          selectedTrackingBooking.id,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-gray-50 rounded-xl px-3 py-2.5"
                      >
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <PassengerTracking
                    scheduleId={selectedTrackingBooking.scheduleId}
                    ticketId={selectedTrackingBooking.id}
                    routeFrom={selectedTrackingBooking.fromStop}
                    routeTo={selectedTrackingBooking.toStop}
                    departureTime={
                      selectedTrackingBooking.departureTime || undefined
                    }
                    autoStart
                  />
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 py-10 px-4 text-center">
                  <Navigation className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-400">
                    No active trip to track
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Book a ticket and tap <strong>Track bus</strong> to see live
                    location.
                  </p>
                </div>
              )}
            </section>

            {/* ── COMPLAINTS ────────────────────────────────────── */}
            <div id="complaints-panel">
              <ComplaintSection
                accessToken={accessToken}
                bookings={bookings.map((b) => ({
                  id: b.id,
                  scheduleId: b.scheduleId,
                  fromStop: b.fromStop,
                  toStop: b.toStop,
                  scheduleDate: b.scheduleDate,
                }))}
              />
            </div>
          </div>
        </main>
      </div>

      {/* ticket preview modal */}
      {ticketPreview && (
        <TicketPreviewModal
          booking={ticketPreview}
          onClose={() => setTicketPreview(null)}
        />
      )}
    </div>
  );
}
