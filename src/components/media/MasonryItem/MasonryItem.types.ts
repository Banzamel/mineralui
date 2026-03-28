import type {ImgHTMLAttributes, ReactNode} from 'react'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface MasonryItemProps {
    src: string
    alt?: string
    height?: number | string
    overlay?: ReactNode
    body?: ReactNode
    footer?: ReactNode
    interactive?: boolean
    imageClickEffect?: MineralClickEffect
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'height'>
    children?: ReactNode
}
