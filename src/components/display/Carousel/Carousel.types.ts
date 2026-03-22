import type {HTMLAttributes, ReactNode} from 'react'

export type CarouselTransition = 'slide' | 'fade'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
    autoPlay?: boolean
    interval?: number
    showDots?: boolean
    showArrows?: boolean
    loop?: boolean
    draggable?: boolean
    transition?: CarouselTransition
    children?: ReactNode
}
