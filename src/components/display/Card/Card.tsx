import type {CardProps, CardSectionProps} from './Card.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import {Surface} from '../../layout/Surface'
import './Card.css'

// Compose elevated content blocks that can optionally behave like an interactive surface.
export function Card({
    interactive = false,
    stretch = true,
    tone = 'raised',
    padded = false,
    color,
    fcolor,
    clickEffect,
    rippleColor,
    className,
    children,
    onPointerDown,
    ...rest
}: CardProps) {
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLDivElement>({
        effect: clickEffect ?? (interactive ? 'ripple' : 'none'),
        disabled: !interactive,
        color: rippleColor,
    })

    return (
        <Surface
            tone={tone}
            padded={padded}
            className={cn(
                'card',
                !stretch && 'no-stretch',
                color,
                ...getAppearanceClassNames({fcolor}),
                interactive && 'interactive',
                effectClassName,
                className
            )}
            onPointerDown={(event) => {
                handlePointerDown(event)
                onPointerDown?.(event)
            }}
            {...rest}
        >
            {effectLayer}
            {children}
        </Surface>
    )
}

// Render the top section of a card.
export function CardHeader({className, children, ...rest}: CardSectionProps) {
    return (
        <div className={cn('header', className)} {...rest}>
            {children}
        </div>
    )
}

// Render the main content section of a card.
export function CardBody({className, children, ...rest}: CardSectionProps) {
    return (
        <div className={cn('body', className)} {...rest}>
            {children}
        </div>
    )
}

// Render the bottom section of a card.
export function CardFooter({className, children, ...rest}: CardSectionProps) {
    return (
        <div className={cn('footer', className)} {...rest}>
            {children}
        </div>
    )
}
