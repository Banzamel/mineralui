import type {GridProps} from './Grid.types'
import {cn} from '../../../utils/cn'
import './Grid.css'

// Render a simple equal-column grid with a shared default spacing.
export function Grid({columns = 2, minItemWidth, className, style, children, ...rest}: GridProps) {
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
