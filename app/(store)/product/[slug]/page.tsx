'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import { products, getRelatedProducts } from '@/data/products'
import { useCart } from '@/lib/cart-context'
import ProductCard from '@/components/product/ProductCard'
import OfferBanner from '@/components/product/OfferBanner'
import { Minus, Plus, ShoppingBag, Heart, ChevronRight, Star, Shield, Truck, RotateCcw, Check, Share2, ZoomIn } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [personalization, setPersonalization] = useState('')
  const [added, setAdded] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.id, product.category, 4)
  const otherOffers = products.filter((p) => p.id !== product.id && p.featured).slice(0, 2)
  const inStock = product.stock > 0
  const lowStock = product.stock > 0 && product.stock <= 10

  const productImages = product.images || [product.image]

  const complementaryProduct = product.category === 'Gift Boxes'
    ? products.find((p) => p.id === 'mg-001')
    : product.category === 'Mugs'
    ? products.find((p) => p.id === 'nb-001')
    : products.find((p) => p.id === 'gb-001')

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const benefits = [
    { icon: Truck, text: 'Free shipping over 30 KD' },
    { icon: RotateCcw, text: 'Easy returns within 7 days' },
    { icon: Shield, text: 'Secure checkout' },
  ]

  return (
    <div className="bg-sand-light">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-text-muted overflow-x-auto scrollbar-none whitespace-nowrap">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-ink transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-text-secondary truncate max-w-[120px] sm:max-w-[200px]">{product.title}</span>
        </div>
      </div>

      {/* Product */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-12 sm:pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand rounded-xl sm:rounded-2xl group cursor-zoom-in"
              onClick={() => setZoomed(!zoomed)}
            >
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className={`w-full h-full object-cover transition-all duration-700 ${zoomed ? 'scale-150' : 'group-hover:scale-105'}`}
              />
              {product.badge && (
                <span className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-5 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 bg-ink text-white text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] rounded-lg">
                  {product.badge}
                </span>
              )}
              {lowStock && (
                <span className="absolute top-3 sm:top-4 md:top-5 right-3 sm:right-4 md:right-5 px-2 sm:px-3 py-1 sm:py-1.5 bg-error text-white text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.1em] rounded-lg">
                  Only {product.stock} left
                </span>
              )}
              <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 right-3 sm:right-4 md:right-5 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setZoomed(!zoomed); }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-ink hover:text-white"
                  aria-label="Zoom"
                >
                  <ZoomIn size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:bg-ink hover:text-white"
                  aria-label="Share"
                >
                  <Share2 size={12} />
                </button>
              </div>
            </div>
            {/* Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-none pb-1">
                {productImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedImage(i); setZoomed(false); }}
                    className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-sand border-2 transition-all ${
                      i === selectedImage ? 'border-dusty-rose shadow-md shadow-dusty-rose/20' : 'border-border hover:border-dusty-rose/50'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col pt-0 md:pt-6">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
              <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                {product.category}
              </p>
              {product.personalizationAvailable && (
                <span className="px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] bg-bronze/10 text-bronze rounded-full">
                  Personalizable
                </span>
              )}
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mb-3 sm:mb-4 leading-[1.1]">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={12} className="fill-bronze text-bronze" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-text-muted">(24 reviews)</span>
            </div>

            <p className="text-2xl sm:text-3xl font-medium text-ink mb-4 sm:mb-6">
              {product.price} <span className="text-sm sm:text-base text-text-muted font-normal">KD</span>
            </p>

            <div className="w-12 sm:w-14 h-[2px] bg-dusty-rose mb-4 sm:mb-6" />

            <p className="text-text-secondary leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm">
              {product.longDescription}
            </p>

            {/* Personalization */}
            {product.personalizationAvailable && (
              <div className="bg-sand border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8">
                <label className="block font-medium text-xs sm:text-sm text-ink mb-1">
                  Personalization
                </label>
                <p className="text-[11px] sm:text-xs text-text-muted mb-2 sm:mb-3">
                  Add a name, date, or short message (max 50 characters)
                </p>
                <input
                  type="text"
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  maxLength={50}
                  placeholder="Enter your text..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-border text-ink placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-lg sm:rounded-xl"
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[11px] sm:text-xs text-text-muted">{personalization.length}/50</span>
                  <span className="text-[9px] sm:text-[10px] text-success font-medium">Free engraving</span>
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.1em] text-text-secondary font-medium">
                Qty
              </span>
              <div className="flex items-center border border-border bg-white rounded-lg sm:rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2 sm:p-3 hover:bg-sand transition-colors"
                  aria-label="Decrease"
                >
                  <Minus size={12} />
                </button>
                <span className="w-8 sm:w-12 text-center text-xs sm:text-sm font-medium text-ink">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="p-2 sm:p-3 hover:bg-sand transition-colors"
                  aria-label="Increase"
                >
                  <Plus size={12} />
                </button>
              </div>
              <span className={`text-[10px] sm:text-xs font-medium ${inStock ? 'text-success' : 'text-error'}`}>
                {inStock ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={handleAdd}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.1em] transition-all duration-200 rounded-lg sm:rounded-xl ${
                  added
                    ? 'bg-success text-white'
                    : 'bg-ink text-white hover:bg-ink-light'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {added ? (
                  <><Check size={14} /> Added!</>
                ) : (
                  <><ShoppingBag size={14} /> Add to Cart</>
                )}
              </button>
              <button className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 border border-border flex items-center justify-center text-text-secondary hover:text-dusty-rose hover:border-dusty-rose transition-all rounded-lg sm:rounded-xl" aria-label="Wishlist">
                <Heart size={14} />
              </button>
            </div>

            {/* Benefits */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border space-y-2 sm:space-y-3">
              {benefits.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.text} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary">
                    <Icon size={12} className="text-dusty-rose flex-shrink-0" />
                    <span>{b.text}</span>
                  </div>
                )
              })}
            </div>

            {/* Complementary Bundle Offer Banner */}
            {complementaryProduct && (
              <div className="mt-6 sm:mt-8 p-4 bg-bronze/5 border border-bronze/10 rounded-xl sm:rounded-2xl animate-fade-in-up">
                <div className="flex gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-sand border border-border flex-shrink-0">
                    <img src={complementaryProduct.image} alt={complementaryProduct.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em] bg-bronze/10 text-bronze rounded-full mb-1">
                      Perfect Match Offer
                    </span>
                    <h4 className="font-serif text-sm sm:text-base text-ink font-semibold truncate">
                      Add {complementaryProduct.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-text-secondary mt-0.5 line-clamp-2">
                      Pair this with the {complementaryProduct.title.toLowerCase()} and save 10% on your bundle! Use code <strong className="text-bronze font-semibold">BUNDLE10</strong> at checkout.
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-ink">
                        {complementaryProduct.price} KD
                      </span>
                      <Link 
                        href={`/product/${complementaryProduct.slug}`}
                        className="text-[10px] sm:text-xs text-bronze hover:text-bronze-dark uppercase tracking-[0.1em] font-semibold flex items-center gap-1 transition-colors"
                      >
                        View Gift Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Offer banners — other products you might like */}
      {otherOffers.length > 0 && (
        <section className="bg-white border-y border-border py-8 sm:py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink mb-1 sm:mb-2">You May Also Like</h2>
              <p className="text-text-secondary text-xs sm:text-sm">Special offers on these popular gifts</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
              {otherOffers.map((p) => (
                <OfferBanner key={p.id} product={p} tag={p.badge === 'Best Seller' ? 'Best Seller' : 'Popular Choice'} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-ink mb-1 sm:mb-2">Complete Your Gift</h2>
              <p className="text-text-secondary text-xs sm:text-sm">Customers who viewed this also liked</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
