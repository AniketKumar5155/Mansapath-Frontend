import { useState } from "react";
import { Search } from "lucide-react";

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

  return (
    <div className="w-full mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl bg-white shadow-lg border border-gray-200">

      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar">

        <div className="relative min-w-60">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={query}
            onChange={handleInput}
            type="text"
            placeholder="Search..."
            className="
              pl-11 pr-4 py-2.5 w-full
              bg-gray-50
              border border-gray-300
              rounded-full text-sm
              outline-none transition
            "
          />
        </div>

        {filters.length > 0 && (
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="
              px-4 py-2.5 text-sm rounded-full
              bg-gray-50
              border border-gray-300
              hover:border-gray-400
              cursor-pointer
              outline-none transition
            "
          >
            <option value="">Filter</option>
            {filters.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        )}

        {sortTypes.length > 0 && (
          <select
            value={selectedSortType}
            onChange={(e) => onSortTypeChange(e.target.value)}
            className="
              px-4 py-2.5 text-sm rounded-full
              bg-gray-50
              border border-gray-300
              hover:border-gray-400
              cursor-pointer
              outline-none transition
            "
          >
            <option value="">Sort By</option>
            {sortTypes.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        )}

        {sortDirections.length > 0 && (
          <select
            value={selectedSortDirection}
            onChange={(e) => onSortDirectionChange(e.target.value)}
            className="
              px-4 py-2.5 text-sm rounded-full
              bg-gray-50
              border border-gray-300
              hover:border-gray-400
              cursor-pointer
              outline-none transition
            "
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

      {actions && (
        <div className="flex justify-end gap-2">
          {actions}
        </div>
      )}
    </div>
  );
};

export default ToolBar;
