import type {ImgHTMLAttributes} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'
import type {MMediaHoverEffect} from '../mediaInteraction'

export type MImageFit = 'cover' | 'contain' | 'fill' | 'none'
export type MImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | 'auto'
export type MImageSize = number | string

export interface MImageProps
    extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'hidden' | 'width' | 'height'>, MHiddenProps {
    fit?: MImageFit
    ratio?: MImageRatio
    /** Explicit width. Numbers are treated as pixels; strings pass through as CSS values (`'auto'`, `'100%'`, `'12rem'`). */
    width?: MImageSize
    /** Explicit height. Numbers are treated as pixels; strings pass through as CSS values (`'auto'`, `'100%'`, `'12rem'`). */
    height?: MImageSize
    rounded?: boolean
    bordered?: boolean
    shadow?: boolean
    preview?: boolean
    previewGroup?: string
    hoverEffect?: MMediaHoverEffect
    clickEffect?: MClickEffect
    fallback?: string
    /** Show skeleton placeholder instead of image */
    skeleton?: boolean
}
