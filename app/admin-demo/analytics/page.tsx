'use client'

import { useState } from 'react'
import {
  BarChart3, TrendingUp, TrendingDown, Users, ShoppingCart,
  DollarSign, Package, ArrowUpRight, Calendar, ChevronDown
} from 'lucide-react'
import { monthlyRevenue, salesByCategory, topProducts } from '@/data/admin-data'

const kpiCards = [
  {
    label: 'Conversion Rate',
    value: '4.8%',
    change: '+0.6%',
    trend: 'up' as const,
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-600',
    subtitle: 'vs last month',
  },
  {
    label: 'Customer Retention',
    value: '72%',
    change: '+5%',
    trend: 'up' as const,
    icon: Users,
    color: 'from-blue-500/20 to-blue-500/5 text-blue-600',
    subtitle: 'repeat purchase rate',
  },
  {
    label: 'Avg. Items/Order',
    value: '1.9',
    change: '+0.3',
    trend: 'up' as const,
    icon: ShoppingCart,
    color: 'from-purple-500/20 to-purple-500/5 text-purple-600',
    subtitle: 'basket size',
  },
  {
    label: 'Return Rate',
    value: '2.1%',
    change: '-0.4%',
    trend: 'down' as const,
    icon: Package,
    color: 'from-amber-500/20 to-amber-500/5 text-amber-600',
    subtitle: 'below industry avg',
  },
  {
    label: 'Revenue/Visitor',
    value: '3.45 KD',
    change: '+12%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'from-dusty-rose/20 to-dusty-rose/5 text-dusty-rose',
    subtitle: 'per session',
  },
]

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState('6m')

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))
  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalOrders = monthlyRevenue.reduce((s, m) => s + m.orders, 0)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">Deep insights into your store&apos;s performance.</p>
        </div>
        <div className="overflow-x-auto scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
          <div className="inline-flex gap-1 bg-white border border-border rounded-xl p-1 min-w-max">
            {['1m', '3m', '6m', '1y'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  period === p ? 'bg-dusty-rose/15 text-dusty-rose' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {p === '1m' ? '1 Month' : p === '3m' ? '3 Months' : p === '6m' ? '6 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="bg-white border border-border rounded-2xl p-4 sm:p-5 hover:shadow-lg hover:shadow-dusty-rose/5 transition-all" style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.08}s both` }}>
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center mb-2 sm:mb-3`}>
                <Icon size={13} />
              </div>
              <p className="text-lg sm:text-xl font-bold text-ink font-serif">{kpi.value}</p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-0.5">{kpi.subtitle}</p>
              <div className="flex items-center gap-1 mt-1.5 sm:mt-2">
                {kpi.trend === 'up'
                  ? <TrendingUp size={11} className="text-emerald-600" />
                  : <TrendingDown size={11} className="text-red-600" />
                }
                <span className={`text-[11px] sm:text-xs font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>{kpi.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="font-serif text-base font-semibold text-ink">Revenue Trend</h2>
              <p className="text-xs text-text-muted mt-0.5">{totalRevenue} KD total</p>
            </div>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-36 sm:h-44 lg:h-52">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1 sm:gap-2 group">
                <div
                  className="w-full bg-gradient-to-t from-dusty-rose/40 to-dusty-rose/20 rounded-t-lg transition-all duration-300 cursor-pointer group-hover:from-dusty-rose group-hover:to-dusty-rose/60 relative"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink border border-border px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    {m.revenue} KD
                  </div>
                </div>
                <span className="text-[10px] text-text-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="font-serif text-base font-semibold text-ink">Orders Over Time</h2>
              <p className="text-xs text-text-muted mt-0.5">{totalOrders} orders placed</p>
            </div>
          </div>
          <div className="flex items-end gap-2 sm:gap-3 h-36 sm:h-44 lg:h-52">
            {monthlyRevenue.map((m, i) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1 sm:gap-2 group">
                <div
                  className="w-full bg-gradient-to-t from-dusty-rose-dark/40 to-dusty-rose-dark/20 rounded-t-lg transition-all duration-300 cursor-pointer group-hover:from-dusty-rose-dark group-hover:to-dusty-rose-dark/60 relative"
                  style={{ height: `${(m.orders / Math.max(...monthlyRevenue.map(x => x.orders))) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ink border border-border px-2 py-1 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
                    {m.orders} orders
                  </div>
                </div>
                <span className="text-[10px] text-text-muted">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Sales by Category */}
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6">
          <h2 className="font-serif text-base font-semibold text-ink mb-4 sm:mb-6">Sales by Category</h2>
          <div className="space-y-4 sm:space-y-5">
            {salesByCategory.map((cat) => {
              const pct = Math.round((cat.revenue / totalRevenue) * 100)
              return (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs sm:text-sm text-ink">{cat.category}</span>
                    <span className="text-[11px] sm:text-xs text-text-secondary tabular-nums">{pct}% &middot; {cat.revenue} KD</span>
                  </div>
                  <div className="w-full h-2 sm:h-2.5 bg-sand-dark rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, #C9A694, ${pct > 50 ? '#B8897A' : '#A67868'})`,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Products Performance */}
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6">
          <h2 className="font-serif text-base font-semibold text-ink mb-4 sm:mb-6">Top Products by Revenue</h2>
          <div className="space-y-3 sm:space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 sm:gap-4">
                <span className="text-[10px] font-bold text-text-muted w-4 sm:w-5 flex-shrink-0 text-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm text-ink truncate">{p.name}</span>
                    <span className="text-[11px] sm:text-xs text-dusty-rose font-medium tabular-nums ml-2">{p.revenue} KD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-sand-dark rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-dusty-rose to-dusty-rose-dark"
                        style={{ width: `${(p.revenue / topProducts[0].revenue) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-text-muted w-14 sm:w-16 text-right tabular-nums">{p.sales} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="bg-white border border-border rounded-2xl p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Total Revenue', value: `${totalRevenue} KD` },
            { label: 'Total Orders', value: `${totalOrders}` },
            { label: 'Best Month', value: monthlyRevenue.reduce((a, b) => a.revenue > b.revenue ? a : b).month },
            { label: 'Growth Rate', value: '+18.2%' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[11px] sm:text-xs text-text-muted mb-0.5 sm:mb-1">{s.label}</p>
              <p className="text-base sm:text-lg font-bold text-ink font-serif">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  )
}
