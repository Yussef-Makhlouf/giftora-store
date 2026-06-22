'use client'

import { useState } from 'react'
import { OrderProgress, OrderStep } from '@/components/checkout/OrderProgress'
import { Search, Package, Truck, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const sampleOrders = [
  {
    id: 'ORD-1048',
    date: '2026-06-20',
    total: '25 KD',
    status: 'shipped' as OrderStep,
    items: 1,
    product: 'Graduation Gift Box',
    estimatedDelivery: 'Jun 24, 2026',
  },
  {
    id: 'ORD-1045',
    date: '2026-06-19',
    total: '20 KD',
    status: 'delivered' as OrderStep,
    items: 1,
    product: 'Birthday Celebration Box',
    estimatedDelivery: 'Delivered Jun 22',
  },
]

export default function OrderTrackingPage() {
  const [trackingId, setTrackingId] = useState('')
  const [searched, setSearched] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
  }

  return (
    <div className="min-h-screen bg-sand-light">
      {/* Hero */}
      <section className="bg-ink py-24 md:py-32 relative overflow-hidden">
        <div className="bg-noise" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">
            Track Your Order
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6 leading-[1.1]">
            Where&apos;s My Gift?
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
            Enter your order number to see real-time updates on your delivery.
          </p>

          <form onSubmit={handleTrack} className="max-w-lg mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Enter order number (e.g. ORD-1048)"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm
                           focus:outline-none focus:border-dusty-rose transition-colors rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-dusty-rose text-ink text-sm font-medium uppercase tracking-[0.1em] hover:bg-dusty-rose-light transition-colors rounded-xl whitespace-nowrap"
              >
                Track
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {!searched && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Recent Orders */}
            <div>
              <h2 className="font-serif text-2xl text-ink mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/order-tracking?order=${order.id}`}
                    onClick={() => { setTrackingId(order.id); setSearched(true) }}
                    className="block bg-white border border-border rounded-2xl p-6 card-shadow-hover transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-mono text-sm text-ink font-medium">{order.id}</p>
                        <p className="text-xs text-text-muted">{order.date}</p>
                      </div>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-ink transition-colors" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          order.status === 'delivered' ? 'bg-success' : 'bg-dusty-rose animate-pulse-soft'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-ink">{order.product}</p>
                          <p className="text-xs text-text-muted">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-ink">{order.total}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white border border-border rounded-xl p-5 text-center card-shadow">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-3">
                  <Package size={18} className="text-ink" />
                </div>
                <h3 className="text-sm font-medium text-ink mb-1">Order Prep</h3>
                <p className="text-xs text-text-muted">1-2 business days</p>
              </div>
              <div className="bg-white border border-border rounded-xl p-5 text-center card-shadow">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-3">
                  <Truck size={18} className="text-ink" />
                </div>
                <h3 className="text-sm font-medium text-ink mb-1">Delivery</h3>
                <p className="text-xs text-text-muted">2-3 business days</p>
              </div>
              <div className="bg-white border border-border rounded-xl p-5 text-center card-shadow">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-3">
                  <MapPin size={18} className="text-ink" />
                </div>
                <h3 className="text-sm font-medium text-ink mb-1">Coverage</h3>
                <p className="text-xs text-text-muted">All Kuwait</p>
              </div>
            </div>
          </div>
        )}

        {searched && trackingId && (
          <div className="space-y-8 animate-fade-in-up">
            <OrderProgress
              currentStatus="shipped"
              orderId={trackingId}
              estimatedDelivery="Jun 24, 2026"
            />

            <div className="bg-white border border-border rounded-2xl p-6 card-shadow">
              <h3 className="font-medium text-ink text-sm mb-4">Delivery Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-3 border-b border-border">
                  <span className="text-text-secondary">Shipping Method</span>
                  <span className="text-ink font-medium">Standard Shipping</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-border">
                  <span className="text-text-secondary">Shipping Fee</span>
                  <span className="text-success font-medium">Free</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-border">
                  <span className="text-text-secondary">Delivery to</span>
                  <span className="text-ink font-medium">Salmiya, Kuwait</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Carrier</span>
                  <span className="text-ink font-medium">Giftora Express</span>
                </div>
              </div>
            </div>

            <div className="bg-sand border border-border rounded-2xl p-6 text-center">
              <p className="text-sm text-text-secondary mb-1">Questions about your order?</p>
              <Link href="/contact" className="text-sm text-ink font-medium underline hover:text-dusty-rose transition-colors">
                Contact Support
              </Link>
            </div>

            <div className="text-center">
              <button
                onClick={() => { setSearched(false); setTrackingId('') }}
                className="text-xs text-text-muted hover:text-ink uppercase tracking-[0.1em] transition-colors font-medium"
              >
                Track Another Order
              </button>
            </div>
          </div>
        )}

        {searched && !trackingId && (
          <div className="text-center py-16 animate-fade-in-up">
            <p className="text-text-secondary text-lg mb-2">Please enter an order number</p>
            <p className="text-text-muted text-sm">e.g. ORD-1048, ORD-1045</p>
          </div>
        )}
      </section>
    </div>
  )
}
