import type {HTMLAttributes, ReactNode} from 'react'

export type MCarouselTransition = 'slide' | 'fade'

export interface MCarouselProps extends HTMLAttributes<HTMLDivElement> {
    autoPlay?: boolean
    interval?: number
    showDots?: boolean
    showArrows?: boolean
    loop?: boolean
    draggable?: boolean
    transition?: MCarouselTransition
    children?: ReactNode
}
