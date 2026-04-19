import type {MDividerProps} from './MDivider.types'
import {getHiddenProps} from '../../../theme'
import {cn} from '../../../utils/cn'
import './MDivider.css'

// Render a semantic divider line between related content blocks.
export function MDivider({
    orientation = 'horizontal',
    variant = 'solid',
    hidden,
    className,
    style,
    ...rest
}: MDividerProps) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn('divider', orientation, variant, className)}
            style={style}
            {...getHiddenProps(hidden)}
            {...rest}
        />
    )
}
