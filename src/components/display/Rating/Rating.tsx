import {useState} from 'react'
import type {RatingProps} from './Rating.types'
import {cn} from '../../../utils/cn'
import './Rating.css'

// Render an interactive star-based rating control.
export function Rating({
    value = 0,
    max = 5,
    color = 'warning',
    size = 'md',
    readOnly = false,
    onChange,
    className,
    ...rest
}: RatingProps) {
    const [hovered, setHovered] = useState<number | null>(null)
    const displayValue = hovered ?? value

    const handleClick = (index: number) => {
        if (readOnly) return
        onChange?.(index)
    }

    return (
        <div
            className={cn('rating', color, size, readOnly && 'read-only', className)}
            role="radiogroup"
            aria-label="Rating"
            onMouseLeave={() => setHovered(null)}
            {...rest}
        >
            {Array.from({length: max}, (_, i) => {
                const starIndex = i + 1
                const filled = starIndex <= displayValue
                return (
                    <button
                        key={i}
                        type="button"
                        className={cn('rating-star', filled && 'filled')}
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => !readOnly && setHovered(starIndex)}
                        aria-label={`${starIndex} star${starIndex > 1 ? 's' : ''}`}
                        tabIndex={readOnly ? -1 : 0}
                        disabled={readOnly}
                    >
                        ★
                    </button>
                )
            })}
        </div>
    )
}
