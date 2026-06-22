'use client'

import Link from 'next/link'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { Product } from '@/types/product'
import { useCart } from '@/lib/cart-context'

interface ProductCardProps {
  product: Product
}

const badgeColors: Record<string, string> = {
  'Best Seller': 'bg-ink text-white',
  'Popular': 'bg-bronze text-white',
  'New': 'bg-dusty-rose text-white',
  'Limited Edition': 'bg-ink text-white border border-dusty-rose/30',
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand mb-3 sm:mb-4 md:mb-5 rounded-xl sm:rounded-2xl card-shadow card-shadow-hover">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 sm:top-3 md:top-4 left-2.5 sm:left-3 md:left-4 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] rounded-lg ${
                badgeColors[product.badge] || 'bg-ink text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.newArrival && !product.badge && (
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] rounded-lg bg-success text-white">
              New
            </span>
          )}
        </div>

        {product.personalizationAvailable && (
          <div className="absolute top-2.5 sm:top-3 md:top-4 right-2.5 sm:right-3 md:right-4">
            <span className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] bg-white/90 backdrop-blur-sm text-bronze rounded-lg shadow-sm">
              <Sparkles size={8} />
              Customize
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <button
          onClick={handleAdd}
          className="absolute bottom-2.5 sm:bottom-3 md:bottom-4 right-2.5 sm:right-3 md:right-4 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:bg-ink hover:text-white hover:scale-105"
          aria-label="Add to cart"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      <div className="space-y-1 sm:space-y-1.5">
        <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-text-muted">
          {product.category}
        </p>
        <h3 className="font-serif text-sm sm:text-base md:text-lg text-ink group-hover:text-dusty-rose transition-colors leading-tight">
          {product.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-muted line-clamp-1 leading-relaxed">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <span className="font-medium text-ink text-sm sm:text-base md:text-lg">
            {product.price} <span className="text-[10px] sm:text-xs text-text-muted">KD</span>
          </span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-error font-medium">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
