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
    <div className="w-full mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex flex-nowrap items-center gap-2 overflow-x-auto">

        <div className="relative w-full sm:w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={query}
            onChange={handleInput}
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {filters.length > 0 && (
          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md bg-white"
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
            className="border border-gray-300 px-3 py-2 rounded-md bg-white"
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
            className="border border-gray-300 px-3 py-2 rounded-md bg-white"
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

      <div className="flex justify-end w-full sm:w-auto">
        {actions}
      </div>
    </div>
  );
};

export default ToolBar;
