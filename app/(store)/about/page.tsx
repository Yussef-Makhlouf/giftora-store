import Link from 'next/link'
import { Heart, Gift, Sparkles, Shield, Quote, ArrowRight, Star, MapPin, Clock } from 'lucide-react'

const values = [
  { icon: Heart, title: 'Quality Craftsmanship', desc: 'Every product is carefully selected for premium quality and lasting impression.' },
  { icon: Gift, title: 'Personalization', desc: 'Custom engraving and printing that makes every gift truly one of a kind.' },
  { icon: Sparkles, title: 'Thoughtful Curation', desc: 'Each collection is intentionally designed to celebrate life\'s special moments.' },
  { icon: Shield, title: 'Exceptional Service', desc: 'From browsing to delivery, we ensure every step feels special.' },
]

const stats = [
  { value: '500+', label: 'Happy Customers', icon: Star },
  { value: '25+', label: 'Unique Products', icon: Gift },
  { value: 'All Kuwait', label: 'Delivery Coverage', icon: MapPin },
  { value: '1hr', label: 'Avg. Response', icon: Clock },
]

export default function AboutPage() {
  return (
    <div className="bg-sand-light">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-ink to-ink-light py-20 sm:py-24 md:py-32 overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dusty-rose/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">About Us</span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mt-3 sm:mt-4 mb-4 sm:mb-6 max-w-3xl mx-auto leading-[1.1]">
            Crafting Meaningful Moments
          </h1>
          <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-xl mx-auto">Since 2024, Giftora has been helping people celebrate with intention.</p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-ink/95 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-dusty-rose" />
                  </div>
                  <div>
                    <p className="font-serif text-sm sm:text-base text-dusty-rose font-bold">{s.value}</p>
                    <p className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.1em]">{s.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="w-12 sm:w-14 h-[2px] bg-bronze mb-6 sm:mb-8" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mb-6 sm:mb-8">Our Story</h2>
          <div className="space-y-4 sm:space-y-6 text-text-secondary leading-relaxed text-sm sm:text-base">
            <p className="text-base sm:text-lg">Giftora was born from a simple belief: <span className="text-ink font-medium">every occasion deserves to be celebrated with thoughtfulness and care.</span> We specialize in creating beautifully curated gift boxes and personalized items that transform ordinary moments into extraordinary memories.</p>
            <p>Our journey began with a passion for gift-giving and a commitment to quality. Today, we serve customers across Kuwait with a carefully selected range of gift boxes, personalized mugs, custom notebooks, unique accessories, home decor, and stationery.</p>
            <p>Each product is chosen with intention, crafted with care, and presented with elegance. Whether you&apos;re celebrating a graduation, expressing gratitude, or simply showing someone you care, Giftora helps you make every moment count.</p>
          </div>
          {/* Quote */}
          <div className="relative mt-8 sm:mt-12 pl-6 sm:pl-8 border-l-2 border-dusty-rose">
            <Quote size={18} className="text-dusty-rose absolute -left-3 -top-2" />
            <p className="text-base sm:text-lg font-serif text-ink italic">The perfect gift is not about the price tag, but the thought behind it.</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 sm:py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-dusty-rose/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <div className="w-12 sm:w-14 h-[2px] bg-dusty-rose mx-auto mb-6 sm:mb-8" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mb-4 sm:mb-6">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed text-sm sm:text-base md:text-lg">To make gift-giving effortless and meaningful. We believe the perfect gift should reflect the thought behind it — which is why we offer personalization options and carefully curated collections for every occasion, from birthdays to corporate events.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink text-center mb-2 sm:mb-4">Our Values</h2>
          <p className="text-text-secondary text-xs sm:text-sm text-center mb-10 sm:mb-16 max-w-lg mx-auto">What drives us every day to create the best gifting experience</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sand-dark flex items-center justify-center mx-auto mb-4 sm:mb-5 group-hover:bg-dusty-rose transition-all duration-300 group-hover:shadow-lg group-hover:shadow-dusty-rose/20">
                    <Icon size={20} className="text-ink group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-ink mb-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team / Trust */}
      <section className="bg-sand-dark/50 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mb-4 sm:mb-6">Why Giftora?</h2>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10">
            We are a small, passionate team based in Kuwait dedicated to making gift-giving a joyful experience. 
            From hand-wrapping each box to providing personalized customer service, every detail matters to us.
            When you choose Giftora, you&apos;re not just buying a gift — you&apos;re creating a moment.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-left">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 card-shadow">
              <p className="text-dusty-rose font-serif text-xl sm:text-2xl font-bold mb-1">100%</p>
              <p className="text-xs sm:text-sm text-ink font-medium">Hand-Wrapped with Care</p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-1">Every order is individually wrapped by our team</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 card-shadow">
              <p className="text-dusty-rose font-serif text-xl sm:text-2xl font-bold mb-1">4.9 ★</p>
              <p className="text-xs sm:text-sm text-ink font-medium">Average Customer Rating</p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-1">Based on verified customer reviews</p>
            </div>
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 card-shadow">
              <p className="text-dusty-rose font-serif text-xl sm:text-2xl font-bold mb-1">24hr</p>
              <p className="text-xs sm:text-sm text-ink font-medium">Fast Dispatch</p>
              <p className="text-[11px] sm:text-xs text-text-muted mt-1">Most orders are packed and shipped within 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 sm:py-20 text-center relative overflow-hidden">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">Start Celebrating</h2>
          <p className="text-white/50 text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto">Explore our collection and find the perfect gift for your next occasion</p>
          <Link href="/shop" className="inline-flex items-center gap-2 sm:gap-3 group">
            <span className="px-8 sm:px-10 py-3 sm:py-4 bg-dusty-rose text-ink text-xs sm:text-sm font-medium uppercase tracking-[0.15em] hover:bg-dusty-rose-light transition-colors rounded-lg sm:rounded-xl">
              Shop Now
            </span>
            <ArrowRight size={14} className="text-white/70 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  )
}
