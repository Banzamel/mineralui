import type {HTMLAttributes} from 'react'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MGalleryColumns = 2 | 3 | 4 | 5 | 6

export interface MGalleryItem {
    src: string
    alt?: string
    caption?: string
}

export interface MGalleryProps extends HTMLAttributes<HTMLDivElement> {
    items: MGalleryItem[]
    columns?: MGalleryColumns
    rounded?: boolean
    clickEffect?: MClickEffect
}
