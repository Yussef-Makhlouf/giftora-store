import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-ink via-ink-light to-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span className="inline-flex px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] bg-bronze text-white rounded-full">
              Free Shipping
            </span>
            <p className="text-xs sm:text-sm text-white/80">
              Enjoy <span className="text-dusty-rose font-semibold">free shipping</span> on all orders over <span className="font-semibold">30 KD</span>
            </p>
          </div>
          <Link
            href="/shipping"
            className="group inline-flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-dusty-rose-light hover:text-white transition-colors whitespace-nowrap"
          >
            Details
            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
