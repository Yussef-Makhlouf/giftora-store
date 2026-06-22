import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function Rating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const getStarFill = (index: number) => {
    const currentRating = interactive && hoverRating > 0 ? hoverRating : rating;
    
    if (currentRating >= index) {
      return 'fill-yellow-400 text-yellow-400';
    } else if (currentRating >= index - 0.5) {
      return 'fill-yellow-400/50 text-yellow-400';
    }
    return 'fill-none text-muted/40';
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(index)}
            onMouseEnter={() => interactive && setHoverRating(index)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            className={cn(
              'transition-all',
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            )}
            aria-label={`Rate ${index} out of ${maxRating}`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                getStarFill(index),
                'transition-colors'
              )}
            />
          </button>
        ))}
      </div>
      {showNumber && (
        <span className="text-sm text-muted ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
