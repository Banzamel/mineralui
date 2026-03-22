import type {GridProps} from './Grid.types'
import {cn} from '../../../utils/cn'
import './Grid.css'

// Render a simple equal-column grid with optional responsive min item width.
export function Grid({columns = 2, gap = 'lg', minItemWidth, className, style, children, ...rest}: GridProps) {
    const gapClassName = gap === '2xl' ? 'gap-2xl' : gap

    return (
        <div
            className={cn('grid', `columns-${columns}`, gapClassName, className)}
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
