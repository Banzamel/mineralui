import {useEffect, useRef} from 'react'
import type {CSSProperties} from 'react'
import type {MRevealProps} from './MReveal.types'
import {cn} from '../../../utils/cn'

function getRevealOffset(direction: MRevealProps['direction'], distance: number) {
    switch (direction) {
        case 'down':
            return {x: 0, y: -distance}
        case 'left':
            return {x: distance, y: 0}
        case 'right':
            return {x: -distance, y: 0}
        case 'none':
            return {x: 0, y: 0}
        case 'up':
        default:
            return {x: 0, y: distance}
    }
}

export function MReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.46,
    distance = 20,
    once = true,
    trigger = 'view',
    className,
    style,
    ...rest
}: MRevealProps) {
    const revealRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const node = revealRef.current
        if (!node) {
            return
        }

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        node.classList.remove('revealed')

        if (prefersReducedMotion) {
            node.classList.add('revealed')
            return
        }

        if (trigger === 'mount') {
            const frame = window.requestAnimationFrame(() => {
                node.classList.add('revealed')
            })

            return () => window.cancelAnimationFrame(frame)
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        node.classList.add('revealed')
                        if (once) {
                            observer.disconnect()
                        }
                    } else if (!once) {
                        node.classList.remove('revealed')
                    }
                }
            },
            {threshold: 0.2}
        )

        observer.observe(node)

        return () => observer.disconnect()
    }, [delay, direction, distance, duration, once, trigger])

    const offset = getRevealOffset(direction, distance)
    const revealStyle = {
        minWidth: 0,
        maxWidth: '100%',
        '--reveal-delay': `${delay}s`,
        '--reveal-duration': `${duration}s`,
        '--reveal-translate-x': `${offset.x}px`,
        '--reveal-translate-y': `${offset.y}px`,
        ...style,
    } as CSSProperties

    return (
        <div ref={revealRef} className={cn('reveal', className)} style={revealStyle} {...rest}>
            {children}
        </div>
    )
}
