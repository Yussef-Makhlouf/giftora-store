import Link from 'next/link'
import { ArrowRight, Tag } from 'lucide-react'

interface SaleBannerProps {
  image?: string
  tag?: string
  title: string
  subtitle: string
  cta: string
  href: string
  gradient?: string
  compact?: boolean
}

export default function SaleBanner({
  image,
  tag = 'Limited Offer',
  title,
  subtitle,
  cta,
  href,
  gradient = 'from-ink/70 via-ink/40 to-transparent',
  compact = false,
}: SaleBannerProps) {
  return (
    <section className={`relative overflow-hidden rounded-2xl sm:rounded-3xl group ${compact ? 'h-48 sm:h-56' : 'h-56 sm:h-72'}`}>
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}`} />

      <div className="absolute inset-0 flex items-center">
        <div className="px-5 sm:px-8 md:px-10 w-full">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] bg-dusty-rose text-white rounded-full mb-3 sm:mb-4">
              <Tag size={10} />
              {tag}
            </span>
            <h3 className={`font-serif text-white leading-[1.1] mb-2 ${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
              {title}
            </h3>
            <p className={`text-white/60 leading-relaxed mb-4 sm:mb-5 ${compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
              {subtitle}
            </p>
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white hover:text-dusty-rose-light transition-colors group/link"
            >
              {cta}
              <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
