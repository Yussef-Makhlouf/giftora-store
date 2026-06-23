'use client'

import { useState } from 'react'
import { Tag, Check, X, Loader2 } from 'lucide-react'

interface PromoCodeProps {
  onApply: (discount: number, code: string) => void
  onRemove: () => void
  appliedCode: string | null
  discountAmount: number
}

const VALID_CODES: Record<string, { discount: number; type: 'percent' | 'fixed'; label: string }> = {
  'BUNDLE10': { discount: 10, type: 'percent', label: '10% off your bundle' },
  'GIFTORA15': { discount: 15, type: 'percent', label: '15% off your order' },
  'WELCOME10': { discount: 10, type: 'percent', label: '10% welcome discount' },
  'SUMMER20': { discount: 20, type: 'percent', label: '20% summer sale' },
  'FREESHIP': { discount: 2, type: 'fixed', label: 'Free shipping' },
}

export function PromoCode({ onApply, onRemove, appliedCode, discountAmount }: PromoCodeProps) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleApply = async () => {
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return

    setLoading(true)
    setError('')

    // Simulate API call
    await new Promise((r) => setTimeout(r, 600))

    const promoData = VALID_CODES[trimmed]
    if (promoData) {
      onApply(promoData.discount, trimmed)
      setCode('')
    } else {
      setError('Invalid promo code. Try BUNDLE10 or GIFTORA15')
    }
    setLoading(false)
  }

  if (appliedCode) {
    const promo = VALID_CODES[appliedCode]
    return (
      <div className="flex items-center justify-between p-3 sm:p-4 bg-success/5 border border-success/20 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-success/10 flex items-center justify-center">
            <Check size={13} className="text-success" />
          </div>
          <div>
            <p className="text-xs font-semibold text-ink font-mono">{appliedCode}</p>
            <p className="text-[10px] sm:text-xs text-success">{promo?.label}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="w-7 h-7 rounded-full hover:bg-error/10 flex items-center justify-center text-text-muted hover:text-error transition-colors"
          aria-label="Remove promo code"
        >
          <X size={13} />
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Enter promo code"
            className="w-full pl-8 pr-3 py-3 bg-white border border-border text-xs sm:text-sm text-ink placeholder:text-text-muted focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/20 outline-none rounded-xl transition-all"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim() || loading}
          className="px-4 sm:px-5 py-3 bg-ink text-white text-xs font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-all disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center gap-1.5"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : 'Apply'}
        </button>
      </div>
      {error && (
        <p className="text-[11px] text-error flex items-center gap-1.5 pl-1 animate-fade-in-up">
          <X size={11} />
          {error}
        </p>
      )}
    </div>
  )
}
