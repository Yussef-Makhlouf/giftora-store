import { RefreshCw, AlertCircle, CheckCircle, Clock, XCircle, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const sections = [
  { icon: RefreshCw, title: 'Return Window', content: 'Return non-personalized items within 7 days of delivery for a full refund or exchange. Items must be unused, in original packaging, and in resalable condition.' },
  { icon: AlertCircle, title: 'Personalized Items', content: 'Custom items (mugs, notebooks, engraved accessories) cannot be returned unless there is a manufacturing defect or personalization error on our part. We carefully check every custom order before shipping.' },
  { icon: CheckCircle, title: 'Damaged or Defective', content: 'Contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or full refund at no additional cost, including return shipping.' },
  { icon: RefreshCw, title: 'Return Process', content: 'Email support@giftora.com or call +965 2222 3333 to initiate a return. Our team will provide a return authorization and arrange pickup if applicable.' },
  { icon: Clock, title: 'Refund Timeline', content: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be issued to your original payment method.' },
  { icon: XCircle, title: 'Non-Returnable Items', content: 'Gift cards, personalized items (unless defective), final sale items, and opened food/perishables in gift boxes cannot be returned.' },
]

export default function ReturnsPage() {
  return (
    <div className="bg-sand-light">
      <section className="bg-ink py-24 md:py-32 relative overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">Returns</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6">Return & Refund Policy</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Your satisfaction is our priority. We want you to love your Giftora purchase.</p>
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
            Need help? Email <Link href="mailto:support@giftora.com" className="text-ink underline hover:text-dusty-rose transition-colors">support@giftora.com</Link> or call <Link href="tel:+96522223333" className="text-ink underline hover:text-dusty-rose transition-colors">+965 2222 3333</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
