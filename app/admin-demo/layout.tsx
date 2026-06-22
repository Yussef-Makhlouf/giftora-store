'use client'

import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings,
  Gift, Bell, Search, LogOut, Menu, X
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/admin-demo', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin-demo/products', label: 'Products', icon: Package },
  { href: '/admin-demo/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin-demo/customers', label: 'Customers', icon: Users },
  { href: '/admin-demo/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin-demo/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  const navigate = (href: string) => {
    window.location.href = href
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-sand-light text-ink flex flex-col md:flex-row">
      {/* Mobile header bar */}
      <div className="md:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink"
            aria-label="Open sidebar"
          >
            <Menu size={16} />
          </button>
          <span className="font-serif text-lg font-bold tracking-tight">Giftora</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink"
            aria-label="Search"
          >
            <Search size={15} />
          </button>
          <button className="relative w-9 h-9 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink" aria-label="Notifications">
            <Bell size={15} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-dusty-rose rounded-full" />
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      {mobileSearchOpen && (
        <div className="md:hidden border-b border-border bg-white px-4 py-3 animate-fadeIn">
          <div className="relative">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search orders, products..."
              className="w-full pl-10 pr-4 py-2.5 bg-sand border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose transition-colors"
              autoFocus
            />
          </div>
        </div>
      )}

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 md:w-60 lg:w-64 flex-shrink-0
          bg-white border-r border-border
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:h-auto
          flex flex-col
        `}>
          {/* Sidebar close button (mobile) */}
          <div className="md:hidden flex items-center justify-between px-4 py-4 border-b border-border">
            <span className="font-serif text-xl font-bold tracking-tight">Giftora</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>

          {/* Desktop logo */}
          <div className="hidden md:block px-4 lg:px-6 py-5 lg:py-6 border-b border-border">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-gradient-to-br from-dusty-rose to-dusty-rose-light flex items-center justify-center shadow-lg shadow-dusty-rose/10 flex-shrink-0">
                <Gift size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <span className="text-sm lg:text-base text-ink font-serif font-bold tracking-tight block truncate">Giftora</span>
                <span className="hidden lg:block text-[10px] text-text-muted uppercase tracking-[0.15em] font-medium">Admin Panel</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 lg:px-3 py-3 lg:py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-dusty-rose text-white shadow-lg shadow-dusty-rose/20'
                      : 'text-text-secondary hover:text-ink hover:bg-sand'
                  }`}
                >
                  <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-sand-dark'
                  }`}>
                    <Icon size={13} />
                  </div>
                  <span className="truncate">{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />}
                </button>
              )
            })}
          </nav>

          {/* Bottom */}
          <div className="px-2 lg:px-3 py-3 lg:py-4 border-t border-border">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm text-text-secondary hover:text-ink hover:bg-sand transition-all duration-200"
            >
              <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg bg-sand-dark flex items-center justify-center flex-shrink-0">
                <LogOut size={13} />
              </div>
              <span className="truncate">Back to Store</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 relative z-10">
          {/* Desktop header */}
          <header className="hidden md:block sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border">
            <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                <div className="relative w-full max-w-[240px] lg:max-w-xs">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search orders, products..."
                    className="w-full pl-10 pr-4 py-2 bg-sand border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                <button className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-sand flex items-center justify-center text-text-secondary hover:text-ink transition-colors" aria-label="Notifications">
                  <Bell size={14} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-dusty-rose rounded-full" />
                </button>
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-gradient-to-br from-dusty-rose to-dusty-rose-light flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-dusty-rose/20 flex-shrink-0">
                  A
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 relative z-10 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-border flex items-center justify-around px-1 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`flex flex-col items-center gap-0.5 py-2 px-2 min-w-0 flex-1 transition-colors ${
                isActive ? 'text-dusty-rose' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] font-medium truncate w-full text-center">{item.label}</span>
              {isActive && <div className="w-4 h-0.5 rounded-full bg-dusty-rose mt-0.5" />}
            </button>
          )
        })}
      </nav>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
      `}</style>
    </div>
  )
}
