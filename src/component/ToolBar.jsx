import { useState } from "react";
import { Search, Filter, ArrowUpDown, SlidersHorizontal } from "lucide-react";

const ToolBar = ({
  searchValue,
  onSearchChange,
  status = [],
  selectedStatus,
  onStatusChange,
  category = [],
  selectedCategory,
  onCategoryChange,
  sortTypes = [],
  selectedSortType,
  onSortTypeChange,
  sortDirections = [],
  selectedSortDirection,
  onSortDirectionChange,
  actions,
}) => {
  const [query, setQuery] = useState(searchValue || "");
  const [open, setOpen] = useState(false);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearchChange && onSearchChange(val);
  };

  const baseSelect =
    "h-11 w-full px-4 text-sm rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer outline-none transition-all";

  return (
    <div className="w-full rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:flex-1">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={handleInput}
              type="text"
              placeholder="Search records"
              className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {actions && <div className="hidden shrink-0 lg:flex gap-2">{actions}</div>}
      </div>

      <div
        className={`
          mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4
          ${open ? "grid" : "hidden"} lg:grid
        `}
      >
        {status.length > 0 && (
          <div className="relative min-w-0">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value)}
              className={`${baseSelect} pl-9`}
            >
              <option value="">Status</option>
              {status.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {category.length > 0 && (
          <div className="relative min-w-0">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={`${baseSelect} pl-9`}
            >
              <option value="">Category</option>
              {category.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {sortTypes.length > 0 && (
          <div className="relative min-w-0">
            <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedSortType}
              onChange={(e) => onSortTypeChange(e.target.value)}
              className={`${baseSelect} pl-9`}
            >
              <option value="">Sort by</option>
              {sortTypes.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {sortDirections.length > 0 && (
          <select
            value={selectedSortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            className={baseSelect}
          >
            <option value="">Direction</option>
            {sortDirections.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        )}

        {actions && <div className="flex lg:hidden gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default ToolBar;
