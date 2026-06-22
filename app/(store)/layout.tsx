import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PromoBanner from '@/components/banners/PromoBanner'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PromoBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
