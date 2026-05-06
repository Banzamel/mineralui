import type {CSSProperties} from 'react'
import type {MAvatarPresence, MAvatarProps} from './MAvatar.types'
import type {MColor} from '../../../theme'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import {renderOverlayBadge} from '../../../utils/overlayBadge'
import './MAvatar.css'

function getFallbackInitials(name?: string, initials?: string) {
    if (initials) return initials.slice(0, 2).toUpperCase()
    if (!name) return '?'
    const parts = name.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '?'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

const PRESENCE_BADGE_COLOR: Record<MAvatarPresence, MColor> = {
    online: 'success',
    offline: 'neutral',
    away: 'warning',
    busy: 'error',
}

// Render user or entity identity as an image with initials fallback.
export function MAvatar({
    src,
    alt,
    name,
    initials,
    size = 'md',
    shape = 'circle',
    hidden,
    color,
    badge,
    badgeColor,
    badgePulsing,
    presence,
    backgroundColor,
    clickEffect,
    rippleColor,
    skeleton = false,
    className,
    style,
    onPointerDown,
    ...rest
}: MAvatarProps) {
    const fallbackInitials = getFallbackInitials(name, initials)
    const isInteractive = typeof rest.onClick === 'function' || rest.role === 'button' || rest.tabIndex !== undefined
    const resolvedBadge = badge !== undefined ? badge : presence !== undefined ? true : undefined
    const resolvedBadgeColor = badgeColor ?? (presence !== undefined ? PRESENCE_BADGE_COLOR[presence] : undefined)
    const resolvedBadgePulsing = badgePulsing ?? (presence !== undefined ? true : false)
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect ?? (isInteractive ? 'ripple' : 'none'),
        disabled: !isInteractive || skeleton,
        color: rippleColor,
    })
    const inlineStyle: CSSProperties =
        typeof size === 'number'
            ? {
                  width: `${size}px`,
                  height: `${size}px`,
                  ...style,
                  ...(backgroundColor && !skeleton ? {backgroundColor} : {}),
              }
            : {
                  ...style,
                  ...(backgroundColor && !skeleton ? {backgroundColor} : {}),
              }

    return (
        <span
            className={cn(
                'avatar',
                typeof size === 'string' && size,
                shape,
                skeleton && 'skeleton animate',
                isInteractive && !skeleton && 'interactive',
                effectClassName,
                !skeleton && color && `color-${color}`,
                className
            )}
            style={inlineStyle}
            aria-label={skeleton ? 'Loading' : (alt ?? name ?? 'MAvatar')}
            onPointerDown={(event) => {
                handlePointerDown(event)
                onPointerDown?.(event)
            }}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            {effectLayer}
            {renderOverlayBadge({badge: resolvedBadge, badgeColor: resolvedBadgeColor, badgePulsing: resolvedBadgePulsing})}
            {skeleton ? null : src ? (
                <img src={src} alt={alt ?? name ?? ''} className={'image'} />
            ) : (
                <span className={'fallback'}>{fallbackInitials}</span>
            )}
        </span>
    )
}
