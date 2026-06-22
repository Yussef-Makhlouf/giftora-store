import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        {
          // Variants
          'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary':
            variant === 'primary',
          'bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary':
            variant === 'secondary',
          'border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary':
            variant === 'outline',
          'text-dark hover:bg-muted/10 focus-visible:ring-muted':
            variant === 'ghost',
          
          // Sizes
          'px-4 py-2 text-sm rounded-lg': size === 'sm',
          'px-6 py-3 text-base rounded-xl': size === 'md',
          'px-8 py-4 text-lg rounded-xl': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
