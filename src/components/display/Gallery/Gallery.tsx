import type {GalleryProps} from './Gallery.types'
import {cn} from '../../../utils/cn'
import './Gallery.css'

// Render a responsive image grid gallery.
export function Gallery({
    items,
    columns = 3,
    gap = 'md',
    rounded = true,
    className,
    ...rest
}: GalleryProps) {
    return (
        <div
            className={cn('gallery', `columns-${columns}`, `gap-${gap}`, className)}
            {...rest}
        >
            {items.map((item, i) => (
                <figure key={i} className={cn('gallery-item', rounded && 'rounded')}>
                    <img
                        className="gallery-image"
                        src={item.src}
                        alt={item.alt || ''}
                        loading="lazy"
                    />
                    {item.caption && (
                        <figcaption className="gallery-caption">{item.caption}</figcaption>
                    )}
                </figure>
            ))}
        </div>
    )
}
