'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { products, categories } from '@/data/products'
import { bannerImages } from '@/data/images'
import ProductGrid from '@/components/shop/ProductGrid'
import CategoryFilter from '@/components/shop/CategoryFilter'
import SaleBanner from '@/components/banners/SaleBanner'
import { Search, SlidersHorizontal, X, ArrowDownUp, Grid3X3, List, Sparkles } from 'lucide-react'
import Link from 'next/link'

function ShopContent() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    if (category) setActiveCategory(category)
    if (search) setSearchQuery(search)
  }, [searchParams])

  let filtered = products.filter((p) => {
    const matchCategory = !activeCategory || p.category === activeCategory
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  if (sortBy === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sortBy === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sortBy === 'name') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))

  const midPoint = Math.ceil(filtered.length / 2)

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-ink to-ink-light py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dusty-rose/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">
              <Sparkles size={12} /> The Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mt-2 sm:mt-3 mb-3 sm:mb-4 leading-[1.1]">
              {activeCategory || 'Our Complete Edit'}
            </h1>
            <p className="text-white/50 text-xs sm:text-sm md:text-base max-w-lg">
              {activeCategory
                ? `Browse our curated selection of ${activeCategory.toLowerCase()} — each item chosen with intention.`
                : 'Every gift, thoughtfully curated. Browse our full collection of gift boxes, mugs, notebooks, accessories, home decor, and stationery.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-[64px] sm:top-[80px] lg:top-[121px] z-30 bg-white/95 backdrop-blur-md border-b border-border card-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="w-full sm:w-auto overflow-x-auto scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {/* View toggle */}
              <div className="hidden sm:flex items-center border border-border rounded-full overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-ink text-white' : 'text-text-secondary hover:text-ink'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={13} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-ink text-white' : 'text-text-secondary hover:text-ink'}`}
                  aria-label="List view"
                >
                  <List size={13} />
                </button>
              </div>

              {/* Sort */}
              <div className="relative flex-1 sm:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none w-full sm:w-auto px-3 sm:px-4 py-2 pr-7 sm:pr-8 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] text-text-secondary hover:text-ink border border-border hover:border-ink/20 rounded-full transition-all bg-transparent cursor-pointer outline-none"
                >
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
                <ArrowDownUp size={11} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] text-text-secondary hover:text-ink border border-border hover:border-ink/20 rounded-full transition-all whitespace-nowrap"
              >
                <Search size={13} />
                <span className="hidden xs:inline">Search</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 sm:mt-4 animate-fade-in-down">
              <div className="relative max-w-md">
                <Search
                  size={15}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Search products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 bg-sand border border-border text-ink placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-lg sm:rounded-xl"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-ink"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm text-text-secondary">
            <span className="text-ink font-medium">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
            {activeCategory && <span className="text-text-muted"> in {activeCategory}</span>}
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-[10px] sm:text-xs text-text-muted hover:text-ink uppercase tracking-[0.1em] transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-24 animate-fade-in-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-text-muted" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-ink mb-2">No products found</h3>
            <p className="text-text-secondary text-xs sm:text-sm mb-6 max-w-sm mx-auto">
              {searchQuery
                ? `We couldn't find anything matching "${searchQuery}". Try a different search or category.`
                : 'Try adjusting your filters to discover more.'}
            </p>
            <button
              onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-lg sm:rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* First half of products */}
            <ProductGrid products={filtered.slice(0, midPoint)} viewMode={viewMode} />

            {/* Sale Banner between product rows */}
            {filtered.length > 2 && (
              <div className="my-8 sm:my-10 md:my-12">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <SaleBanner
                    image={bannerImages.offerBundle}
                    tag="Bundle & Save"
                    title="Get 15% Off Bundles"
                    subtitle="Mix and match any 3 items to unlock an exclusive discount. Perfect for multiple occasions."
                    cta="Shop Bundles"
                    href="/shop"
                    compact
                  />
                  <SaleBanner
                    image={bannerImages.saleSummer}
                    tag="Summer Special"
                    title="Free Engraving on All Mugs"
                    subtitle="Personalized mugs with custom engraving — no extra charge for a limited time."
                    cta="Personalize Now"
                    href="/product/personalized-mug"
                    compact
                  />
                </div>
              </div>
            )}

            {/* Second half of products */}
            <ProductGrid products={filtered.slice(midPoint)} viewMode={viewMode} />
          </>
        )}

        {/* Corporate Concierge Banner */}
        <div className="mt-12 sm:mt-16 md:mt-20 animate-fade-in-up">
          <SaleBanner
            image={bannerImages.corporate}
            tag="Corporate & Event Gifting"
            title="Thoughtful Gifting at Scale"
            subtitle="Need custom branding, bulk orders, or curated corporate gifts? Our team designs bespoke solutions tailored to your brand's unique needs and budget."
            cta="Consult Our Experts"
            href="/contact"
          />
        </div>
      </section>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sand-light flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-dusty-rose border-t-transparent rounded-full animate-spin mx-auto mb-3 sm:mb-4" />
            <p className="text-text-muted text-xs sm:text-sm">Loading collection...</p>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  )
}
