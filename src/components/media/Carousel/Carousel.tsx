import {useState, useEffect, useCallback, useRef, Children} from 'react'
import type * as React from 'react'
import type {CarouselProps} from './Carousel.types'
import {cn} from '../../../utils/cn'
import {ChevronLeftIcon, ChevronRightIcon} from '../../../icons'
import './Carousel.css'

// Render a swipeable content slider with arrows, dots and transition modes.
export function Carousel({
    autoPlay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    loop = true,
    draggable = true,
    transition = 'slide',
    className,
    children,
    ...rest
}: CarouselProps) {
    const slides = Children.toArray(children)
    const count = slides.length
    const [active, setActive] = useState(0)
    const [dragOffset, setDragOffset] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const dragStartX = useRef(0)
    const trackRef = useRef<HTMLDivElement>(null)

    const goTo = useCallback(
        (index: number) => {
            if (loop) {
                setActive((index + count) % count)
            } else {
                setActive(Math.max(0, Math.min(index, count - 1)))
            }
        },
        [count, loop]
    )

    const prev = useCallback(() => goTo(active - 1), [active, goTo])
    const next = useCallback(() => goTo(active + 1), [active, goTo])

    useEffect(() => {
        if (!autoPlay || count <= 1 || isDragging) return
        const timer = setInterval(next, interval)
        return () => clearInterval(timer)
    }, [autoPlay, interval, next, count, isDragging])

    const handleDragStart = (clientX: number) => {
        if (!draggable) return
        setIsDragging(true)
        dragStartX.current = clientX
        setDragOffset(0)
    }

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return
        const diff = clientX - dragStartX.current
        setDragOffset(diff)
    }

    const handleDragEnd = () => {
        if (!isDragging) return
        setIsDragging(false)
        const threshold = 50
        if (dragOffset < -threshold) {
            next()
        } else if (dragOffset > threshold) {
            prev()
        }
        setDragOffset(0)
    }

    const onPointerDown = (e: React.PointerEvent) => {
        if (!draggable) return
        e.currentTarget.setPointerCapture(e.pointerId)
        handleDragStart(e.clientX)
    }

    const onPointerMove = (e: React.PointerEvent) => {
        handleDragMove(e.clientX)
    }

    const onPointerUp = () => {
        handleDragEnd()
    }

    if (count === 0) return null

    const isFade = transition === 'fade'
    const trackStyle = !isFade
        ? {transform: `translateX(calc(-${active * 100}% + ${isDragging ? dragOffset : 0}px))`}
        : undefined

    return (
        <div className={cn('carousel', isFade && 'fade', className)} {...rest}>
            <div
                className="carousel-viewport"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                style={{
                    touchAction: draggable ? 'pan-y' : undefined,
                    cursor: draggable ? (isDragging ? 'grabbing' : 'grab') : undefined,
                }}
            >
                <div ref={trackRef} className={cn('carousel-track', isDragging && 'dragging')} style={trackStyle}>
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            className={cn(
                                'carousel-slide',
                                isFade && i === active && 'active',
                                isFade && i !== active && 'hidden'
                            )}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {showArrows && count > 1 && (
                <>
                    <button
                        className="carousel-arrow carousel-arrow-prev"
                        onClick={prev}
                        aria-label="Previous slide"
                        type="button"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        className="carousel-arrow carousel-arrow-next"
                        onClick={next}
                        aria-label="Next slide"
                        type="button"
                    >
                        <ChevronRightIcon />
                    </button>
                </>
            )}

            {showDots && count > 1 && (
                <div className="carousel-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={cn('carousel-dot', i === active && 'active')}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                            type="button"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
