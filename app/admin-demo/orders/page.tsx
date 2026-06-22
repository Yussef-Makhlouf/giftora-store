'use client'

import { useState, useMemo } from 'react'
import { ShoppingCart, Search, X, Eye, CreditCard, DollarSign, Building2 } from 'lucide-react'
import { adminOrders, type AdminOrder } from '@/data/admin-data'

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-700',
  confirmed: 'bg-blue-500/10 text-blue-700',
  processing: 'bg-dusty-rose/10 text-dusty-rose',
  shipped: 'bg-purple-500/10 text-purple-700',
  delivered: 'bg-emerald-500/10 text-emerald-700',
  cancelled: 'bg-red-500/10 text-red-700',
}

const paymentIcons: Record<string, any> = {
  card: CreditCard,
  cash: DollarSign,
  bank: Building2,
}

const statusOptions = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const [orders] = useState(adminOrders)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null)

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || o.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [orders, search, statusFilter])

  const ordersByStatus = (status: string) => orders.filter(o => o.status === status).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Orders</h1>
        <p className="text-sm text-text-secondary mt-1">{orders.length} total &middot; {ordersByStatus('pending')} pending &middot; {ordersByStatus('processing')} in progress</p>
      </div>

      <div className="space-y-3">
        <div className="relative w-full sm:max-w-xs">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose transition-colors"
          />
        </div>
        <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
          <div className="flex gap-2 pb-1 min-w-max">
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
                  statusFilter === s
                    ? 'bg-dusty-rose text-white'
                    : 'bg-white text-text-secondary border border-border hover:border-dusty-rose/30 hover:text-ink'
                }`}
              >
                {s === 'all' ? 'All' : s}
                <span className="ml-1.5 opacity-60">({s === 'all' ? orders.length : ordersByStatus(s)})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-border">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Order ID</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Customer</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Items</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Total</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Date</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Payment</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Shipping</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => {
                const PaymentIcon = paymentIcons[o.payment]
                return (
                  <tr key={o.id} className="border-b border-border/50 hover:bg-sand transition-colors" style={{ animation: `fadeIn 0.3s ease-out ${i * 0.03}s both` }}>
                    <td className="px-6 py-4 text-xs font-mono text-ink font-medium">{o.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-ink">{o.customer}</p>
                        <p className="text-xs text-text-muted">{o.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary tabular-nums">{o.items}</td>
                    <td className="px-6 py-4 text-sm text-ink font-medium tabular-nums">{o.total} KD</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{o.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <PaymentIcon size={12} />
                        <span className="capitalize">{o.payment}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{o.shipping}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.05em] ${statusColors[o.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          o.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                          o.status === 'processing' ? 'bg-dusty-rose animate-pulse' :
                          o.status === 'shipped' ? 'bg-purple-500' :
                          o.status === 'delivered' ? 'bg-emerald-500' : ''
                        }`} />
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setSelectedOrder(o)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-dusty-rose hover:bg-dusty-rose/10 transition-all">
                        <Eye size={13} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOrder(o)}
            className="bg-white border border-border rounded-2xl p-4 hover:border-dusty-rose/20 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono text-ink font-medium">{o.id}</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-[0.05em] ${statusColors[o.status]}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  o.status === 'pending' ? 'bg-amber-500 animate-pulse' :
                  o.status === 'processing' ? 'bg-dusty-rose animate-pulse' :
                  o.status === 'shipped' ? 'bg-purple-500' :
                  o.status === 'delivered' ? 'bg-emerald-500' : ''
                }`} />
                {o.status}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-ink font-medium">{o.customer}</p>
                <p className="text-xs text-text-muted">{o.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-ink tabular-nums">{o.total} KD</p>
                <p className="text-xs text-text-muted">{o.items} items</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/50">
              <span>{o.date}</span>
              <span className="capitalize">{o.payment} &middot; {o.shipping}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <ShoppingCart size={24} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Detail Slideover */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative w-full sm:max-w-lg bg-white border-l border-border h-full overflow-y-auto shadow-2xl shadow-black/10 sm:animate-slide-in-right">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white z-10">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-text-muted font-mono truncate">{selectedOrder.id}</p>
                <h2 className="font-serif text-lg font-bold text-ink">Order Details</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink flex-shrink-0">
                <X size={15} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-[0.05em] ${statusColors[selectedOrder.status]}`}>
                  <span className={`w-2 h-2 rounded-full ${
                    ['pending', 'processing'].includes(selectedOrder.status) ? 'animate-pulse bg-current' : 'bg-current'
                  }`} />
                  {selectedOrder.status}
                </span>
                <select
                  defaultValue={selectedOrder.status}
                  className="px-3 py-1.5 bg-sand-light border border-border rounded-lg text-xs text-ink focus:outline-none focus:border-dusty-rose cursor-pointer"
                >
                  {statusOptions.filter(s => s !== 'all').map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Customer', value: selectedOrder.customer },
                  { label: 'Email', value: selectedOrder.email },
                  { label: 'Payment', value: selectedOrder.payment.charAt(0).toUpperCase() + selectedOrder.payment.slice(1) },
                  { label: 'Shipping', value: `${selectedOrder.shipping} Shipping` },
                  { label: 'Date', value: selectedOrder.date },
                  { label: 'Items', value: `${selectedOrder.items} items` },
                ].map((info) => (
                  <div key={info.label} className="bg-sand-light rounded-xl p-4 border border-border">
                    <p className="text-xs text-text-muted mb-1">{info.label}</p>
                    <p className="text-sm text-ink font-medium truncate">{info.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-serif text-sm font-semibold text-ink mb-4">Order Timeline</h3>
                <div className="space-y-0">
                  {[
                    { label: 'Order Placed', time: 'Jun 22, 2026 - 10:30 AM', done: true },
                    { label: 'Payment Confirmed', time: 'Jun 22, 2026 - 10:35 AM', done: true },
                    { label: 'Processing Started', time: 'Jun 22, 2026 - 2:00 PM', done: selectedOrder.status !== 'pending' },
                    { label: 'Shipped', time: 'Jun 23, 2026 (est.)', done: ['shipped', 'delivered'].includes(selectedOrder.status) },
                    { label: 'Delivered', time: 'Jun 24, 2026 (est.)', done: selectedOrder.status === 'delivered' },
                  ].map((step, i) => (
                    <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < 4 && (
                        <div className={`absolute left-[11px] top-5 w-0.5 h-full ${step.done ? 'bg-emerald-500/40' : 'bg-border'}`} />
                      )}
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.done ? 'bg-emerald-500/10 border-2 border-emerald-500' : 'bg-sand border-2 border-border'
                      }`}>
                        {step.done && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <p className={`text-sm font-medium ${step.done ? 'text-ink' : 'text-text-muted'}`}>{step.label}</p>
                        <p className="text-xs text-text-muted mt-0.5">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button className="flex-1 px-4 py-2.5 bg-dusty-rose text-white rounded-xl text-sm font-semibold hover:bg-dusty-rose-dark transition-all">
                  Update Status
                </button>
                <button className="flex-1 px-4 py-2.5 bg-sand text-text-secondary rounded-xl text-sm font-medium hover:text-ink transition-colors border border-border">
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  )
}
