import { Product } from '@/types/product'
import ProductCard from '@/components/product/ProductCard'

interface ProductGridProps {
  products: Product[]
  viewMode?: 'grid' | 'list'
}

export default function ProductGrid({ products, viewMode = 'grid' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 sm:py-24">
        <p className="text-text-muted text-sm">No products found</p>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4 sm:gap-6">
        {products.map((product, index) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
