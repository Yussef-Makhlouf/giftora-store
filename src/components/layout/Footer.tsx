import Link from 'next/link'
import { Mail, Phone, MapPin, ArrowUpRight, Package, Heart } from 'lucide-react'
import Logo from '@/components/shared/Logo'

const footerSections = [
  {
    title: 'Shop',
    links: [
      { href: '/shop', label: 'All Products' },
      { href: '/shop?category=Gift%20Boxes', label: 'Gift Boxes' },
      { href: '/shop?category=Mugs', label: 'Mugs' },
      { href: '/shop?category=Notebooks', label: 'Notebooks' },
      { href: '/shop?category=Accessories', label: 'Accessories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact' },
      { href: '/admin-demo', label: 'Admin Demo' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/order-tracking', label: 'Track Order' },
      { href: '/shipping', label: 'Shipping Info' },
      { href: '/returns', label: 'Returns & Refunds' },
      { href: '/privacy', label: 'Privacy Policy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      <div className="bg-noise absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24 relative z-10">
        {/* Newsletter */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-white/10">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Heart size={12} className="text-dusty-rose" />
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-dusty-rose">
                  Stay Inspired
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-1 sm:mb-2">
                Join the Giftora Edit
              </h3>
              <p className="text-white/50 text-xs sm:text-sm max-w-md leading-relaxed">
                Be the first to know about new collections, exclusive offers, and gifting inspiration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-xs sm:text-sm focus:outline-none focus:border-dusty-rose transition-colors rounded-lg sm:rounded-xl"
              />
              <button className="px-5 sm:px-6 py-3 sm:py-3.5 bg-dusty-rose text-ink text-xs sm:text-sm font-medium uppercase tracking-[0.1em] hover:bg-dusty-rose-light transition-colors whitespace-nowrap rounded-lg sm:rounded-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/">
              <Logo
                className="flex items-center gap-2 mb-3 sm:mb-4"
                iconClassName="h-6 sm:h-7 w-auto text-dusty-rose"
                textClassName="font-serif text-xl sm:text-2xl text-dusty-rose font-bold"
              />
            </Link>
            <p className="text-white/40 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-xs">
              Thoughtfully curated gifts for every occasion. Based in Kuwait. Crafted with intention.
            </p>
            <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-white/50">
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-dusty-rose/20 transition-colors">
                  <Mail size={10} className="text-dusty-rose" />
                </div>
                <span className="group-hover:text-white transition-colors truncate">support@giftora.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-dusty-rose/20 transition-colors">
                  <Phone size={10} className="text-dusty-rose" />
                </div>
                <span className="group-hover:text-white transition-colors">+965 2222 3333</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-dusty-rose/20 transition-colors">
                  <MapPin size={10} className="text-dusty-rose" />
                </div>
                <span className="group-hover:text-white transition-colors">Salmiya, Kuwait</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-dusty-rose mb-3 sm:mb-5">
                {section.title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 sm:gap-1.5 group"
                    >
                      {link.label}
                      <ArrowUpRight size={9} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-white/30">
          <p>&copy; 2026 Giftora. University E-Commerce Project. Made with <span className="text-dusty-rose">love</span> in Kuwait.</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
            <Link href="/returns" className="hover:text-white/50 transition-colors">Returns</Link>
            <Link href="/shipping" className="hover:text-white/50 transition-colors">Shipping</Link>
            <Link href="/admin-demo" className="hover:text-white/50 transition-colors flex items-center gap-1">
              <Package size={9} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
