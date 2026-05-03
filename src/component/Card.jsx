import React from "react";

const Card = ({
  label,
  value,
  icon,
  onClick,
  className,
  subtitle,
  accent = "blue",
}) => {
  const accents = {
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    amber: "bg-amber-50 text-amber-700 ring-amber-100",
    red: "bg-rose-50 text-rose-700 ring-rose-100",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-100",
  };

  return (
    <div
      className={`
        group w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm
        transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md
        ${onClick ? "cursor-pointer" : ""}
        ${className || ""}
      `}
      onClick={onClick}
    >
      <div className="flex min-h-[92px] items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <div className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {value}
          </div>
          {subtitle && (
            <p className="mt-2 text-sm leading-5 text-slate-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 ${
              accents[accent] || accents.blue
            }`}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
