import type {CSSProperties} from 'react'
import type {SpinnerProps} from './Spinner.types'
import {cn} from '../../../utils/cn'
import './Spinner.css'

// Render a minimal semantic loading indicator with token-aware sizing and color.
export function Spinner({color = 'primary', size = 'md', label = 'Loading', className, style, ...rest}: SpinnerProps) {
    const inlineStyle: CSSProperties =
        typeof size === 'number'
            ? {
                  width: `${size}px`,
                  height: `${size}px`,
                  ...style,
              }
            : style || {}

    return (
        <span
            className={cn('spinner', typeof size === 'string' && size, color && `color-${color}`, className)}
            style={inlineStyle}
            role="status"
            aria-label={label}
            {...rest}
        />
    )
}
