'use client'

const gateways = [
  {
    name: 'Visa',
    logo: 'https://cdn.simpleicons.org/visa/000000',
    width: 42,
  },
  {
    name: 'Mastercard',
    logo: 'https://cdn.simpleicons.org/mastercard/000000',
    width: 38,
  },
  {
    name: 'KNET',
    logo: '/knet-icon.svg',
    width: 45,
    local: true,
  },
  {
    name: 'Apple Pay',
    logo: 'https://cdn.simpleicons.org/applepay/000000',
    width: 42,
  },
]

export function PaymentLogos() {
  return (
    <div className="flex flex-col xs:flex-row items-center justify-center gap-3 py-3">
      <span className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-medium flex-shrink-0">
        We Accept
      </span>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        {gateways.map((g) => (
          <div
            key={g.name}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-border rounded-lg"
            title={g.name}
          >
            <img
              src={g.logo}
              alt={g.name}
              className="h-5 object-contain brightness-0 opacity-40"
              style={{ width: g.width }}
            />
            {g.local && (
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">
                KNET
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
