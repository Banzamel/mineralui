import type React from 'react'
import type {MSectionProps} from './MSection.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import {useReveal} from '../../../utils/useReveal'
import './MSection.css'

// Render a semantic page section with predefined spacing and tone.
export function MSection({
    as = 'section',
    spacing = 'lg',
    tone = 'default',
    hidden,
    reveal,
    className,
    style,
    children,
    ...rest
}: MSectionProps) {
    const Component = as
    const revealRef = useReveal(reveal)
    const hasReveal = reveal !== undefined && reveal !== false

    return (
        <Component
            ref={hasReveal ? (revealRef as React.RefObject<never>) : undefined}
            className={cn('section', spacing, tone, hasReveal && 'reveal', className)}
            style={style}
            {...getHiddenProps(hidden)}
            {...rest}
        >
            {children}
        </Component>
    )
}
