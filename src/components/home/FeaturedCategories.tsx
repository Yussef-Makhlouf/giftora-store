'use client';

import Link from 'next/link';
import { Gift, Coffee, BookOpen, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Gift Boxes',
    icon: Gift,
    description: 'Curated collections for every celebration',
    href: '/shop?category=Gift%20Boxes',
    color: 'from-primary/20 to-primary/5'
  },
  {
    name: 'Mugs',
    icon: Coffee,
    description: 'Personalized ceramic mugs',
    href: '/shop?category=Mugs',
    color: 'from-secondary/20 to-secondary/5'
  },
  {
    name: 'Notebooks',
    icon: BookOpen,
    description: 'Custom engraved journals',
    href: '/shop?category=Notebooks',
    color: 'from-accent/20 to-accent/5'
  },
  {
    name: 'Accessories',
    icon: Sparkles,
    description: 'Unique customized items',
    href: '/shop?category=Accessories',
    color: 'from-primary/15 to-accent/10'
  }
];

export function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
            Shop by Category
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Explore our carefully organized collections to find the perfect gift
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="block group"
                >
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border`}>
                    <div className="bg-white/80 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted text-sm">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
