import type {ImgHTMLAttributes, ReactNode} from 'react'
import type {ImageFit, ImageRatio} from '../Image'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface ShowcaseCarouselItemProps {
    src: string
    alt?: string
    overlay?: ReactNode
    body?: ReactNode
    footer?: ReactNode
    interactive?: boolean
    imageClickEffect?: MineralClickEffect
    ratio?: ImageRatio
    fit?: ImageFit
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>
    children?: ReactNode
}
