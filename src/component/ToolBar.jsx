import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const ToolBar = ({
  searchValue,
  onSearchChange,
  filters = [],
  selectedFilter,
  onFilterChange,
  sortTypes = [],
  selectedSortType,
  onSortTypeChange,
  sortDirections = [],
  selectedSortDirection,
  onSortDirectionChange,
  actions,
}) => {
  const [query, setQuery] = useState(searchValue || "");

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearchChange && onSearchChange(val);
  };

  const baseSelect = `
    h-10 px-4 text-sm rounded-xl
    bg-white
    border border-gray-300
    hover:border-gray-400
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
    cursor-pointer outline-none transition-all
  `;

  return (
    <div className="w-full mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-5 rounded-2xl bg-white shadow-md border border-gray-200">

      {/* Left section */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={handleInput}
            type="text"
            placeholder="Search records"
            className="
              h-10 w-full pl-11 pr-4 text-sm
              rounded-xl bg-gray-50
              border border-gray-300
              focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
              outline-none transition-all
            "
          />
        </div>

        {/* Filter */}
        {filters.length > 0 && (
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className={`${baseSelect} pl-9`}
            >
              <option value="">Filter</option>
              {filters.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort type */}
        {sortTypes.length > 0 && (
          <div className="relative">
            <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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

        {/* Sort direction */}
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
      </div>

      {/* Actions */}
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ToolBar;
