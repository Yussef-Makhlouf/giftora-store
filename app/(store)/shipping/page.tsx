import { Truck, Package, Clock, MapPin, Search, Shield, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const sections = [
  { icon: MapPin, title: 'Delivery Coverage', content: 'We deliver across all areas of Kuwait including Kuwait City, Hawalli, Salmiya, Farwaniya, Ahmadi, Jahra, and surrounding areas.' },
  { icon: Package, title: 'Processing Time', content: 'Orders are processed within 1-2 business days. Personalized items may require an additional 1-2 days for customization. Orders placed on weekends are processed the following Sunday.' },
  { icon: Clock, title: 'Delivery Timeframes', content: 'Standard: 2-3 business days (2 KD). Express: Next business day if ordered before 2 PM (4 KD). Same-day delivery available in select areas (6 KD).' },
  { icon: Truck, title: 'Free Shipping', content: 'Free standard shipping on all orders over 30 KD within Kuwait.' },
  { icon: Search, title: 'Order Tracking', content: 'Receive a tracking number via SMS and email once your order ships. You can also track your order live on our tracking page.' },
  { icon: Shield, title: 'Delivery Notes', content: 'A signature is required upon delivery. After 3 failed attempts, the order will be held for pickup at our Salmiya location.' },
]

const pricing = [
  { method: 'Standard', cost: '2 KD', time: '2-3 business days' },
  { method: 'Express', cost: '4 KD', time: 'Next business day' },
  { method: 'Same-Day', cost: '6 KD', time: 'Within hours' },
  { method: 'Free Shipping', cost: '0 KD', time: 'On orders over 30 KD', highlight: true },
]

export default function ShippingPage() {
  return (
    <div className="bg-sand-light">
      <section className="bg-ink py-24 md:py-32 relative overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">Shipping</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6">Shipping Information</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">We deliver joy across Kuwait with care and speed</p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="-mt-16 relative z-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pricing.map((p) => (
              <div key={p.method} className={`rounded-2xl p-6 text-center card-shadow ${
                p.highlight ? 'bg-dusty-rose text-white ring-2 ring-dusty-rose' : 'bg-white border border-border'
              }`}>
                <p className={`text-2xl font-bold ${p.highlight ? 'text-white' : 'text-ink'}`}>{p.cost}</p>
                <p className={`text-xs font-medium uppercase tracking-[0.1em] mt-1 ${p.highlight ? 'text-white/80' : 'text-text-muted'}`}>{p.method}</p>
                <p className={`text-[10px] mt-1 ${p.highlight ? 'text-white/60' : 'text-text-muted'}`}>{p.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-6">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="bg-white border border-border rounded-2xl p-8 card-shadow-hover transition-all duration-200">
                <div className="w-12 h-12 bg-sand-dark rounded-xl flex items-center justify-center mb-5">
                  <Icon size={20} className="text-ink" />
                </div>
                <h2 className="font-serif text-xl text-ink mb-3">{s.title}</h2>
                <p className="text-text-secondary text-sm leading-relaxed">{s.content}</p>
              </div>
            )
          })}
        </div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 mt-10 p-6 bg-sand border border-border rounded-2xl text-center">
          <p className="text-sm text-text-secondary">
            Questions? Email <Link href="mailto:support@giftora.com" className="text-ink underline hover:text-dusty-rose transition-colors">support@giftora.com</Link> or call <Link href="tel:+96522223333" className="text-ink underline hover:text-dusty-rose transition-colors">+965 2222 3333</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
