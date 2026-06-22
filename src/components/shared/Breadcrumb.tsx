import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-2 text-sm', className)}
    >
      <Link
        href="/"
        className="text-muted hover:text-dark transition-colors"
      >
        Home
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-muted" />
          
          {item.href && index !== items.length - 1 ? (
            <Link
              href={item.href}
              className="text-muted hover:text-dark transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-dark font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
