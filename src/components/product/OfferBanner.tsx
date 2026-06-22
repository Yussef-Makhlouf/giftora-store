'use client'

import Link from 'next/link'
import { Product } from '@/types/product'
import { ShoppingBag, ChevronRight } from 'lucide-react'

interface OfferBannerProps {
  product: Product
  tag?: string
}

export default function OfferBanner({ product, tag = 'Complete the Set' }: OfferBannerProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white border border-border rounded-2xl overflow-hidden hover:border-dusty-rose/30 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex items-stretch">
        <div className="relative w-24 sm:w-28 md:w-32 overflow-hidden bg-sand flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </div>
        <div className="flex-1 flex items-center p-3 sm:p-4 md:p-5 min-w-0">
          <div className="flex-1 min-w-0">
            <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] bg-dusty-rose/10 text-dusty-rose rounded-full mb-1.5 sm:mb-2">
              {tag}
            </span>
            <h4 className="font-serif text-sm sm:text-base text-ink truncate group-hover:text-dusty-rose transition-colors">
              {product.title}
            </h4>
            <p className="text-xs text-text-muted mt-0.5 sm:mt-1 truncate">
              {product.category} &middot; {product.price} KD
            </p>
          </div>
          <div className="flex-shrink-0 ml-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-sand group-hover:bg-dusty-rose flex items-center justify-center text-text-secondary group-hover:text-white transition-all duration-300">
              <ShoppingBag size={13} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
