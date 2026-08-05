import React from "react";

const routes = [
  "Nairobi → Mombasa",
  "Kigali → Musanze",
  "Kampala → Jinja",
  "Arusha → Dar es Salaam",
  "Kisumu → Nairobi",
  "Mombasa → Malindi",
];

export function RouteTicker() {
  return (
    <div className="overflow-hidden rounded-full border border-white/10 bg-white/5 py-3">
      <div className="flex whitespace-nowrap animate-[ticker_20s_linear_infinite] gap-12 px-6">
        {[...routes, ...routes].map((route, index) => (
          <span
            key={index}
            className="text-sm font-medium text-white/70"
          >
            🚌 {route}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default RouteTicker;