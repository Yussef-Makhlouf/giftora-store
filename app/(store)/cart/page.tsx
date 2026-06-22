'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Shield, Truck, ArrowRight, Gift } from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-sand-light">
        <div className="text-center max-w-md px-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-dusty-rose/20 to-bronze/20 flex items-center justify-center mx-auto mb-6 animate-float">
            <Gift size={32} className="text-dusty-rose" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ink mb-3">Your Cart is Empty</h1>
          <p className="text-text-secondary text-sm mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything yet. Explore our collection and find the perfect gift!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const shipping = total >= 30 ? 0 : 2

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Your Cart
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mt-1">
                Shopping Cart
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item, index) => (
              <div
                key={item.product.id}
                className="bg-white border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover-lift transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-3 sm:gap-4 md:gap-5">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden bg-sand rounded-lg sm:rounded-xl flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1 sm:mb-2">
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.15em] text-bronze mb-0.5">
                          {item.product.category}
                        </p>
                        <h3 className="font-serif text-sm sm:text-base text-ink">
                          {item.product.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 hover:bg-red-50 transition-colors group rounded-lg flex-shrink-0"
                        aria-label="Remove"
                      >
                        <Trash2 size={14} className="text-text-muted group-hover:text-error transition-colors" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-5">
                      <div className="flex items-center border border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 sm:p-2 hover:bg-sand transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-8 sm:w-10 text-center text-xs sm:text-sm font-medium text-ink">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 sm:p-2 hover:bg-sand transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="font-medium text-ink text-base sm:text-lg">
                        {item.product.price * item.quantity} <span className="text-[10px] sm:text-xs text-text-muted">KD</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 card-shadow sticky top-28">
              <h3 className="font-serif text-lg sm:text-xl text-ink mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
                Order Summary
              </h3>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal ({itemCount} items)</span>
                  <span className="text-ink font-medium">{total} KD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? 'text-success' : 'text-ink'}`}>
                    {shipping === 0 ? 'Free' : `${shipping} KD`}
                  </span>
                </div>
                <div className="pt-2 sm:pt-3 border-t border-border flex justify-between items-end">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-serif text-xl sm:text-2xl text-ink">
                    {total + shipping} KD
                  </span>
                </div>
              </div>

              {total < 30 && (
                <div className="bg-sand rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-[11px] sm:text-xs text-text-secondary text-center mb-2">
                    Add <span className="text-bronze font-medium">{30 - total} KD</span> more for free shipping
                  </p>
                  <div className="w-full bg-sand-dark h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-bronze rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (total / 30) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <Link
                href="/checkout"
                className="block w-full text-center py-3 sm:py-4 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-lg sm:rounded-xl"
              >
                Proceed to Checkout
                <ArrowRight size={14} className="inline ml-2" />
              </Link>

              <Link
                href="/shop"
                className="block w-full text-center py-2.5 sm:py-3 mt-2 sm:mt-3 text-[11px] sm:text-xs text-text-secondary hover:text-ink uppercase tracking-[0.1em] transition-colors"
              >
                Continue Shopping
              </Link>

              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-text-muted">
                  <Shield size={12} />
                  <span>Secure checkout &middot; SSL encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-text-muted">
                  <Truck size={12} />
                  <span>Free shipping over 30 KD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
