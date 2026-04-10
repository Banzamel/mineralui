import type {MSimpleGridProps} from './MSimpleGrid.types'
import {cn} from '../../../utils/cn'
import './MSimpleGrid.css'

// Render a simple equal-column grid with a shared default spacing.
export function MSimpleGrid({columns = 2, minItemWidth, className, style, children, ...rest}: MSimpleGridProps) {
    return (
        <div
            className={cn('grid', `columns-${columns}`, className)}
            style={{
                ...(minItemWidth ? {'--grid-min-item-width': minItemWidth} : {}),
                ...style,
            }}
            {...rest}
        >
            {children}
        </div>
    )
}
