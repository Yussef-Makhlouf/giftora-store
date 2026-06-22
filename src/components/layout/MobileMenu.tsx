'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import Logo from '@/components/shared/Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-dark/50 z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-surface z-50 lg:hidden shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
            <Link href="/" onClick={onClose}>
              <Logo
                className="flex items-center gap-1.5"
                iconClassName="h-5 sm:h-6 w-auto text-primary"
                textClassName="font-serif text-lg sm:text-xl font-bold text-primary"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 hover:bg-bg rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-dark" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 sm:p-6">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-medium text-dark hover:bg-bg hover:text-primary rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <h3 className="px-3 sm:px-4 text-xs sm:text-sm font-semibold text-muted mb-2 sm:mb-3">Categories</h3>
              <ul className="space-y-1">
                {['Gift Boxes', 'Mugs', 'Notebooks', 'Accessories'].map((category) => (
                  <li key={category}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(category)}`}
                      onClick={onClose}
                      className="block px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-muted hover:bg-bg hover:text-primary rounded-lg transition-colors"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
