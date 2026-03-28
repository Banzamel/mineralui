import type {ImgHTMLAttributes} from 'react'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none'
export type ImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | 'auto'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    fit?: ImageFit
    ratio?: ImageRatio
    rounded?: boolean
    bordered?: boolean
    shadow?: boolean
    clickEffect?: MineralClickEffect
    fallback?: string
}
