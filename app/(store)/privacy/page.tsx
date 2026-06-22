import { Shield, Eye, Lock, Mail, Cookie, UserCheck } from 'lucide-react'
import Link from 'next/link'

const sections = [
  { icon: Eye, title: 'Information We Collect', content: 'Name, email address, phone number, delivery address, and payment details when you place an order. We also collect browsing data to improve your shopping experience.' },
  { icon: Shield, title: 'How We Use Your Information', content: 'To process orders, arrange delivery, communicate about your purchase, provide customer support, and send promotional offers with your consent. We never sell your personal data to third parties.' },
  { icon: Lock, title: 'Data Security', content: 'Industry-standard SSL encryption for all transactions. Payment processing is handled through secure, encrypted channels. We regularly update our security practices to keep your data safe.' },
  { icon: Mail, title: 'Communication Preferences', content: 'You may receive order confirmations, shipping updates, and occasional promotional emails. You can unsubscribe from marketing communications at any time.' },
  { icon: Cookie, title: 'Cookies', content: 'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser preferences.' },
  { icon: UserCheck, title: 'Your Rights', content: 'You have the right to access, update, or delete your personal information. Contact us at support@giftora.com to exercise these rights or if you have any privacy concerns.' },
]

export default function PrivacyPage() {
  return (
    <div className="bg-sand-light">
      <section className="bg-ink py-24 md:py-32 relative overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">Privacy</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6">Privacy Policy</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">We respect your privacy and are committed to protecting your personal information.</p>
          <p className="text-white/30 text-xs mt-4">Last updated: June 2026</p>
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
            Questions? Contact <Link href="mailto:support@giftora.com" className="text-ink underline hover:text-dusty-rose transition-colors">support@giftora.com</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
