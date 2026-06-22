'use client'

import { useState, useCallback } from 'react'

interface CreditCardInputProps {
  onValidChange: (isValid: boolean, data: {
    number: string; name: string; expiry: string; cvv: string
  }) => void
}

const PAYMENT_LOGOS = {
  visa: 'https://cdn.simpleicons.org/visa/FFFFFF',
  mastercard: 'https://cdn.simpleicons.org/mastercard/FFFFFF',
  knet: '/knet-icon.svg',
  amex: 'https://cdn.simpleicons.org/amex/FFFFFF',
}

function detectCardType(number: string): 'visa' | 'mastercard' | 'amex' | 'unknown' {
  const cleaned = number.replace(/\D/g, '')
  if (/^4/.test(cleaned)) return 'visa'
  if (/^5[1-5]/.test(cleaned)) return 'mastercard'
  if (/^3[47]/.test(cleaned)) return 'amex'
  return 'unknown'
}

function formatCardNumber(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 16)
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

function formatExpiry(value: string): string {
  const cleaned = value.replace(/\D/g, '').slice(0, 4)
  if (cleaned.length >= 3) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
  return cleaned
}

export function CreditCardInput({ onValidChange }: CreditCardInputProps) {
  const [number, setNumber] = useState('')
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [focused, setFocused] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null)

  const cardType = detectCardType(number)
  const isValidNumber = number.replace(/\D/g, '').length >= 13
  const isValidExpiry = expiry.length === 5
  const isValidCvv = cvv.length >= 3 && cvv.length <= 4
  const isComplete = isValidNumber && name.length > 2 && isValidExpiry && isValidCvv

  const handleNumberChange = useCallback((value: string) => {
    const formatted = formatCardNumber(value)
    setNumber(formatted)
  }, [])

  const handleExpiryChange = useCallback((value: string) => {
    setExpiry(formatExpiry(value))
  }, [])

  const handleBlur = useCallback(() => {
    const cleanNum = number.replace(/\D/g, '')
    onValidChange(isComplete, {
      number: cleanNum,
      name,
      expiry: expiry.replace('/', ''),
      cvv,
    })
  }, [isComplete, number, name, expiry, cvv, onValidChange])

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3.5 bg-white border text-sm transition-all duration-200 outline-none ${
      focused ? 'border-dusty-rose ring-1 ring-dusty-rose/20' : 'border-border'
    } ${hasError ? 'border-error ring-error/10' : ''} text-ink placeholder:text-text-muted`

  return (
    <div className="space-y-6">
      {/* Card Preview */}
      <div className="relative h-48 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-ink via-ink-light to-ink p-6 md:p-8 shadow-xl card-shadow">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-dusty-rose/10 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-bronze/10 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="flex items-start justify-between">
            <span className="font-serif text-xl text-white/80 tracking-wider">Giftora</span>
            {cardType !== 'unknown' && (
              <img
                src={PAYMENT_LOGOS[cardType]}
                alt={cardType}
                className="h-8 w-12 object-contain brightness-0 invert"
              />
            )}
          </div>

          <div>
            <p className="font-mono text-xl md:text-2xl text-white tracking-[0.15em] mb-4 min-h-[2rem]">
              {number || '•••• •••• •••• ••••'}
            </p>
            <div className="flex justify-between items-end">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Cardholder</p>
                <p className="text-sm text-white truncate font-medium">
                  {name || 'Your Name'}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Expires</p>
                <p className="text-sm text-white font-medium">
                  {expiry || 'MM/YY'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={number}
              onChange={(e) => handleNumberChange(e.target.value)}
              onFocus={() => setFocused('number')}
              onBlur={handleBlur}
              maxLength={19}
              className={inputClass(number.length > 0 && !isValidNumber)}
              autoComplete="cc-number"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              {cardType !== 'unknown' && (
                <img
                  src={PAYMENT_LOGOS[cardType]}
                  alt={cardType}
                  className="h-5 w-8 object-contain"
                />
              )}
              {cardType === 'visa' && (
                <span className="text-[10px] font-medium text-dusty-rose uppercase tracking-wider bg-dusty-rose/10 px-1.5 py-0.5 rounded">
                  Visa
                </span>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
            Cardholder Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={handleBlur}
            className={inputClass(name.length > 0 && name.length < 3)}
            autoComplete="cc-name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
              Expiry Date
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              onFocus={() => setFocused('expiry')}
              onBlur={handleBlur}
              maxLength={5}
              className={inputClass(expiry.length > 0 && !isValidExpiry)}
              autoComplete="cc-exp"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
              CVV
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              onFocus={() => setFocused('cvv')}
              onBlur={handleBlur}
              maxLength={4}
              className={inputClass(cvv.length > 0 && !isValidCvv)}
              autoComplete="cc-csc"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
