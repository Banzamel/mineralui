import type {ReactNode} from 'react'
import type {MColor} from '../theme'
import {cn} from './cn'

export interface MOverlayBadgeProps {
    badge?: ReactNode | number | boolean
    badgeColor?: MColor
    badgePulsing?: boolean
    className?: string
}

function hasBadgeContent(badge: MOverlayBadgeProps['badge']) {
    return badge !== undefined && badge !== null && badge !== false
}

export function shouldRenderOverlayBadge({badge, badgeColor, badgePulsing}: MOverlayBadgeProps) {
    return hasBadgeContent(badge)
}

export function renderOverlayBadge({
    badge,
    badgeColor = 'primary',
    badgePulsing = false,
    className,
}: MOverlayBadgeProps) {
    if (!shouldRenderOverlayBadge({badge, badgeColor, badgePulsing})) {
        return null
    }

    const dotOnly = badge === true

    return (
        <span
            className={cn(
                'overlay-badge',
                `color-${badgeColor}`,
                dotOnly && 'dot',
                badgePulsing && 'pulsing',
                className
            )}
            aria-hidden="true"
        >
            {dotOnly ? null : badge}
        </span>
    )
}
