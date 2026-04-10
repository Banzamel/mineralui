import {useState} from 'react'
import type {MRatingProps} from './MRating.types'
import {MStarFillIcon, MStarIcon} from '../../../icons'
import {cn} from '../../../utils/cn'
import './MRating.css'

// Render an interactive star-based rating control.
export function MRating({
    value = 0,
    max = 5,
    color = 'warning',
    size = 'md',
    readOnly = false,
    onChange,
    className,
    ...rest
}: MRatingProps) {
    const [hovered, setHovered] = useState<number | null>(null)
    const displayValue = hovered ?? value

    const handleClick = (index: number) => {
        if (readOnly) return
        onChange?.(index)
    }

    return (
        <div
            className={cn('rating', `color-${color}`, size, readOnly && 'read-only', className)}
            role="radiogroup"
            aria-label="MRating"
            onMouseLeave={() => setHovered(null)}
            {...rest}
        >
            {Array.from({length: max}, (_, i) => {
                const starIndex = i + 1
                const filled = displayValue >= starIndex
                return (
                    <button
                        key={i}
                        type="button"
                        className="rating-star"
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => !readOnly && setHovered(starIndex)}
                        aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
                        tabIndex={readOnly ? -1 : 0}
                        disabled={readOnly}
                    >
                        <span className="star-icon" aria-hidden="true">
                            {filled ? <MStarFillIcon /> : <MStarIcon />}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}
