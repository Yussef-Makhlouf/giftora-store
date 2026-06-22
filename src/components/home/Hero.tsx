'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-white overflow-hidden py-24 md:py-36">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #2C2420 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          <div className="inline-flex items-center px-4 py-1.5 bg-accent/20 rounded-full mb-6">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              New Collection Available
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 leading-[1.1] tracking-tight">
            Thoughtfully Curated
            <span className="block text-primary"> Gifts for Every Occasion</span>
          </h1>

          <p className="text-lg md:text-xl text-muted mb-10 leading-relaxed max-w-2xl">
            Discover personalized gift boxes, custom mugs, and unique accessories
            that celebrate life's special moments
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/shop?category=Gift Boxes"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Shop Gift Boxes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-dark border-2 border-primary/20 hover:border-primary bg-white hover:bg-primary/5 rounded-xl transition-all duration-200"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
