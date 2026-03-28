import {Children, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import type {CSSProperties, PointerEvent as ReactPointerEvent, ReactNode, WheelEvent as ReactWheelEvent} from 'react'
import {Button} from '../../controls'
import {ShowcaseCarouselItem} from '../ShowcaseCarouselItem'
import {ChevronLeftIcon, ChevronRightIcon} from '../../../icons'
import {cn} from '../../../utils/cn'
import type {ShowcaseCarouselProps, ShowcaseCarouselSlide} from './ShowcaseCarousel.types'
import './ShowcaseCarousel.css'

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

function getSlides<T>(items?: T[], renderItem?: (item: T, index: number) => ReactNode, children?: ReactNode) {
    if (items && renderItem) {
        return items.map((item, index) => renderItem(item, index))
    }

    if (items) {
        return items
            .map((item, index) => {
                if (!isShowcaseItem(item)) {
                    return null
                }

                return <ShowcaseMediaSlide key={index} item={item} />
            })
            .filter(Boolean)
    }

    return Children.toArray(children)
}

function isShowcaseItem(value: unknown): value is ShowcaseCarouselSlide {
    const slide = value as {src?: unknown}
    return !!value && typeof value === 'object' && 'src' in value && typeof slide.src === 'string'
}

function ShowcaseMediaSlide({item}: {item: ShowcaseCarouselSlide}) {
    return (
        <ShowcaseCarouselItem src={item.src} alt={item.alt || ''} overlay={item.overlay} />
    )
}

// Show a centered, mouse-driven carousel with partial side previews.
export function ShowcaseCarousel<T = unknown>({
    items,
    renderItem,
    initialIndex,
    showButtons = true,
    loop = true,
    draggable = true,
    wheel = true,
    itemMinWidth = 220,
    itemMaxWidth = 520,
    itemWidthRatio = 0.56,
    className,
    children,
    style,
    ...rest
}: ShowcaseCarouselProps<T>) {
    const slides = useMemo(() => getSlides(items, renderItem, children), [children, items, renderItem])
    const count = slides.length
    const [active, setActive] = useState(0)
    const [drag, setDrag] = useState(0)
    const [dragging, setDragging] = useState(false)
    const [stageWidth, setStageWidth] = useState(0)
    const stageRef = useRef<HTMLDivElement>(null)
    const startX = useRef(0)
    const wheelLock = useRef(false)

    const widthRatio = stageWidth < 640 ? Math.max(itemWidthRatio, 0.78) : stageWidth < 960 ? Math.max(itemWidthRatio, 0.66) : itemWidthRatio
    const itemWidth = clamp(stageWidth * widthRatio || itemMinWidth, itemMinWidth, itemMaxWidth)
    const itemGap = clamp(stageWidth * 0.022 || 16, 10, 24)

    useEffect(() => {
        const node = stageRef.current
        if (!node) return

        const update = () => setStageWidth(node.clientWidth)
        update()

        const observer = new ResizeObserver(update)
        observer.observe(node)

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!count) return

        const defaultIndex = initialIndex ?? Math.floor((count - 1) / 2)
        setActive(clamp(defaultIndex, 0, count - 1))
    }, [count, initialIndex])

    const goTo = useCallback(
        (nextIndex: number) => {
            if (count < 1) return

            if (loop) {
                setActive((nextIndex + count) % count)
                return
            }

            setActive(clamp(nextIndex, 0, count - 1))
        },
        [count, loop]
    )

    const prev = useCallback(() => goTo(active - 1), [active, goTo])
    const next = useCallback(() => goTo(active + 1), [active, goTo])

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!draggable || count <= 1) return
        event.currentTarget.setPointerCapture(event.pointerId)
        setDragging(true)
        startX.current = event.clientX
        setDrag(0)
    }

    const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!dragging) return
        setDrag(event.clientX - startX.current)
    }

    const stopDrag = () => {
        if (!dragging) return

        const limit = Math.max(56, itemWidth * 0.12)

        if (drag <= -limit) {
            next()
        } else if (drag >= limit) {
            prev()
        }

        setDragging(false)
        setDrag(0)
    }

    const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
        if (!wheel || count <= 1 || wheelLock.current) return

        const axis = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
        if (Math.abs(axis) < 28) return

        event.preventDefault()

        wheelLock.current = true
        window.setTimeout(() => {
            wheelLock.current = false
        }, 260)

        if (axis > 0) {
            next()
        } else {
            prev()
        }
    }

    if (!count) return null

    const offset = stageWidth / 2 - active * (itemWidth + itemGap) - itemWidth / 2 + drag

    return (
        <div className={cn('showcase', className)} style={{...style, '--item-width': `${itemWidth}px`} as CSSProperties} {...rest}>
            <div
                ref={stageRef}
                className="showcase-stage"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={stopDrag}
                onPointerCancel={stopDrag}
                onPointerLeave={stopDrag}
                onWheel={onWheel}
                style={{
                    cursor: draggable && count > 1 ? (dragging ? 'grabbing' : 'grab') : undefined,
                }}
            >
                <div
                    className={cn('showcase-track', dragging && 'dragging')}
                    style={{
                        transform: `translateX(${offset}px)`,
                        gap: `${itemGap}px`,
                    }}
                >
                    {slides.map((slide, index) => {
                        const dist = Math.abs(index - active)

                        return (
                            <div
                                key={index}
                                className={cn(
                                    'showcase-item',
                                    index === active && 'active',
                                    dist === 1 && 'near',
                                    dist >= 2 && 'far'
                                )}
                                style={{zIndex: Math.max(1, count - dist)}}
                            >
                                {slide}
                            </div>
                        )
                    })}
                </div>
            </div>

            {showButtons && count > 1 && (
                <div className="showcase-actions">
                    <Button
                        type="button"
                        variant="secondary"
                        className="showcase-btn"
                        startIcon={<ChevronLeftIcon />}
                        onClick={prev}
                    >
                        Previous
                    </Button>
                    <Button
                        type="button"
                        className="showcase-btn"
                        endIcon={<ChevronRightIcon />}
                        onClick={next}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
