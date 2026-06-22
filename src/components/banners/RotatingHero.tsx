'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { bannerImages } from '@/data/images'

const banners = [
  {
    tag: "New Collection",
    title: "Graduation\nCelebration",
    description: "Honor their achievement with our most requested gift box — thoughtfully curated for the milestone moment.",
    cta: "Discover the Box",
    href: "/product/graduation-gift-box",
    image: bannerImages.hero1,
    align: "left" as const,
  },
  {
    tag: "Best Seller",
    title: "Birthday\nJoy, Delivered",
    description: "Our signature celebration box, crafted to make every birthday unforgettable. Personalization included.",
    cta: "Explore Birthday",
    href: "/product/birthday-celebration-box",
    image: bannerImages.hero2,
    align: "right" as const,
  },
  {
    tag: "For Two",
    title: "Love in\na Box",
    description: "The couple's gift that says everything. Matching mugs, chocolates, and a love-letter kit — all in one.",
    cta: "See the Set",
    href: "/product/couple-gift-box",
    image: bannerImages.hero3,
    align: "left" as const,
  },
  {
    tag: "New Category",
    title: "Home &\nAmbiance",
    description: "Discover our new collection of candles, diffusers, and ceramic decor — crafted to elevate every space.",
    cta: "Explore Home Decor",
    href: "/shop?category=Home%20Decor",
    image: bannerImages.hero4,
    align: "right" as const,
  },
]

export default function RotatingHero() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % banners.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [current])

  const goTo = (index: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent(index)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const banner = banners[current]

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center bg-ink">
        <div className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: 1 }}
        >
          <img
            src={banner.image}
            alt=""
            className="w-full h-full object-cover opacity-50 sm:opacity-60 md:opacity-70 scale-105"
            style={{ animation: 'none' }}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${
            banner.align === 'right'
              ? 'from-ink via-ink/80 to-ink/40'
              : 'from-ink via-ink/80 to-ink/40'
          }`} />
        </div>

        <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 ${
          banner.align === 'right' ? 'md:text-right md:ml-auto' : 'md:text-left'
        }`}>
          <div className={`max-w-lg sm:max-w-xl ${banner.align === 'right' ? 'md:ml-auto' : ''}`}>
            <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-dusty-rose-light bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 animate-fade-in-down">
              {banner.tag}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-4 sm:mb-6 tracking-tight whitespace-pre-line animate-fade-in-up">
              {banner.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed mb-6 sm:mb-8 md:mb-10 max-w-md sm:max-w-lg animate-fade-in-up stagger-2">
              {banner.description}
            </p>
            <div className="animate-fade-in-up stagger-3">
              <Link href={banner.href} className="inline-flex items-center gap-2 sm:gap-3 group">
                <span className="relative px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-ink font-medium text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.15em] overflow-hidden transition-all duration-300 hover:bg-dusty-rose hover:text-white rounded-lg sm:rounded-xl">
                  {banner.cta}
                </span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-ink transition-all duration-300">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-sand-light to-transparent" />

        {/* Navigation Dots */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 sm:w-8 h-2 bg-dusty-rose'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow controls */}
        <button
          onClick={() => goTo((current - 1 + banners.length) % banners.length)}
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 transition-all z-20"
          aria-label="Previous"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={() => goTo((current + 1) % banners.length)}
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 transition-all z-20"
          aria-label="Next"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  )
}
