import type {GalleryProps} from './Gallery.types'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Gallery.css'

// Render a responsive image grid gallery.
export function Gallery({items, columns = 3, rounded = true, clickEffect = 'ripple', className, ...rest}: GalleryProps) {
    return (
        <div className={cn('gallery', `columns-${columns}`, className)} {...rest}>
            {items.map((item, i) => (
                <GalleryFigure key={i} item={item} rounded={rounded} clickEffect={clickEffect} />
            ))}
        </div>
    )
}

function GalleryFigure({item, rounded, clickEffect}: {item: {src: string; alt?: string; caption?: string}; rounded: boolean; clickEffect: 'none' | 'ripple'}) {
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLElement>({
        effect: clickEffect,
    })

    return (
        <figure className={cn('gallery-item', rounded && 'rounded', effectClassName)} onPointerDown={handlePointerDown}>
            <img className="gallery-image" src={item.src} alt={item.alt || ''} loading="lazy" />
            {item.caption && <figcaption className="gallery-caption">{item.caption}</figcaption>}
            {effectLayer}
        </figure>
    )
}
