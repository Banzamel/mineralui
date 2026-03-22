import type {CSSProperties} from 'react'
import type {AvatarProps} from './Avatar.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Avatar.css'

function getFallbackInitials(name?: string, initials?: string) {
    if (initials) {
        return initials.slice(0, 2).toUpperCase()
    }

    if (!name) {
        return '?'
    }

    const parts = name.trim().split(/\s+/).filter(Boolean)

    if (parts.length === 0) {
        return '?'
    }

    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase()
    }

    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

// Render user or entity identity as an image with initials fallback.
export function Avatar({
    src,
    alt,
    name,
    initials,
    size = 'md',
    shape = 'circle',
    color,
    fcolor,
    backgroundColor,
    clickEffect,
    rippleColor,
    className,
    style,
    onPointerDown,
    ...rest
}: AvatarProps) {
    const fallbackInitials = getFallbackInitials(name, initials)
    const isInteractive = typeof rest.onClick === 'function' || rest.role === 'button' || rest.tabIndex !== undefined
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect ?? (isInteractive ? 'ripple' : 'none'),
        disabled: !isInteractive,
        color: rippleColor,
    })
    const inlineStyle: CSSProperties =
        typeof size === 'number'
            ? {
                  width: `${size}px`,
                  height: `${size}px`,
                  ...style,
                  ...(backgroundColor ? {backgroundColor} : {}),
              }
            : {
                  ...style,
                  ...(backgroundColor ? {backgroundColor} : {}),
              }

    return (
        <span
            className={cn(
                'avatar',
                typeof size === 'string' && size,
                shape,
                isInteractive && 'interactive',
                effectClassName,
                ...getAppearanceClassNames({color, fcolor}),
                className
            )}
            style={inlineStyle}
            aria-label={alt ?? name ?? 'Avatar'}
            onPointerDown={(event) => {
                handlePointerDown(event)
                onPointerDown?.(event)
            }}
            {...rest}
        >
            {effectLayer}
            {src ? (
                <img src={src} alt={alt ?? name ?? ''} className={'image'} />
            ) : (
                <span className={'fallback'}>{fallbackInitials}</span>
            )}
        </span>
    )
}
