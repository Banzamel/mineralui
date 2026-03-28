import type React from 'react'
import type {SectionProps} from './Section.types'
import {cn} from '../../../utils/cn'
import {useReveal} from '../../../utils/useReveal'
import './Section.css'

// Render a semantic page section with predefined spacing and tone.
export function Section({
    as = 'section',
    spacing = 'lg',
    tone = 'default',
    reveal,
    className,
    style,
    children,
    ...rest
}: SectionProps) {
    const Component = as
    const revealRef = useReveal(reveal)
    const hasReveal = reveal !== undefined && reveal !== false

    return (
        <Component
            ref={hasReveal ? (revealRef as React.RefObject<never>) : undefined}
            className={cn('section', spacing, tone, hasReveal && 'mineral-reveal', className)}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    )
}
