import type {HTMLAttributes} from 'react'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type GalleryColumns = 2 | 3 | 4 | 5 | 6

export interface GalleryItem {
    src: string
    alt?: string
    caption?: string
}

export interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[]
    columns?: GalleryColumns
    rounded?: boolean
    clickEffect?: MineralClickEffect
}
