'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Menu, X, Search, Package, Heart } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/components/shared/Logo'

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?category=Gift Boxes', label: 'Gift Boxes' },
  { href: '/shop?category=Mugs', label: 'Mugs' },
  { href: '/shop?category=Notebooks', label: 'Notebooks' },
  { href: '/shop?category=Accessories', label: 'Accessories' },
]

export default function Navbar() {
  const { itemCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-sand-light/90 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Desktop left nav */}
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs lg:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              <Logo
                className="flex items-center gap-1.5 sm:gap-2"
                iconClassName="h-6 sm:h-7 md:h-8 w-auto text-ink"
                textClassName="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-ink tracking-tight"
              />
            </Link>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden lg:flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] font-medium"
                aria-label="Search"
              >
                <Search size={14} />
              </button>

              <Link
                href="/order-tracking"
                className="hidden lg:flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] font-medium"
                aria-label="Track Order"
              >
                <Package size={14} />
              </Link>

              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] font-medium"
              >
                <ShoppingBag size={16} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-ink text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
                <span className="hidden lg:inline">({itemCount})</span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center text-ink p-1.5"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Secondary desktop nav */}
        <div className="hidden lg:block border-t border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-center gap-6 lg:gap-10 py-2 sm:py-3">
              {navLinks.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[10px] lg:text-[11px] text-text-muted hover:text-text-secondary transition-colors uppercase tracking-[0.15em] font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <span className="text-[10px] lg:text-[11px] text-dusty-rose uppercase tracking-[0.15em] font-medium hidden sm:inline">
                Free shipping over 30 KD
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="hidden lg:block border-t border-border bg-white animate-fade-in-down">
            <div className="max-w-3xl mx-auto px-6 md:px-12 py-4 sm:py-6">
              <form onSubmit={handleSearch} className="relative">
                <Search size={16} className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search gifts, categories, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-4 bg-sand border border-border text-ink placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-lg sm:rounded-xl"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 bg-ink text-white text-[10px] sm:text-xs font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-lg"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-sand-light p-6 sm:p-8 pt-20 sm:pt-24 shadow-2xl animate-slide-in-right">
            <div className="flex items-center gap-2 mb-8 pb-6 border-b border-border">
              <Logo
                className="flex items-center gap-2"
                iconClassName="h-6 w-auto text-ink"
                textClassName="font-serif text-xl font-bold text-ink"
              />
            </div>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base sm:text-lg font-serif text-ink hover:bg-sand-dark/50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 mt-6 border-t border-border space-y-1">
                <form onSubmit={(e) => { e.preventDefault(); if (searchQuery.trim()) window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`; }} className="px-4 mb-4">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-sand border border-border text-ink placeholder:text-text-muted text-sm focus:outline-none focus:border-dusty-rose rounded-lg"
                    />
                  </div>
                </form>
                <Link
                  href="/order-tracking"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-text-secondary hover:text-ink transition-colors rounded-lg"
                >
                  <Package size={14} />
                  Track Order
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-text-secondary hover:text-ink transition-colors rounded-lg"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-text-secondary hover:text-ink transition-colors rounded-lg"
                >
                  Contact
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
