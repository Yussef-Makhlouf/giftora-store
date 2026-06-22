import RotatingHero from '@/components/banners/RotatingHero'
import CategoryBanner from '@/components/banners/CategoryBanner'
import CollectionBanner from '@/components/banners/CollectionBanner'
import SaleBanner from '@/components/banners/SaleBanner'
import ProductGrid from '@/components/shop/ProductGrid'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { bannerImages } from '@/data/images'
import { Sparkles, Shield, Truck, Gift, ArrowRight, Star, Heart, ShoppingBag, Quote, Camera, ChevronRight, Clock, Medal } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Sparkles,
    title: 'Personalization',
    desc: 'Custom engraving and printing for truly unique gifts that speak from the heart',
  },
  {
    icon: Medal,
    title: 'Premium Quality',
    desc: 'Premium materials and careful curation in every box we create',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Free shipping over 30 KD with express options across Kuwait',
  },
  {
    icon: Heart,
    title: 'Love & Care',
    desc: 'Every gift is hand-wrapped with love, care, and attention to detail',
  }
]

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '25+', label: 'Unique Products' },
  { value: '4.9', label: 'Average Rating' },
  { value: '1hr', label: 'Avg. Response Time' },
]

const testimonials = [
  {
    quote: 'Absolutely stunning gift box! The personalization made it so special. My sister cried when she opened it.',
    author: 'Fatima A.',
    role: 'Verified Buyer',
    rating: 5,
  },
  {
    quote: 'Fast delivery and beautiful packaging. The couple gift box was perfect for our anniversary. Will definitely order again!',
    author: 'Ahmed R.',
    role: 'Verified Buyer',
    rating: 5,
  },
  {
    quote: 'The quality exceeded my expectations. The engraving on the mug was perfect and it came in the cutest packaging.',
    author: 'Noor K.',
    role: 'Verified Buyer',
    rating: 5,
  },
]

const occasions = [
  { label: 'Graduation', icon: '🎓', slug: 'graduation-gift-box' },
  { label: 'Birthday', icon: '🎂', slug: 'birthday-celebration-box' },
  { label: 'Anniversary', icon: '💕', slug: 'couple-gift-box' },
  { label: 'Thank You', icon: '🙏', slug: 'thank-you-gift-box' },
  { label: 'Self-Care', icon: '🧘', slug: 'self-care-gift-box' },
  { label: 'Corporate', icon: '💼', slug: 'office-gift-set' },
]

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8)
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8)
  const accessories = products.filter(
    (p) => p.category === 'Mugs' || p.category === 'Notebooks' || p.category === 'Accessories' || p.category === 'Stationery'
  ).slice(0, 4)
  const homeDecor = products.filter((p) => p.category === 'Home Decor').slice(0, 4)

  return (
    <div>
      <RotatingHero />

      {/* Trust Bar */}
      <section className="bg-ink border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-4 sm:py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-dusty-rose font-bold">{stat.value}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-white/40 uppercase tracking-[0.1em] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Occasion */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              Find by Occasion
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mt-2 sm:mt-3">
              What Are You Celebrating?
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              Browse our curated collections for every special moment
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {occasions.map((occ) => (
              <Link
                key={occ.label}
                href={`/product/${occ.slug}`}
                className="group flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-sand-light hover:bg-dusty-rose/10 border border-border hover:border-dusty-rose/30 transition-all duration-300 hover-lift"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{occ.icon}</span>
                <span className="text-[11px] sm:text-xs font-medium text-ink group-hover:text-dusty-rose transition-colors text-center">
                  {occ.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className="py-16 sm:py-20 md:py-32 bg-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                  <Clock size={12} /> Just In
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mt-1 sm:mt-2">
                  New Arrivals
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm mt-2 sm:mt-3 max-w-md">
                  Fresh additions to our collection — discover something new today.
                </p>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] group"
              >
                View All
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <ProductGrid products={newArrivals} />
            <div className="text-center mt-8 sm:mt-10 md:mt-12 sm:hidden">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-lg sm:rounded-xl"
              >
                View All New Arrivals
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-16 sm:py-20 md:py-32 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
            <div>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Curated for You
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mt-1 sm:mt-2">
                The Giftora Edit
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm mt-2 sm:mt-3 max-w-md">
                Our most-loved selections, handpicked for every occasion worth celebrating.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] group"
            >
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <ProductGrid products={featured} />
          <div className="text-center mt-8 sm:mt-10 md:mt-12 sm:hidden">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-ink text-white text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-lg sm:rounded-xl"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Category Banner — Gift Boxes */}
      <CategoryBanner
        title="Gift Boxes\nCurated with Care"
        description="Each box is thoughtfully assembled with premium items, designed to delight. From graduation to gratitude, find the perfect collection."
        cta="Explore Gift Boxes"
        href="/shop?category=Gift%20Boxes"
        image={bannerImages.categoryGiftBoxes}
      />

      {/* Sale Banner */}
      <section className="bg-sand-light py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <SaleBanner
              image={bannerImages.saleSummer}
              tag="Summer Sale"
              title="Up to 20% Off Gift Boxes"
              subtitle="Celebrate the season with our curated gift box collection at special prices."
              cta="Shop Sale"
              href="/shop?category=Gift%20Boxes"
            />
            <SaleBanner
              image={bannerImages.corporate}
              tag="Corporate Gifting"
              title="Office & Team Gifts"
              subtitle="Premium corporate gift sets for colleagues, clients, and team celebrations."
              cta="Explore Corporate"
              href="/product/office-gift-set"
            />
          </div>
        </div>
      </section>

      {/* Why Giftora */}
      <section className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
              Why Choose Us
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mt-2 sm:mt-3">
              Thoughtfully Made, Beautifully Given
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm mt-3 max-w-md mx-auto">
              We believe every gift should tell a story. Here is what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sand-dark group-hover:bg-dusty-rose transition-all duration-300 mb-4 sm:mb-6 group-hover:shadow-lg group-hover:shadow-dusty-rose/20">
                    <Icon size={20} className="text-ink group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-ink mb-2">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {f.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 sm:py-20 md:py-28 overflow-hidden bg-ink">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">
              Loved by Customers
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mt-2 sm:mt-3">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-300"
              >
                <Quote size={20} className="text-dusty-rose/40 mb-3 sm:mb-4" />
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-xs sm:text-sm font-medium">{t.author}</p>
                    <p className="text-white/40 text-[10px] sm:text-xs">{t.role}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-bronze text-bronze" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Banner — Personalization */}
      <CollectionBanner
        tag="Personalized Gifts"
        title="Made\nYours"
        subtitle="From monogrammed mugs to engraved notebooks — add a name, a date, a message that makes it unforgettable."
        cta="Personalize Now"
        href="/shop"
        image={bannerImages.categoryPersonalization}
        gradient="from-ink/70 via-ink/40 to-transparent"
      />

      {/* Home Decor Preview */}
      {homeDecor.length > 0 && (
        <section className="py-16 sm:py-20 md:py-32 bg-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                  New Category
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mt-1 sm:mt-2">
                  Home & Ambiance
                </h2>
                <p className="text-text-secondary text-xs sm:text-sm mt-2 sm:mt-3 max-w-md">
                  Candles, diffusers, and decor — elevate any space with warmth and style.
                </p>
              </div>
              <Link
                href="/shop?category=Home%20Decor"
                className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-ink transition-colors uppercase tracking-[0.1em] group"
              >
                Explore Home
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <ProductGrid products={homeDecor} />
          </div>
        </section>
      )}

      {/* More Products */}
      <section className="py-16 sm:py-20 md:py-32 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 md:mb-14">
            <div>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
                Discover More
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-ink mt-1 sm:mt-2">
                Mugs, Notebooks & More
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm mt-2 sm:mt-3 max-w-md">
                Everyday essentials made extraordinary — perfect for gifting or treating yourself.
              </p>
            </div>
          </div>
          <ProductGrid products={accessories} />
        </div>
      </section>

      {/* Category Banner — Reversed */}
      <CategoryBanner
        title="Something\nfor Everyone"
        description="From office gifts to romantic surprises — explore categories designed for every relationship and every reason."
        cta="Browse All Categories"
        href="/shop"
        image={bannerImages.categoryEveryone}
        reversed
      />

      {/* Instagram / Social Proof */}
      <section className="py-16 sm:py-20 md:py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Camera size={16} className="text-dusty-rose" />
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Follow Us
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink mt-2">
              @giftora.kuwait
            </h2>
            <p className="text-text-secondary text-xs sm:text-sm mt-2">
              Tag us in your unboxing moments for a chance to be featured
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[bannerImages.instagram1, bannerImages.instagram2, bannerImages.instagram3, bannerImages.instagram4].map((img, i) => (
              <Link
                key={i}
                href="https://instagram.com"
                target="_blank"
                className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group"
              >
                <img
                  src={img}
                  alt={`Giftora Instagram ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={24} className="text-white drop-shadow-lg" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-24 md:py-32 overflow-hidden bg-ink">
        <div className="bg-noise absolute inset-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">
            Ready to Celebrate?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white mt-3 sm:mt-4 mb-4 sm:mb-6 max-w-2xl mx-auto leading-[1.1]">
            Find the Perfect Gift Today
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto mb-8 sm:mb-10">
            Every occasion deserves a thoughtful gift. Let us help you find the one.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 sm:gap-3 group"
          >
            <span className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-dusty-rose text-ink text-xs sm:text-sm font-medium uppercase tracking-[0.15em] hover:bg-dusty-rose-light transition-colors rounded-lg sm:rounded-xl">
              Shop All Gifts
            </span>
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-ink transition-all duration-300">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
