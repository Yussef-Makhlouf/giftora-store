'use client'

import { useState, useMemo } from 'react'
import { Users, Search, Mail, Phone, MapPin, ShoppingBag, ArrowUpRight, ChevronDown } from 'lucide-react'
import { adminCustomers, type AdminCustomer } from '@/data/admin-data'

export default function AdminCustomersPage() {
  const [customers] = useState(adminCustomers)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'orders' | 'spent' | 'name'>('spent')

  const filtered = useMemo(() => {
    const result = customers.filter(c =>
      !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    )
    return result.sort((a, b) => {
      if (sortBy === 'orders') return b.orders - a.orders
      if (sortBy === 'spent') return b.spent - a.spent
      return a.name.localeCompare(b.name)
    })
  }, [customers, search, sortBy])

  const totalSpent = customers.reduce((s, c) => s + c.spent, 0)
  const avgOrders = (customers.reduce((s, c) => s + c.orders, 0) / customers.length).toFixed(1)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Customers</h1>
          <p className="text-sm text-text-secondary mt-1">{customers.length} customers &middot; {totalSpent} KD total revenue &middot; avg {avgOrders} orders</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-initial">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-56 pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none w-full sm:w-auto px-4 py-2.5 pr-8 bg-white border border-border rounded-xl text-xs text-text-secondary focus:outline-none focus:border-dusty-rose cursor-pointer"
            >
              <option value="spent">Sort by Spent</option>
              <option value="orders">Sort by Orders</option>
              <option value="name">Sort by Name</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid gap-3 sm:gap-4">
        {filtered.map((c, i) => (
          <div
            key={c.id}
            className="bg-white border border-border rounded-2xl p-4 sm:p-5 hover:border-dusty-rose/20 transition-all duration-200 group"
            style={{ animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both` }}
          >
            {/* Mobile layout */}
            <div className="sm:hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dusty-rose/20 to-dusty-rose-light/10 flex items-center justify-center text-dusty-rose font-bold flex-shrink-0 border border-dusty-rose/10">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ink truncate">{c.name}</h3>
                  <p className="text-xs text-text-muted truncate">{c.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-sand rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-text-muted">Orders</p>
                  <p className="text-sm font-bold text-ink tabular-nums">{c.orders}</p>
                </div>
                <div className="bg-sand rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-text-muted">Spent</p>
                  <p className="text-sm font-bold text-dusty-rose tabular-nums">{c.spent} KD</p>
                </div>
                <div className="bg-sand rounded-lg p-2.5 text-center">
                  <p className="text-[10px] text-text-muted">Since</p>
                  <p className="text-[11px] font-medium text-text-secondary">{c.joined}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/50">
                <span className="flex items-center gap-1">
                  <Phone size={10} />
                  {c.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {c.city}
                </span>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden sm:flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-dusty-rose/20 to-dusty-rose-light/10 flex items-center justify-center text-dusty-rose font-bold text-lg flex-shrink-0 border border-dusty-rose/10">
                  {c.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-ink">{c.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Mail size={11} />
                      <span className="truncate max-w-[180px]">{c.email}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs text-text-muted">
                      <Phone size={11} />
                      {c.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6">
                <div className="text-right">
                  <p className="text-xs text-text-muted">Orders</p>
                  <p className="text-sm font-bold text-ink tabular-nums">{c.orders}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-text-muted">Total Spent</p>
                  <p className="text-sm font-bold text-dusty-rose tabular-nums">{c.spent} KD</p>
                </div>
                <div className="w-px h-10 bg-border hidden lg:block" />
                <div className="text-right hidden lg:block">
                  <p className="text-xs text-text-muted">Member Since</p>
                  <p className="text-xs text-text-secondary">{c.joined}</p>
                </div>
                <div className="items-center gap-1 text-xs text-text-muted hidden lg:flex">
                  <MapPin size={11} />
                  {c.city}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <Users size={24} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No customers found</p>
          </div>
        )}
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
