import type {MSubTextProps} from './MSubText.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './MSubText.css'

// Render small, muted secondary text for captions, hints and metadata.
export function MSubText({
    as = 'span',
    size = 'sm',
    tone = 'muted',
    color,
    className,
    children,
    ...rest
}: MSubTextProps) {
    const Component = as
    return (
        <Component
            className={cn('subtext', !color && tone, size, ...getAppearanceClassNames({color}), className)}
            {...rest}
        >
            {children}
        </Component>
    )
}
