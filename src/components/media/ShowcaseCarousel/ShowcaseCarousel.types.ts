import type {HTMLAttributes, ReactNode} from 'react'

export interface ShowcaseCarouselSlide {
    src: string
    alt?: string
    overlay?: ReactNode
}

export interface ShowcaseCarouselProps<T = unknown> extends HTMLAttributes<HTMLDivElement> {
    items?: T[]
    renderItem?: (item: T, index: number) => ReactNode
    initialIndex?: number
    showButtons?: boolean
    loop?: boolean
    draggable?: boolean
    wheel?: boolean
    itemMinWidth?: number
    itemMaxWidth?: number
    itemWidthRatio?: number
    children?: ReactNode
}
