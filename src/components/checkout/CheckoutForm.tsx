'use client'

import { useState } from 'react'
import { CreditCardInput } from './CreditCardInput'
import { PaymentLogos } from './PaymentLogos'
import { ChevronLeft, ChevronRight, Shield, Truck, RotateCcw, Check } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

type PaymentMethod = 'card' | 'cash' | 'bank'

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  additionalInfo: string
  paymentMethod: PaymentMethod
}

interface CheckoutFormProps {
  onSubmit: () => void
  onBack: () => void
}

export function CheckoutForm({ onSubmit, onBack }: CheckoutFormProps) {
  const { items, total, itemCount } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kuwait City',
    additionalInfo: '',
    paymentMethod: 'card',
  })
  const [cardValid, setCardValid] = useState(false)

  const shipping = total >= 30 ? 0 : 2
  const grandTotal = total + shipping

  const updateField = (field: keyof CheckoutFormData, value: string | PaymentMethod) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isShippingValid =
    formData.fullName.length > 2 &&
    formData.email.includes('@') &&
    formData.phone.length >= 8 &&
    formData.address.length > 5 &&
    formData.city.length > 0

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1)
    else onSubmit()
  }

  const inputClass = (value: string) =>
    `w-full px-4 py-3.5 bg-white border border-border text-sm transition-all duration-200
     focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/20 outline-none
     text-ink placeholder:text-text-muted`

  const cities = ['Kuwait City', 'Hawalli', 'Salmiya', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mubarak Al-Kabeer']

  const paymentMethods: { value: PaymentMethod; label: string; icon: string; desc: string }[] = [
    { value: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Pay securely with Visa, Mastercard, or KNET' },
    { value: 'cash', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
    { value: 'bank', label: 'Bank Transfer', icon: '🏦', desc: 'Transfer directly to our account' },
  ]

  return (
    <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
      {/* Main form */}
      <div className="lg:col-span-3 min-w-0">
        {/* Steps indicator */}
        <div className="flex items-center gap-0 mb-6 sm:mb-8 overflow-x-auto scrollbar-none">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none min-w-0">
              <div
                className={`flex items-center gap-1.5 sm:gap-2.5 ${
                  s <= step ? 'text-ink' : 'text-text-muted'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                    s < step
                      ? 'bg-success text-white'
                      : s === step
                      ? 'bg-ink text-white'
                      : 'bg-sand-dark text-text-muted'
                  }`}
                >
                  {s < step ? <Check size={12} /> : s}
                </div>
                <span
                  className={`hidden sm:inline text-xs font-medium uppercase tracking-[0.1em] truncate ${
                    s <= step ? 'text-ink' : 'text-text-muted'
                  }`}
                >
                  {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-px mx-2 sm:mx-3 transition-colors duration-300 ${
                    s < step ? 'bg-success' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6 md:p-8 card-shadow">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center">
                  <Truck size={16} className="text-ink" />
                </div>
                <h2 className="font-serif text-xl text-ink">Shipping Information</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fatima Al-Sabah"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className={inputClass(formData.fullName)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inputClass(formData.email)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+965 XXXX XXXX"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={inputClass(formData.phone)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Block, Street, Building, Apartment"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className={inputClass(formData.address)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className={inputClass(formData.city)}
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">
                    Additional Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Gate code, delivery instructions..."
                    value={formData.additionalInfo}
                    onChange={(e) => updateField('additionalInfo', e.target.value)}
                    className={inputClass(formData.additionalInfo)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center">
                  <Shield size={16} className="text-ink" />
                </div>
                <h2 className="font-serif text-xl text-ink">Payment Method</h2>
              </div>

              <div className="grid gap-3">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.value}
                    onClick={() => updateField('paymentMethod', pm.value)}
                    className={`flex items-start gap-4 p-5 border rounded-xl text-left transition-all duration-200 ${
                      formData.paymentMethod === pm.value
                        ? 'border-dusty-rose bg-dusty-rose/5 ring-1 ring-dusty-rose/20'
                        : 'border-border hover:border-dusty-rose/30 hover:bg-sand-light'
                    }`}
                  >
                    <span className="text-2xl">{pm.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-ink">{pm.label}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{pm.desc}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                        formData.paymentMethod === pm.value
                          ? 'border-dusty-rose'
                          : 'border-border'
                      }`}
                    >
                      {formData.paymentMethod === pm.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-dusty-rose" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'card' && (
                <div className="animate-fade-in-up border-t border-border pt-6">
                  <CreditCardInput
                    onValidChange={(valid) => setCardValid(valid)}
                  />
                  <div className="mt-4">
                    <PaymentLogos />
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'bank' && (
                <div className="bg-sand border border-border rounded-xl p-5 animate-fade-in-up">
                  <p className="text-sm font-medium text-ink mb-2">Bank Transfer Details</p>
                  <div className="space-y-1 text-sm text-text-secondary">
                    <p>Bank: <span className="text-ink">National Bank of Kuwait</span></p>
                    <p>Account: <span className="font-mono text-ink">NBK-1234-5678-90</span></p>
                    <p>Beneficiary: <span className="text-ink">Giftora Trading Co.</span></p>
                  </div>
                </div>
              )}

              {formData.paymentMethod === 'cash' && (
                <div className="bg-sand border border-border rounded-xl p-5 animate-fade-in-up">
                  <p className="text-sm text-text-secondary">
                    Pay in cash when your order arrives. Our delivery team will have change available.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sand-dark flex items-center justify-center">
                  <RotateCcw size={16} className="text-ink" />
                </div>
                <h2 className="font-serif text-xl text-ink">Review Your Order</h2>
              </div>

              <div className="space-y-5">
                <div className="bg-sand rounded-xl p-5">
                  <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-3">
                    Shipping Details
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-ink font-medium">{formData.fullName}</p>
                    <p className="text-text-secondary">{formData.email} &middot; {formData.phone}</p>
                    <p className="text-text-secondary">{formData.address}, {formData.city}</p>
                    {formData.additionalInfo && (
                      <p className="text-text-muted text-xs italic">{formData.additionalInfo}</p>
                    )}
                  </div>
                </div>

                <div className="bg-sand rounded-xl p-5">
                  <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted mb-3">
                    Payment Method
                  </h3>
                  <p className="text-sm text-ink font-medium">
                    {formData.paymentMethod === 'card' ? 'Credit / Debit Card' :
                     formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                    Items ({itemCount})
                  </h3>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 bg-white border border-border rounded-xl p-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink truncate">{item.product.title}</p>
                        <p className="text-xs text-text-muted">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-ink">
                        {item.product.price * item.quantity} KD
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors font-medium"
              >
                <ChevronLeft size={14} />
                <span className="hidden xs:inline">Back</span>
                <span className="xs:hidden">Back</span>
              </button>
            ) : (
              <button
                onClick={onBack}
                className="flex items-center gap-1.5 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors font-medium"
              >
                <ChevronLeft size={14} />
                <span className="hidden xs:inline">Back to Cart</span>
                <span className="xs:hidden">Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={
                (step === 1 && !isShippingValid) ||
                (step === 2 && formData.paymentMethod === 'card' && !cardValid)
              }
              className="flex items-center gap-1.5 px-5 sm:px-8 py-3 sm:py-3.5 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em]
                       hover:bg-ink-light transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                       rounded-xl"
            >
              {step === 3 ? 'Place Order' : 'Continue'}
              {step < 3 && <ChevronRight size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Order Summary */}
      <div className="lg:col-span-2 min-w-0">
        <div className="bg-white border border-border rounded-2xl p-4 sm:p-6 md:p-8 card-shadow sticky top-28">
          <h3 className="font-serif text-lg sm:text-xl text-ink mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border">
            Order Summary
          </h3>

          <div className="space-y-4 mb-6">
            {items.slice(0, 3).map((item) => (
              <div key={item.product.id} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-sand flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink truncate">{item.product.title}</p>
                  <p className="text-[11px] text-text-muted">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-medium text-ink">
                  {item.product.price * item.quantity} KD
                </p>
              </div>
            ))}
            {items.length > 3 && (
              <p className="text-xs text-text-muted text-center">
                +{items.length - 3} more {items.length - 3 === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm pb-4 sm:pb-6 border-b border-border">
            <div className="flex justify-between">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-ink font-medium">{total} KD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Shipping</span>
              <span className={`font-medium ${shipping === 0 ? 'text-success' : 'text-ink'}`}>
                {shipping === 0 ? 'Free' : `${shipping} KD`}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 sm:pt-6 mb-4 sm:mb-6">
            <span className="text-sm sm:text-base font-medium text-ink">Total</span>
            <span className="font-serif text-xl sm:text-2xl text-ink">{grandTotal} KD</span>
          </div>

          {total < 30 && (
            <div className="bg-sand rounded-xl p-3 sm:p-4 text-center">
              <p className="text-[11px] sm:text-xs text-text-secondary">
                Add <span className="text-bronze font-medium">{30 - total} KD</span> more for free shipping
              </p>
              <div className="w-full bg-sand-dark h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-bronze rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (total / 30) * 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-text-muted">
              <Shield size={11} />
              <span>Secure checkout &middot; SSL encrypted</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-text-muted">
              <Truck size={11} />
              <span>Free shipping over 30 KD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
