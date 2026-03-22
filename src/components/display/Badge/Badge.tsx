import type {BadgeProps} from './Badge.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Badge.css'

// Render a compact semantic label for status and metadata.
export function Badge({color = 'primary', size = 'md', fcolor, className, children, ...rest}: BadgeProps) {
    return (
        <span className={cn('badge', color, size, ...getAppearanceClassNames({fcolor}), className)} {...rest}>
            {children}
        </span>
    )
}
