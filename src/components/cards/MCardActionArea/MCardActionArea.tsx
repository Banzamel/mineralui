import type {PointerEvent} from 'react'
import type {MCardActionAreaProps} from './MCardActionArea.types'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import {resolveMCardAction, tintCardChildren} from '../shared'
import './MCardActionArea.css'

export function MCardActionArea({
    component,
    to,
    href,
    target,
    rel,
    color,
    interactive = true,
    clickEffect,
    rippleColor,
    className,
    children,
    onPointerDown,
    type,
    ...rest
}: MCardActionAreaProps) {
    const {
        component: Component,
        href: resolvedHref,
        to: resolvedTo,
        isInteractive,
    } = resolveMCardAction({
        component,
        href,
        to,
        interactive,
        hasClickHandler: Boolean(rest.onClick),
        hasPointerHandler: Boolean(onPointerDown),
        fallbackComponent: 'button',
    })
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLElement>({
        effect: clickEffect ?? (isInteractive ? 'ripple' : 'none'),
        disabled: !isInteractive,
        color: rippleColor,
    })

    return (
        <Component
            href={Component === 'a' || component ? resolvedHref : undefined}
            to={resolvedTo}
            target={target}
            rel={rel}
            type={Component === 'button' ? (type ?? 'button') : undefined}
            className={cn(
                'card-action-area',
                color && `color-${color}`,
                isInteractive && 'interactive',
                effectClassName,
                className
            )}
            onPointerDown={(event: PointerEvent<HTMLElement>) => {
                handlePointerDown(event)
                onPointerDown?.(event as PointerEvent<HTMLButtonElement>)
            }}
            {...rest}
        >
            {effectLayer}
            <span className="card-action-area-content">{tintCardChildren(children, color)}</span>
        </Component>
    )
}
