# Giftora E-Commerce MVP

A **presentation-ready MVP e-commerce website** for a university project. Giftora is a B2C gift store based in Kuwait offering gift boxes, personalized mugs, notebooks, and customized accessories.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-based theme config)
- **Lucide React** (icons)
- **Framer Motion** (minimal animations)
- **Sonner** (toast notifications)
- **React Context API** (cart state management)
- **Vercel** (deployment target)

## Features

### Customer-Facing Storefront
- 11 pages with full shopping flow
- 10 products with categories, descriptions, and images
- Category filtering and product search
- Functional shopping cart with localStorage persistence
- Quantity controls and subtotal calculation
- Checkout form with payment method selection
- Toast notifications for cart actions
- Fully responsive (mobile, tablet, desktop)
- All required business pages (About, Contact, Shipping, Returns, Privacy)

### Management-Side Demo
- Admin dashboard at `/admin-demo`
- Dashboard metrics cards
- Recent orders table with mock data
- Inventory overview with stock status
- Quick actions panel
- Monthly revenue chart visualization

## Routes

| Route | Page |
|-------|------|
| `/` | Homepage |
| `/shop` | Shop / product grid |
| `/product/[slug]` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout form |
| `/about` | About us |
| `/contact` | Contact us |
| `/shipping` | Shipping information |
| `/returns` | Return & refund policy |
| `/privacy` | Privacy policy |
| `/admin-demo` | Admin dashboard preview |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Install

```bash
cd giftora-store
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push the project to a Git repository
2. Import the repository in [Vercel](https://vercel.com/new)
3. No environment variables needed
4. Click **Deploy**

The project deploys with zero configuration.

## Project Structure

```
giftora-store/
├── app/
│   ├── (store)/          # Storefront route group
│   │   ├── page.tsx      # Homepage
│   │   ├── shop/         # Shop page
│   │   ├── product/      # Product detail pages
│   │   ├── cart/         # Shopping cart
│   │   ├── checkout/     # Checkout form
│   │   ├── about/        # About us
│   │   ├── contact/      # Contact form
│   │   ├── shipping/     # Shipping info
│   │   ├── returns/      # Return policy
│   │   ├── privacy/      # Privacy policy
│   │   └── layout.tsx    # Store layout (navbar + footer)
│   ├── admin-demo/       # Admin dashboard preview
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Tailwind v4 theme & global styles
│   └── not-found.tsx     # 404 page
├── src/
│   ├── components/
│   │   ├── layout/       # Navbar, Footer
│   │   ├── home/         # Homepage sections
│   │   ├── shop/         # Shop components
│   │   ├── product/      # Product card
│   │   ├── shared/       # Shared/reusable components
│   │   └── Providers.tsx # Context providers + toaster
│   ├── data/
│   │   ├── products.ts   # 10 products with full data
│   │   ├── site-content.ts # All copy content
│   │   └── admin-demo.ts # Mock admin data
│   ├── lib/
│   │   ├── cart-context.tsx  # Cart state management
│   │   └── utils.ts     # Utility functions
│   └── types/
│       ├── product.ts    # Product type definitions
│       ├── cart.ts       # Cart types
│       ├── order.ts      # Order types
│       └── admin.ts      # Admin types
```

## Design System

- **Primary:** Warm terracotta (#C17A67)
- **Secondary:** Muted brown (#8B7355)
- **Accent:** Soft peach (#E8B4A0)
- **Background:** Warm white (#FFFBF7)
- **Typography:** Playfair Display (headings) + DM Sans (body)
- **UI:** Rounded corners, soft shadows, generous spacing

## Project Requirements Checklist

- [x] Homepage with hero, categories, featured products
- [x] Product pages (10 products with descriptions and images)
- [x] Shopping cart with add/update/remove
- [x] Checkout with payment method selection
- [x] About Us page
- [x] Contact page with form
- [x] Shipping information page
- [x] Return & refund policy page
- [x] Privacy policy page
- [x] Admin demo dashboard page
- [x] Mobile-friendly responsive design
- [x] Product images (Unsplash placeholders)
- [x] All pricing in KD (Kuwaiti Dinar)

## License

University project — MIT
