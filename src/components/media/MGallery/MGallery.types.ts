import type {HTMLAttributes} from 'react'
import type {MClickEffect} from '../../../utils/useInteractionEffect'
import type {MMediaHoverEffect} from '../mediaInteraction'

export type MGalleryColumns = 2 | 3 | 4 | 5 | 6

export interface MGalleryItem {
    src: string
    /**
     * Optional small-size variant rendered in the grid `<img>`. The lightbox preview always
     * loads the full `src`. When omitted the grid falls back to `src`.
     */
    thumbnail?: string
    alt?: string
    caption?: string
}

export interface MGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: MGalleryItem[]
    columns?: MGalleryColumns
    rounded?: boolean
    preview?: boolean
    hoverEffect?: MMediaHoverEffect
    clickEffect?: MClickEffect
}
