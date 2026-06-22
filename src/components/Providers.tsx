'use client'

import { Toaster } from 'sonner'
import { CartProvider } from '@/lib/cart-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: {
            borderRadius: '12px',
            padding: '12px 16px',
          },
        }}
      />
      {children}
    </CartProvider>
  )
}
