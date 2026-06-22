'use client'

interface CategoryFilterProps {
  categories: readonly string[]
  activeCategory: string | null
  onCategoryChange: (c: string | null) => void
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0 pb-1 sm:pb-0">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] rounded-full transition-all duration-200 whitespace-nowrap ${
          activeCategory === null
            ? 'bg-ink text-white'
            : 'bg-sand text-text-secondary hover:text-ink border border-border'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] rounded-full transition-all duration-200 whitespace-nowrap ${
            activeCategory === cat
              ? 'bg-ink text-white'
              : 'bg-sand text-text-secondary hover:text-ink border border-border'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
