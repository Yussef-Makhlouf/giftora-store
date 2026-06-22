'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CategoryBannerProps {
  title: string
  description: string
  cta: string
  href: string
  image: string
  reversed?: boolean
}

export default function CategoryBanner({
  title,
  description,
  cta,
  href,
  image,
  reversed = false,
}: CategoryBannerProps) {
  return (
    <section className="bg-sand-light">
      <div className="max-w-7xl mx-auto">
        <div className={`grid md:grid-cols-2 ${reversed ? 'md:grid-flow-dense' : ''}`}>
          <div
            className={`relative h-48 sm:h-64 md:h-[70vh] overflow-hidden group ${
              reversed ? 'md:col-start-2' : ''
            }`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-500" />
          </div>

          <div className="flex items-center px-6 sm:px-8 md:px-16 py-10 sm:py-12 md:py-24">
            <div className="max-w-md animate-fade-in-up">
              <div className="w-10 sm:w-14 h-[2px] bg-bronze mb-5 sm:mb-8" />
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mb-4 sm:mb-6 leading-[1.1] whitespace-pre-line">
                {title}
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 md:mb-10">
                {description}
              </p>
              <Link
                href={href}
                className="group inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-ink hover:text-bronze transition-colors"
              >
                <span className="relative">
                  {cta}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-bronze group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
