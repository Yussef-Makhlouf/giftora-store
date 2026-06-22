export type Category = 'Gift Boxes' | 'Mugs' | 'Notebooks' | 'Accessories' | 'Home Decor' | 'Stationery';
export type Badge = 'Best Seller' | 'New' | 'Popular' | 'Limited Edition';

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  price: number;
  currency: 'KD';
  shortDescription: string;
  longDescription: string;
  image: string;
  images?: string[];
  badge?: Badge;
  personalizationAvailable: boolean;
  featured: boolean;
  newArrival?: boolean;
  stock: number;
}
