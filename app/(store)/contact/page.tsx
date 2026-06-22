'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

const contactInfo = [
  { icon: Mail, title: 'Email', detail: 'support@giftora.com', detail2: 'orders@giftora.com' },
  { icon: Phone, title: 'Phone & WhatsApp', detail: '+965 2222 3333', detail2: '+965 9998 8888' },
  { icon: MapPin, title: 'Location', detail: 'Block 5, Street 15', detail2: 'Salmiya, Kuwait' },
  { icon: Clock, title: 'Business Hours', detail: 'Sun - Thu: 9:00 AM - 6:00 PM', detail2: 'Fri - Sat: Closed' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className="bg-sand-light">
      <section className="bg-ink py-24 md:py-32 relative overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">Contact</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white mt-4 mb-6">Get in Touch</h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">We&apos;re here to help make your gifting experience perfect</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-serif text-3xl text-ink mb-6">Contact Information</h2>
              <p className="text-text-secondary mb-10 leading-relaxed">Have a question about our products or need help with a custom order? Our team is ready to assist you.</p>
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 bg-sand-dark rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-dusty-rose transition-colors duration-300">
                        <Icon size={18} className="text-ink group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm text-ink mb-0.5">{item.title}</h3>
                        <p className="text-sm text-text-secondary">{item.detail}</p>
                        {item.detail2 && <p className="text-sm text-text-secondary">{item.detail2}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Quick response badge */}
              <div className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-success-light rounded-full">
                <Clock size={12} className="text-success" />
                <span className="text-[11px] font-medium text-success">Average response: under 1 hour</span>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="bg-white border border-border rounded-2xl p-8 md:p-10 card-shadow">
                <h2 className="font-serif text-2xl text-ink mb-6">Send a Message</h2>
                {sent ? (
                  <div className="text-center py-12 animate-scale-in">
                    <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={22} className="text-success" />
                    </div>
                    <h3 className="font-medium text-ink mb-2">Message Sent!</h3>
                    <p className="text-text-secondary text-sm">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">First Name</label>
                        <input type="text" required className="w-full px-4 py-3.5 bg-sand border border-border text-ink text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-xl" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">Last Name</label>
                        <input type="text" required className="w-full px-4 py-3.5 bg-sand border border-border text-ink text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-xl" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">Email</label>
                      <input type="email" required className="w-full px-4 py-3.5 bg-sand border border-border text-ink text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-xl" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">Subject</label>
                      <input type="text" required className="w-full px-4 py-3.5 bg-sand border border-border text-ink text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.1em] text-text-secondary mb-1.5">Message</label>
                      <textarea rows={4} required className="w-full px-4 py-3.5 bg-sand border border-border text-ink text-sm focus:outline-none focus:border-dusty-rose transition-colors resize-none rounded-xl" />
                    </div>
                    <button type="submit" className="w-full py-4 bg-ink text-white text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl flex items-center justify-center gap-2">
                      <Send size={14} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
