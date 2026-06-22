'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import Badge from './Badge';
import { Button } from './Button';
import { useCart } from '@/lib/cart-context';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge variant={product.badge === 'Best Seller' ? 'primary' : product.badge === 'New' ? 'secondary' : 'default'}>
                {product.badge}
              </Badge>
            </div>
          )}

          {/* Quick Add to Cart */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-muted mb-2">{product.category}</p>
          <h3 className="font-serif text-lg font-semibold text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-muted mb-4 line-clamp-2">
            {product.shortDescription}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {product.price} {product.currency}
            </span>
            {product.personalizationAvailable && (
              <span className="text-xs text-accent font-medium">
                Customizable
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
