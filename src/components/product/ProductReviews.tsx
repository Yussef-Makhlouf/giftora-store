'use client'

import { useState } from 'react'
import { Star, ThumbsUp, Check, User } from 'lucide-react'

interface Review {
  id: string
  author: string
  rating: number
  date: string
  message: string
  verified: boolean
  helpful: number
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Fatima A.',
    rating: 5,
    date: 'June 10, 2026',
    message: 'Absolutely stunning! The personalization was perfect and it arrived beautifully packaged. My sister was in tears when she opened it. 100% worth every fils.',
    verified: true,
    helpful: 14,
  },
  {
    id: 'r2',
    author: 'Ahmed R.',
    rating: 5,
    date: 'June 5, 2026',
    message: 'Fast delivery and the quality is incredible. This is my third order from Giftora and they never disappoint. The engraving was crisp and exactly as I requested.',
    verified: true,
    helpful: 9,
  },
  {
    id: 'r3',
    author: 'Noor K.',
    rating: 4,
    date: 'May 28, 2026',
    message: 'Really lovely product, very high quality. Took 2 days to arrive which was as expected. The only reason for 4 stars is I wished the box was a bit larger, but the contents are beautiful.',
    verified: true,
    helpful: 6,
  },
  {
    id: 'r4',
    author: 'Sara M.',
    rating: 5,
    date: 'May 20, 2026',
    message: 'Gifted this for a graduation and it was the highlight of the party. Everyone was asking where I got it. The premium packaging alone is gift-worthy!',
    verified: false,
    helpful: 11,
  },
]

const ratingBreakdown = [
  { stars: 5, count: 18 },
  { stars: 4, count: 4 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 1 },
]

const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0)
const averageRating = (ratingBreakdown.reduce((s, r) => s + r.stars * r.count, 0) / totalReviews).toFixed(1)

function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={size}
          className={s <= value ? 'fill-bronze text-bronze' : 'text-border fill-border'}
        />
      ))}
    </div>
  )
}

interface ProductReviewsProps {
  productTitle: string
}

export function ProductReviews({ productTitle }: ProductReviewsProps) {
  const [helpful, setHelpful] = useState<Record<string, boolean>>({})
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleHelpful = (id: string) => {
    setHelpful((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setShowForm(false)
  }

  return (
    <section className="bg-white border-t border-border py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">Customer Reviews</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-1">What Customers Say</h2>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 border border-ink text-ink text-xs font-medium uppercase tracking-[0.1em] hover:bg-ink hover:text-white transition-all duration-200 rounded-xl"
          >
            Write a Review
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {/* Rating Summary */}
          <div className="md:col-span-1">
            <div className="bg-sand-light rounded-2xl p-6 sm:p-8 text-center">
              <span className="font-serif text-5xl sm:text-6xl text-ink">{averageRating}</span>
              <div className="flex justify-center mt-2 mb-1">
                <StarRating value={Math.round(Number(averageRating))} size={16} />
              </div>
              <p className="text-xs text-text-muted">{totalReviews} verified reviews</p>
              <div className="mt-6 space-y-2">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs text-text-secondary w-3 text-right">{r.stars}</span>
                    <Star size={10} className="fill-bronze text-bronze flex-shrink-0" />
                    <div className="flex-1 h-1.5 bg-sand-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-bronze rounded-full transition-all duration-700"
                        style={{ width: `${(r.count / totalReviews) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-text-muted w-4 text-right">{r.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="md:col-span-2 space-y-5 sm:space-y-6">
            {/* Write Review Form */}
            {showForm && !submitted && (
              <form
                onSubmit={handleSubmit}
                className="bg-sand-light border border-border rounded-2xl p-5 sm:p-6 animate-fade-in-up"
              >
                <h3 className="font-serif text-lg text-ink mb-4">Write a Review for {productTitle}</h3>
                <div className="mb-4">
                  <label className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary block mb-2">Your Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewRating(s)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={24}
                          className={s <= (hoverRating || newRating) ? 'fill-bronze text-bronze' : 'text-border fill-border'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary block mb-1.5">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Fatima A."
                    className="w-full px-4 py-3 bg-white border border-border text-sm text-ink placeholder:text-text-muted focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/20 outline-none rounded-xl transition-all"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary block mb-1.5">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share your experience with this product..."
                    className="w-full px-4 py-3 bg-white border border-border text-sm text-ink placeholder:text-text-muted focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/20 outline-none rounded-xl transition-all resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={newRating === 0}
                    className="px-6 py-3 bg-ink text-white text-xs font-medium uppercase tracking-[0.1em] hover:bg-ink-light transition-colors rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-border text-xs font-medium uppercase tracking-[0.1em] text-text-secondary hover:text-ink hover:border-ink transition-colors rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {submitted && (
              <div className="bg-success/5 border border-success/20 rounded-2xl p-5 sm:p-6 flex items-center gap-3 animate-fade-in-up">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-success" />
                </div>
                <div>
                  <p className="font-medium text-ink text-sm">Thank you for your review!</p>
                  <p className="text-xs text-text-secondary mt-0.5">Your feedback helps others make better decisions.</p>
                </div>
              </div>
            )}

            {SAMPLE_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-border rounded-2xl p-5 sm:p-6 hover:border-dusty-rose/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-sand-dark flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink">{review.author}</p>
                      <p className="text-[10px] text-text-muted">{review.date}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-success/8 text-success text-[10px] font-medium rounded-full flex-shrink-0">
                      <Check size={9} />
                      Verified
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <StarRating value={review.rating} size={13} />
                </div>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">{review.message}</p>
                <button
                  onClick={() => handleHelpful(review.id)}
                  className={`inline-flex items-center gap-1.5 text-[11px] sm:text-xs transition-colors ${
                    helpful[review.id] ? 'text-dusty-rose' : 'text-text-muted hover:text-ink'
                  }`}
                >
                  <ThumbsUp size={11} className={helpful[review.id] ? 'fill-dusty-rose' : ''} />
                  Helpful ({review.helpful + (helpful[review.id] ? 1 : 0)})
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
