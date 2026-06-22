'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { CheckoutForm } from '@/components/checkout/CheckoutForm'
import { OrderProgress, OrderStep } from '@/components/checkout/OrderProgress'
import { CheckCircle, Package, ArrowLeft } from 'lucide-react'
import { PaymentLogos } from '@/components/checkout/PaymentLogos'

export default function CheckoutPage() {
  const { items, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = () => {
    clearCart()
    setOrderPlaced(true)
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-sand-light px-4">
        <div className="text-center max-w-md w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <Package size={24} className="text-text-muted" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink mb-3">Nothing to Checkout</h1>
          <p className="text-text-secondary text-sm mb-6 sm:mb-8 leading-relaxed px-4">
            Your cart is empty. Add some items and come back!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl"
          >
            <ArrowLeft size={14} />
            Shop Now
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-sand-light overflow-x-hidden">
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-scale-in">
              <CheckCircle size={28} className="text-success" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-3 sm:mb-4 animate-fade-in-up">
              Order Confirmed!
            </h1>
            <p className="text-text-secondary text-base sm:text-lg animate-fade-in-up stagger-2 px-4">
              Thank you for your order. We&apos;ll start preparing it right away.
            </p>
          </div>

          <div className="animate-fade-in-up stagger-3">
            <OrderProgress
              currentStatus="confirmed"
              orderId="ORD-1049"
              estimatedDelivery="Jun 24, 2026"
            />
          </div>

          <div className="mt-6 sm:mt-8 bg-white border border-border rounded-2xl p-4 sm:p-6 card-shadow animate-fade-in-up stagger-4">
            <h3 className="font-medium text-ink text-sm mb-3">What happens next?</h3>
            <ol className="space-y-2.5 sm:space-y-3 text-sm text-text-secondary">
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-sand-dark flex items-center justify-center text-[10px] font-bold text-ink flex-shrink-0 mt-0.5">1</span>
                <span>We&apos;ll confirm your order within 30 minutes via email and SMS</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-sand-dark flex items-center justify-center text-[10px] font-bold text-ink flex-shrink-0 mt-0.5">2</span>
                <span>Your items will be carefully packed and prepared for delivery</span>
              </li>
              <li className="flex items-start gap-2.5 sm:gap-3">
                <span className="w-5 h-5 rounded-full bg-sand-dark flex items-center justify-center text-[10px] font-bold text-ink flex-shrink-0 mt-0.5">3</span>
                <span>You&apos;ll receive a tracking link once your order is on its way</span>
              </li>
            </ol>
          </div>

          <div className="mt-6 sm:mt-8 text-center animate-fade-in-up stagger-5">
            <PaymentLogos />
          </div>

          <div className="mt-8 sm:mt-10 text-center animate-fade-in-up stagger-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-light overflow-x-hidden">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-14">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Secure Checkout
              </p>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mt-1 truncate">
                Complete Your Order
              </h1>
            </div>
            <Link
              href="/cart"
              className="hidden md:flex items-center gap-2 text-xs text-text-secondary hover:text-ink uppercase tracking-[0.1em] transition-colors font-medium flex-shrink-0 ml-4"
            >
              <ArrowLeft size={14} />
              Back to Cart
            </Link>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12">
        <CheckoutForm
          onSubmit={handlePlaceOrder}
          onBack={() => window.history.back()}
        />
      </section>

      {/* Footer */}
      <section className="border-t border-border py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <PaymentLogos />
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-4 text-[10px] sm:text-[11px] text-text-muted">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <Link href="/returns" className="hover:text-ink transition-colors">Returns</Link>
            <Link href="/shipping" className="hover:text-ink transition-colors">Shipping</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
