import {useState, useEffect, useRef} from 'react'
import type {CountUpProps} from './CountUp.types'
import {cn} from '../../../utils/cn'

// Animate a number from a start value to a target, with an easing curve.
export function CountUp({
    value,
    from = 0,
    duration = 1000,
    decimals = 0,
    prefix = '',
    suffix = '',
    separator = '',
    className,
    ...rest
}: CountUpProps) {
    const [display, setDisplay] = useState(from)
    const rafRef = useRef<number>(0)
    const startRef = useRef<number | null>(null)

    useEffect(() => {
        const startValue = display
        startRef.current = null

        const step = (timestamp: number) => {
            if (startRef.current === null) startRef.current = timestamp
            const elapsed = timestamp - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = startValue + (value - startValue) * eased

            setDisplay(current)

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step)
            }
        }

        rafRef.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(rafRef.current)
    }, [value, duration])

    const formatted = formatNumber(display, decimals, separator)

    return (
        <span className={cn('count-up', className)} {...rest}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    )
}

function formatNumber(num: number, decimals: number, separator: string): string {
    const fixed = num.toFixed(decimals)
    if (!separator) return fixed

    const [int, dec] = fixed.split('.')
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return dec !== undefined ? `${withSep}.${dec}` : withSep
}
