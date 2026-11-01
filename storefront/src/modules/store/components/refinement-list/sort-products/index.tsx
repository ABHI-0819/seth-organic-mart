"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: SortOptions) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "Latest Arrivals",
  },
  {
    value: "price_asc",
    label: "Price: Low → High",
  },
  {
    value: "price_desc",
    label: "Price: High → Low",
  },
]

const SortProducts = ({
  "data-testid": dataTestId,
  sortBy,
  setQueryParams,
}: SortProductsProps) => {
  const handleChange = (value: SortOptions) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div className="w-full">
      {/* Mobile View: Clean Horizontal Pill Chips */}
      <div className="flex small:hidden items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 shrink-0 mr-1">
          Sort:
        </span>
        {sortOptions.map((option) => {
          const isActive = sortBy === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleChange(option.value as SortOptions)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border ${
                isActive
                  ? "bg-[#143625] text-white border-[#143625] shadow-xs"
                  : "bg-white text-stone-700 border-stone-300 hover:border-[#143625]"
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {/* Desktop View: Standard Sidebar Filter Radio Group */}
      <div className="hidden small:block">
        <FilterRadioGroup
          title="Sort by"
          items={sortOptions}
          value={sortBy}
          handleChange={handleChange}
          data-testid={dataTestId}
        />
      </div>
    </div>
  )
}

export default SortProducts
