'use client';

import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
            Featured Products
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Handpicked favorites that make every occasion memorable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
