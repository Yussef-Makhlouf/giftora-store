'use client'

import { Check } from 'lucide-react'

export type OrderStep = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'

interface OrderProgressProps {
  currentStatus: OrderStep
  estimatedDelivery?: string
  orderId?: string
}

const steps: { key: OrderStep; label: string; description: string }[] = [
  { key: 'confirmed', label: 'Order Confirmed', description: 'Your order has been placed' },
  { key: 'processing', label: 'Processing', description: 'Preparing your items' },
  { key: 'shipped', label: 'Shipped', description: 'On its way to you' },
  { key: 'delivered', label: 'Delivered', description: 'Arrived at destination' },
]

const stepIndex: Record<OrderStep, number> = {
  pending: -1,
  confirmed: 0,
  processing: 1,
  shipped: 2,
  delivered: 3,
}

export function OrderProgress({ currentStatus, estimatedDelivery, orderId }: OrderProgressProps) {
  const currentIndex = stepIndex[currentStatus] ?? -1

  return (
    <div className="bg-white border border-border rounded-2xl p-4 sm:p-6 md:p-8 card-shadow">
      {orderId && (
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-border gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-medium">
              Order Number
            </p>
            <p className="font-mono text-xs sm:text-sm text-ink font-medium truncate">{orderId}</p>
          </div>
          {estimatedDelivery && (
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-medium">
                Est. Delivery
              </p>
              <p className="text-xs sm:text-sm font-medium text-dusty-rose">{estimatedDelivery}</p>
            </div>
          )}
        </div>
      )}

      <div className="relative">
        {currentIndex === -1 && (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-warning-light flex items-center justify-center mx-auto mb-4">
              <div className="w-3 h-3 bg-warning rounded-full animate-pulse-soft" />
            </div>
            <h3 className="font-serif text-xl text-ink mb-1">Pending Confirmation</h3>
            <p className="text-sm text-text-secondary">Your order is awaiting payment confirmation</p>
          </div>
        )}

        {currentIndex >= 0 && (
          <div className="space-y-0">
            {steps.map((step, index) => {
              const isCompleted = index <= currentIndex
              const isCurrent = index === currentIndex
              const isUpcoming = index > currentIndex

              return (
                <div key={step.key} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-[15px] top-8 w-0.5 h-full -z-10 transition-colors duration-500 ${
                        isCompleted ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  )}

                  <div className="relative flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-8 h-8 rounded-full bg-dusty-rose flex items-center justify-center animate-pulse-soft"
                        style={{ animationDuration: '2s' }}
                      >
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-sand-dark flex items-center justify-center">
                        <div className="w-2 h-2 bg-text-muted rounded-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 pt-1">
                    <p
                      className={`font-medium text-sm transition-colors duration-300 ${
                        isCompleted
                          ? 'text-success'
                          : isCurrent
                          ? 'text-ink'
                          : 'text-text-muted'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 transition-colors duration-300 ${
                        isCurrent ? 'text-text-secondary' : 'text-text-muted'
                      }`}
                    >
                      {isCompleted ? step.description : isCurrent ? 'In progress...' : step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
