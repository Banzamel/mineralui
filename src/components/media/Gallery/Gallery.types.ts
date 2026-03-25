import type {HTMLAttributes} from 'react'

export type GalleryColumns = 2 | 3 | 4 | 5 | 6

export interface GalleryItem {
    src: string
    alt?: string
    caption?: string
}

export interface GalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: GalleryItem[]
    columns?: GalleryColumns
    gap?: 'sm' | 'md' | 'lg'
    rounded?: boolean
}
