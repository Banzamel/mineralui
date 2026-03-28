import type {DividerProps} from './Divider.types'
import {cn} from '../../../utils/cn'
import './Divider.css'

// Render a semantic divider line between related content blocks.
export function Divider({
    orientation = 'horizontal',
    variant = 'solid',
    className,
    style,
    ...rest
}: DividerProps) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn('divider', orientation, variant, className)}
            style={style}
            {...rest}
        />
    )
}
