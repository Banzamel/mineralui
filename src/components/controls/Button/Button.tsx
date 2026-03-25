import {forwardRef} from 'react'
import type {ButtonProps} from './Button.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Button.css'

// Render the main action primitive with semantic variants and built-in click feedback.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        variant = 'primary',
        size = 'md',
        color = 'primary',
        fcolor,
        fullWidth = false,
        rounded = false,
        iconOnly = false,
        loading = false,
        pulsing = false,
        startIcon,
        endIcon,
        clickEffect = 'ripple',
        rippleColor,
        className,
        style,
        children,
        disabled = false,
        type = 'button',
        onPointerDown,
        onKeyDown,
        ...rest
    },
    ref
) {
    const isDisabled = disabled || loading
    const {effectClassName, effectLayer, handlePointerDown, triggerEffect} = useInteractionEffect<HTMLButtonElement>({
        effect: clickEffect,
        disabled: isDisabled,
        centered: iconOnly,
        color: rippleColor,
    })

    return (
        <button
            ref={ref}
            type={type}
            className={cn(
                'button',
                variant,
                size,
                color,
                ...getAppearanceClassNames({fcolor}),
                fullWidth && 'full-width',
                rounded && 'rounded',
                iconOnly && 'icon-only',
                loading && 'loading',
                pulsing && 'pulsing',
                isDisabled && 'disabled',
                effectClassName,
                className
            )}
            style={style}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            onPointerDown={(event) => {
                handlePointerDown(event)
                onPointerDown?.(event)
            }}
            onKeyDown={(event) => {
                if (event.key === ' ' || event.key === 'Enter') {
                    triggerEffect(event.currentTarget)
                }

                onKeyDown?.(event)
            }}
            {...rest}
        >
            {effectLayer}
            {loading && <span className="spinner" aria-hidden="true" />}
            {startIcon && <span className="icon start">{startIcon}</span>}
            {children && <span className="content">{children}</span>}
            {endIcon && <span className="icon end">{endIcon}</span>}
        </button>
    )
})
