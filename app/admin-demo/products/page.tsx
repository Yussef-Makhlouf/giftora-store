'use client'

import { useState, useMemo } from 'react'
import { Package, Search, Plus, X, Edit3, Trash2, ChevronDown, Filter } from 'lucide-react'
import { adminProducts, type AdminProduct } from '@/data/admin-data'

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-500/10 text-emerald-700',
  draft: 'bg-amber-500/10 text-amber-700',
  archived: 'bg-red-500/10 text-red-700',
}

const categories = ['All', 'Gift Boxes', 'Mugs', 'Notebooks', 'Accessories']

export default function AdminProductsPage() {
  const [products] = useState(adminProducts)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'archived'>('all')
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter
      const matchStatus = statusFilter === 'all' || p.status === statusFilter
      return matchSearch && matchCategory && matchStatus
    })
  }, [products, search, categoryFilter, statusFilter])

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const activeProducts = products.filter(p => p.status === 'active').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-ink font-bold">Products</h1>
          <p className="text-sm text-text-secondary mt-1">{activeProducts} active &middot; {totalStock} units in stock</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-dusty-rose text-white text-sm font-semibold rounded-xl hover:bg-dusty-rose-dark transition-all duration-200 shadow-lg shadow-dusty-rose/20 self-start sm:self-auto"
        >
          <Plus size={15} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose transition-colors"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`sm:hidden px-3 py-2.5 rounded-xl border text-sm transition-all ${
              showFilters || categoryFilter !== 'All' || statusFilter !== 'all'
                ? 'bg-dusty-rose/10 text-dusty-rose border-dusty-rose/20'
                : 'bg-white text-text-secondary border-border'
            }`}
          >
            <Filter size={15} />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="overflow-x-auto scrollbar-none flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  categoryFilter === cat
                    ? 'bg-dusty-rose text-white'
                    : 'bg-white text-text-secondary border border-border hover:border-dusty-rose/30 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="appearance-none px-3.5 py-2 pr-8 bg-white border border-border rounded-lg text-xs text-text-secondary focus:outline-none focus:border-dusty-rose cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {showFilters && (
          <div className="sm:hidden space-y-3 animate-fadeIn">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-dusty-rose text-white'
                      : 'bg-white text-text-secondary border border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="appearance-none w-full px-3.5 py-2 pr-8 bg-white border border-border rounded-lg text-xs text-text-secondary focus:outline-none focus:border-dusty-rose cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-text-muted border-b border-border">
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Product</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">SKU</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Category</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Price</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Stock</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Sales</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Revenue</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-[0.1em] font-medium">Status</th>
                <th className="px-6 py-4 w-10" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-sand transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sand overflow-hidden flex-shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">{p.name}</p>
                        <p className="text-xs text-text-muted">{p.personalized ? 'Personalizable' : 'Standard'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-text-secondary">{p.sku}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{p.category}</td>
                  <td className="px-6 py-4 text-sm text-ink font-medium tabular-nums">{p.price} KD</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-sand-dark rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${p.stock > 30 ? 'bg-emerald-500' : p.stock > 10 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, (p.stock / 60) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted tabular-nums">{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary tabular-nums">{p.sales}</td>
                  <td className="px-6 py-4 text-sm text-ink font-medium tabular-nums">{p.revenue} KD</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-[0.05em] ${statusStyles[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedProduct(p)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-dusty-rose hover:bg-dusty-rose/10 transition-all">
                        <Edit3 size={13} />
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-16 text-center text-text-muted">
                    <Package size={24} className="mx-auto mb-3 opacity-50" />
                    <p>No products found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((p) => (
          <div key={p.id} className="bg-white border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-sand overflow-hidden flex-shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{p.name}</p>
                <p className="text-xs text-text-muted">{p.sku} &middot; {p.category}</p>
              </div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-[0.05em] ${statusStyles[p.status]}`}>
                {p.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <p className="text-[10px] text-text-muted">Price</p>
                <p className="text-sm font-medium text-ink tabular-nums">{p.price} KD</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted">Stock</p>
                <p className="text-sm font-medium text-ink tabular-nums">{p.stock}</p>
              </div>
              <div>
                <p className="text-[10px] text-text-muted">Revenue</p>
                <p className="text-sm font-medium text-dusty-rose tabular-nums">{p.revenue} KD</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSelectedProduct(p)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-sand rounded-lg text-xs text-text-secondary hover:text-dusty-rose transition-colors">
                <Edit3 size={12} /> Edit
              </button>
              <button onClick={() => setDeleteConfirm(p.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-sand rounded-lg text-xs text-text-secondary hover:text-red-500 transition-colors">
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <Package size={24} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No products found</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20 animate-slide-up sm:animate-scale-in">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-ink">Edit Product</h2>
              <button onClick={() => setSelectedProduct(null)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink">
                <X size={15} />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-sand overflow-hidden flex-shrink-0">
                  <img src={selectedProduct.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Product Name</label>
                  <input type="text" defaultValue={selectedProduct.name} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Price (KD)</label>
                  <input type="number" defaultValue={selectedProduct.price} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Stock</label>
                  <input type="number" defaultValue={selectedProduct.stock} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Category</label>
                  <select defaultValue={selectedProduct.category} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose">
                    {['Gift Boxes', 'Mugs', 'Notebooks', 'Accessories'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">Status</label>
                  <select defaultValue={selectedProduct.status} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Description</label>
                <textarea rows={3} defaultValue="Premium gift box perfect for special occasions." className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose resize-none" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" defaultChecked={selectedProduct.personalized} className="w-4 h-4 rounded border-border bg-white text-dusty-rose focus:ring-dusty-rose" />
                <span className="text-sm text-text-secondary">Personalization available</span>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setSelectedProduct(null)} className="px-5 py-2.5 bg-sand text-text-secondary rounded-xl text-sm font-medium hover:text-ink transition-colors">
                Cancel
              </button>
              <button onClick={() => setSelectedProduct(null)} className="px-5 py-2.5 bg-dusty-rose text-white rounded-xl text-sm font-semibold hover:bg-dusty-rose-dark transition-all">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/20 animate-slide-up sm:animate-scale-in">
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-ink">Add New Product</h2>
              <button onClick={() => setShowAddModal(false)} className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center text-text-secondary hover:text-ink">
                <X size={15} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Product Name', type: 'text' },
                { label: 'SKU', type: 'text' },
                { label: 'Price (KD)', type: 'number' },
                { label: 'Stock', type: 'number' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-text-muted mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={`Enter ${f.label.toLowerCase()}`} className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Category</label>
                <select className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink focus:outline-none focus:border-dusty-rose">
                  {['Gift Boxes', 'Mugs', 'Notebooks', 'Accessories'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1.5">Description</label>
                <textarea rows={3} placeholder="Product description..." className="w-full px-4 py-2.5 bg-sand-light border border-border rounded-xl text-sm text-ink placeholder:text-text-muted focus:outline-none focus:border-dusty-rose resize-none" />
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-sand text-text-secondary rounded-xl text-sm font-medium hover:text-ink transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-dusty-rose text-white rounded-xl text-sm font-semibold hover:bg-dusty-rose-dark transition-all">
                Create Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white border border-border rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm p-6 shadow-2xl shadow-black/20 animate-slide-up sm:animate-scale-in text-center">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-serif text-lg font-bold text-ink mb-2">Delete Product?</h3>
            <p className="text-sm text-text-secondary mb-6">This action cannot be undone. The product will be permanently removed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 bg-sand text-text-secondary rounded-xl text-sm font-medium hover:text-ink transition-colors">
                Cancel
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 bg-red-500/10 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-500/20 transition-all border border-red-500/20">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { scrollbar-width: none; }
      `}</style>
    </div>
  )
}
