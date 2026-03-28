import {Children} from 'react'
import type {ReactNode} from 'react'
import {cn} from '../../../utils/cn'
import type {MasonryProps} from './Masonry.types'
import './Masonry.css'

function getItems<T>(items?: T[], renderItem?: (item: T, index: number) => ReactNode, children?: ReactNode) {
    if (items && renderItem) {
        return items.map((item, index) => renderItem(item, index))
    }

    return Children.toArray(children)
}

// Render a responsive masonry wall for images, cards and uneven content.
export function Masonry<T = unknown>({
    items,
    renderItem,
    itemMinWidth = 220,
    className,
    children,
    style,
    ...rest
}: MasonryProps<T>) {
    const content = getItems(items, renderItem, children)

    if (!content.length) return null

    return (
        <div
            className={cn('masonry', className)}
            style={{
                ...style,
                columnWidth: `${itemMinWidth}px`,
            }}
            {...rest}
        >
            {content.map((item, index) => (
                <div key={index} className="masonry item">
                    {item}
                </div>
            ))}
        </div>
    )
}
