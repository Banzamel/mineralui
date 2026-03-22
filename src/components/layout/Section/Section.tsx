import type {SectionProps} from './Section.types'
import {cn} from '../../../utils/cn'
import './Section.css'

// Render a semantic page section with predefined spacing and tone.
export function Section({
    as = 'section',
    spacing = 'lg',
    tone = 'default',
    className,
    style,
    children,
    ...rest
}: SectionProps) {
    const Component = as

    return (
        <Component className={cn('section', spacing, tone, className)} style={style} {...rest}>
            {children}
        </Component>
    )
}
