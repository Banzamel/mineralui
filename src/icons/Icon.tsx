import {forwardRef} from 'react'
import type {IconProps} from './Icon.types'

const sizeMap = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
} as const

const colorMap = {
    primary: 'var(--mineral-primary)',
    neutral: 'var(--mineral-neutral)',
    success: 'var(--mineral-success)',
    error: 'var(--mineral-error)',
    warning: 'var(--mineral-warning)',
    info: 'var(--mineral-info)',
    danger: 'var(--mineral-danger)',
    inherit: 'inherit',
} as const

// Shared icon wrapper keeps stroke and sizing consistent across the set.
export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    {
        size = '1.1em',
        color = 'inherit',
        title,
        children,
        viewBox = '0 0 24 24',
        fill = 'none',
        stroke = 'currentColor',
        strokeWidth = 1.8,
        strokeLinecap = 'round',
        strokeLinejoin = 'round',
        style,
        ...rest
    },
    ref
) {
    const iconSize = Object.prototype.hasOwnProperty.call(sizeMap, size)
        ? sizeMap[size as keyof typeof sizeMap]
        : size
    const iconColor = colorMap[color]

    return (
        <svg
            ref={ref}
            width={iconSize}
            height={iconSize}
            viewBox={viewBox}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap}
            strokeLinejoin={strokeLinejoin}
            aria-hidden={title ? undefined : true}
            focusable="false"
            style={{
                display: 'inline-block',
                flexShrink: 0,
                verticalAlign: '-0.150em',
                ...style,
                color: iconColor ?? style?.color,
            }}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            {children}
        </svg>
    )
})
