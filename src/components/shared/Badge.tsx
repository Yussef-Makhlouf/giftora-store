import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary'
  className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full',
        {
          'bg-accent text-dark': variant === 'default',
          'bg-primary text-white': variant === 'primary',
          'bg-secondary text-white': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
