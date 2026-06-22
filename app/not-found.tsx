'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-light">
      <div className="text-center max-w-md px-6">
        <div className="w-24 h-24 rounded-full bg-sand-dark flex items-center justify-center mx-auto mb-8">
          <span className="font-serif text-4xl text-dusty-rose font-bold">404</span>
        </div>
        <h1 className="font-serif text-4xl text-ink mb-4">Page Not Found</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-white text-sm font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl"
          >
            <Home size={14} />
            Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-text-secondary hover:text-ink text-sm font-medium uppercase tracking-[0.1em] transition-colors rounded-xl"
          >
            <ArrowLeft size={14} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
