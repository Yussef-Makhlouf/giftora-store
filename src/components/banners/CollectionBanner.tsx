'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CollectionBannerProps {
  tag?: string
  title: string
  subtitle: string
  cta: string
  href: string
  image: string
  gradient?: string
}

export default function CollectionBanner({
  tag,
  title,
  subtitle,
  cta,
  href,
  image,
  gradient = 'from-ink/60 via-ink/40 to-transparent',
}: CollectionBannerProps) {
  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden group">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full">
          <div className="max-w-md sm:max-w-lg">
            {tag && (
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-dusty-rose-light bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 animate-fade-in-down">
                {tag}
              </span>
            )}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-3 sm:mb-4 whitespace-pre-line animate-fade-in-up">
              {title}
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-md mb-6 sm:mb-8 md:mb-10 leading-relaxed animate-fade-in-up stagger-2">
              {subtitle}
            </p>
            <div className="animate-fade-in-up stagger-3">
              <Link href={href} className="group inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium uppercase tracking-[0.15em]">
                <span className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-ink hover:bg-dusty-rose hover:text-white transition-all duration-300 rounded-lg sm:rounded-xl">
                  {cta}
                </span>
                <span className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-ink transition-all duration-300">
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
