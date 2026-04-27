import type {MStatGridProps} from './MStatGrid.types'
import {MSimpleGrid} from '../MSimpleGrid'

export function MStatGrid<T>({
    items,
    renderItem,
    children,
    columns = 4,
    minItemWidth = '15rem',
    ...rest
}: MStatGridProps<T>) {
    return (
        <MSimpleGrid columns={columns} minItemWidth={minItemWidth} {...rest}>
            {items && renderItem ? items.map((item, index) => renderItem(item, index)) : children}
        </MSimpleGrid>
    )
}
