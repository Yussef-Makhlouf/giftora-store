'use client'

import { useState } from 'react'
import { Settings as SettingsIcon, Save, Store, Truck, CreditCard, Bell, Globe, Shield, ChevronRight, DollarSign } from 'lucide-react'

type SettingsTab = 'general' | 'shipping' | 'payment' | 'notifications'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general')

  const tabs: { key: SettingsTab; label: string; icon: any }[] = [
    { key: 'general', label: 'General', icon: Store },
    { key: 'shipping', label: 'Shipping', icon: Truck },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'notifications', label: 'Notifications', icon: Bell },
  ]

  const TabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-text-muted mb-1.5">Store Name</label>
                <input type="text" defaultValue="Giftora" className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Contact Email</label>
                <input type="email" defaultValue="support@giftora.com" className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Phone Number</label>
                <input type="tel" defaultValue="+965 2222 3333" className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-text-muted mb-1.5">Store Address</label>
                <input type="text" defaultValue="Block 5, Street 15, Salmiya, Kuwait" className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-text-muted mb-1.5">Store Description</label>
                <textarea rows={3} defaultValue="Thoughtfully curated gifts for every occasion. Based in Kuwait." className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose transition-colors resize-none" />
              </div>
            </div>

            {/* Currency & Locale */}
            <div className="border-t border-border pt-5 sm:pt-6">
              <h3 className="font-serif text-sm font-semibold text-ink mb-4">Locale Settings</h3>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Currency</label>
                  <select className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose cursor-pointer">
                    <option>Kuwaiti Dinar (KD)</option>
                    <option>US Dollar (USD)</option>
                    <option>Euro (EUR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Language</label>
                  <select className="w-full px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose cursor-pointer">
                    <option>English</option>
                    <option>Arabic (العربية)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      case 'shipping':
        return (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="grid gap-3 sm:gap-5">
              {[
                { label: 'Standard Shipping', cost: '2 KD', time: '2-3 business days' },
                { label: 'Express Shipping', cost: '4 KD', time: 'Next business day' },
                { label: 'Same-Day Delivery', cost: '6 KD', time: 'Within hours' },
              ].map((method) => (
                <div key={method.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sand-light border border-border rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <Truck size={18} className="text-dusty-rose flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-ink">{method.label}</p>
                      <p className="text-xs text-text-muted">{method.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <input type="text" defaultValue={method.cost} className="w-20 px-3 py-2 bg-white border border-border rounded-lg text-sm text-ink text-center focus:outline-none focus:border-dusty-rose" />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-sand-dark rounded-full peer peer-checked:bg-dusty-rose/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-5 sm:pt-6">
              <h3 className="font-serif text-sm font-semibold text-ink mb-4">Free Shipping Threshold</h3>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input type="number" defaultValue={30} className="w-full sm:w-32 px-4 py-3 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose" />
                  <span className="text-sm text-text-secondary flex-shrink-0">KD</span>
                </div>
                <p className="text-xs text-text-muted">Orders above this amount get free standard shipping</p>
              </div>
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="grid gap-3 sm:gap-4">
              {[
                { name: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, KNET', enabled: true },
                { name: 'Cash on Delivery', icon: DollarSign, desc: 'Pay when order arrives', enabled: true },
                { name: 'Bank Transfer', icon: Shield, desc: 'Direct bank deposit', enabled: true },
              ].map((method) => (
                <div key={method.name} className="flex items-center justify-between bg-sand-light border border-border rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <method.icon size={18} className="text-dusty-rose flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink truncate">{method.name}</p>
                      <p className="text-xs text-text-muted truncate">{method.desc}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
                    <div className="w-9 h-5 bg-sand-dark rounded-full peer peer-checked:bg-dusty-rose/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-5 sm:space-y-6 animate-fadeIn">
            <div className="grid gap-3 sm:gap-4">
              {[
                { label: 'New Order', desc: 'When a customer places an order', checked: true },
                { label: 'Order Shipped', desc: 'When an order status changes to shipped', checked: true },
                { label: 'Low Stock Alert', desc: 'When product stock falls below 10 units', checked: true },
                { label: 'New Customer Registration', desc: 'When a new account is created', checked: false },
                { label: 'Daily Sales Report', desc: 'End-of-day summary of orders and revenue', checked: true },
                { label: 'Refund Request', desc: 'When a customer initiates a return', checked: true },
              ].map((notif) => (
                <div key={notif.label} className="flex items-center justify-between bg-sand-light border border-border rounded-xl p-4 sm:p-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{notif.label}</p>
                    <p className="text-xs text-text-muted">{notif.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                    <input type="checkbox" defaultChecked={notif.checked} className="sr-only peer" />
                    <div className="w-9 h-5 bg-sand-dark rounded-full peer peer-checked:bg-dusty-rose/60 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">Manage your store configuration and preferences.</p>
      </div>

      {/* Tabs - horizontal scroll on mobile */}
      <div className="overflow-x-auto scrollbar-none -mx-1 px-1 sm:mx-0 sm:px-0">
        <div className="flex gap-1 bg-white border border-border rounded-xl p-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-dusty-rose text-white shadow-lg shadow-dusty-rose/20'
                    : 'text-text-secondary hover:text-ink hover:bg-sand'
                }`}
              >
                <Icon size={14} className="flex-shrink-0" />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-border rounded-2xl p-4 sm:p-6 md:p-8">
        <TabContent />
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-dusty-rose text-white text-sm font-semibold rounded-xl hover:bg-dusty-rose-dark transition-all duration-200 shadow-lg shadow-dusty-rose/20">
          <Save size={15} />
          Save Changes
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  )
}
