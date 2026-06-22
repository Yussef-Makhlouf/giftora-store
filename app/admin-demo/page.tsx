'use client'

import { useState, useEffect, useRef } from 'react'
import {
  DollarSign, ShoppingCart, Package, TrendingUp, TrendingDown,
  Clock, AlertTriangle, ChevronRight
} from 'lucide-react'
import { adminOrders, monthlyRevenue, topProducts, salesByCategory } from '@/data/admin-data'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplay(value)
        clearInterval(timer)
      } else {
        setDisplay(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span className="tabular-nums">{display.toLocaleString()}{suffix}</span>
}

const metrics = [
  { label: 'Total Revenue', value: 9890, prefix: 'KD', icon: DollarSign, change: '+18.2%', trend: 'up', color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600' },
  { label: 'Total Orders', value: 284, icon: ShoppingCart, change: '+12.5%', trend: 'up', color: 'from-dusty-rose/20 to-dusty-rose/5 text-dusty-rose' },
  { label: 'Products Sold', value: 543, icon: Package, change: '+8.3%', trend: 'up', color: 'from-blue-500/20 to-blue-500/5 text-blue-600' },
  { label: 'Avg. Order Value', value: 348, prefix: 'KD', icon: TrendingUp, change: '+5.1%', trend: 'up', color: 'from-purple-500/20 to-purple-500/5 text-purple-600' },
  { label: 'Pending Orders', value: 8, icon: Clock, change: '-3', trend: 'down', color: 'from-amber-500/20 to-amber-500/5 text-amber-600' },
  { label: 'Low Stock Items', value: 3, icon: AlertTriangle, change: 'Needs attention', trend: 'neutral', color: 'from-red-500/20 to-red-500/5 text-red-600' },
]

const statusColors: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-700',
  confirmed: 'bg-blue-500/10 text-blue-700',
  processing: 'bg-dusty-rose/10 text-dusty-rose',
  shipped: 'bg-purple-500/10 text-purple-700',
  delivered: 'bg-emerald-500/10 text-emerald-700',
  cancelled: 'bg-red-500/10 text-red-700',
}

export default function AdminDashboardPage() {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Your store at a glance &mdash; real-time overview of performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon
          return (
            <div
              key={m.label}
              className="bg-white border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-dusty-rose/5 transition-all duration-300"
              style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both` }}
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-4`}>
                <Icon size={15} />
              </div>
              <p className="text-2xl font-bold text-ink tabular-nums">
                {m.prefix && <span className="text-sm text-text-muted font-normal">{m.prefix} </span>}
                {typeof m.value === 'number' ? <AnimatedCounter value={m.value} /> : m.value}
              </p>
              <p className="text-xs text-text-muted mt-1">{m.label}</p>
              <div className="flex items-center gap-1 mt-2">
                {m.trend === 'up' && <TrendingUp size={12} className="text-emerald-600" />}
                {m.trend === 'down' && <TrendingDown size={12} className="text-red-600" />}
                <span className={`text-xs font-medium ${
                  m.trend === 'up' ? 'text-emerald-600' :
                  m.trend === 'down' ? 'text-red-600' : 'text-text-secondary'
                }`}>{m.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-base font-semibold text-ink">Monthly Revenue</h2>
              <p className="text-xs text-text-muted mt-0.5">Last 6 months</p>
            </div>
            <span className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp size={12} /> +18.2%
            </span>
          </div>
          <div className="flex items-end gap-3 h-48">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div className="relative w-full">
                  <div
                    className="w-full bg-gradient-to-t from-dusty-rose/40 to-dusty-rose/20 rounded-t-lg transition-all duration-300 cursor-pointer group-hover:from-dusty-rose group-hover:to-dusty-rose/60"
                    style={{ height: `${(m.revenue / 3000) * 100}%` }}
                  >
                    {hoveredBar === i && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink border border-border px-2.5 py-1 rounded-lg text-xs text-white whitespace-nowrap shadow-xl">
                        {m.revenue} KD
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-text-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="font-serif text-base font-semibold text-ink mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((p, i) => {
              const maxRevenue = Math.max(...topProducts.map(x => x.revenue))
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-bold text-text-muted w-4 flex-shrink-0">{i + 1}</span>
                      <span className="text-ink truncate text-xs">{p.name}</span>
                    </div>
                    <span className="text-dusty-rose text-xs font-medium tabular-nums">{p.revenue} KD</span>
                  </div>
                  <div className="w-full h-1.5 bg-sand-dark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-dusty-rose to-dusty-rose-dark rounded-full transition-all duration-500"
                      style={{ width: `${(p.revenue / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[10px] text-text-muted">{p.sales} sold</span>
                    <span className="text-[10px] text-text-muted">{p.stock} in stock</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="font-serif text-base font-semibold text-ink">Recent Orders</h2>
            <a
              href="/admin-demo/orders"
              onClick={(e) => { e.preventDefault(); window.location.href = '/admin-demo/orders' }}
              className="text-xs text-dusty-rose hover:text-dusty-rose-dark flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight size={12} />
            </a>
          </div>
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="px-6 py-3 text-[10px] uppercase tracking-[0.1em] font-medium">Order</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-[0.1em] font-medium">Customer</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-[0.1em] font-medium">Total</th>
                  <th className="px-6 py-3 text-[10px] uppercase tracking-[0.1em] font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminOrders.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-border/50 hover:bg-sand transition-colors">
                    <td className="px-6 py-3.5 text-xs font-mono text-ink">{o.id}</td>
                    <td className="px-6 py-3.5 text-sm text-text-secondary">{o.customer}</td>
                    <td className="px-6 py-3.5 text-sm text-ink font-medium tabular-nums">{o.total} KD</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.05em] ${statusColors[o.status] || ''}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="sm:hidden divide-y divide-border/50">
            {adminOrders.slice(0, 6).map((o) => (
              <div key={o.id} className="px-4 py-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-ink font-medium">{o.id}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-[0.05em] ${statusColors[o.status] || ''}`}>
                    {o.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{o.customer}</span>
                  <span className="text-xs text-ink font-medium tabular-nums">{o.total} KD</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl p-6">
          <h2 className="font-serif text-base font-semibold text-ink mb-4">Sales by Category</h2>
          <div className="space-y-5">
            {salesByCategory.map((cat) => {
              const maxSales = Math.max(...salesByCategory.map(c => c.sales))
              const percentage = Math.round((cat.sales / maxSales) * 100)
              return (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ink">{cat.category}</span>
                    <span className="text-xs text-text-muted tabular-nums">{cat.sales} sold &middot; {cat.revenue} KD</span>
                  </div>
                  <div className="w-full h-2 bg-sand-dark rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, #C9A694, ${percentage > 70 ? '#B8897A' : '#A67868'})`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted">Best Category</p>
              <p className="text-sm font-semibold text-ink">Gift Boxes</p>
              <p className="text-xs text-emerald-600">253 units sold</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">Revenue Share</p>
              <p className="text-sm font-semibold text-ink">73.3%</p>
              <p className="text-xs text-text-muted">From Gift Boxes</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
