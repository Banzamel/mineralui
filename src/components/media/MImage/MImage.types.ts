import type {ImgHTMLAttributes} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MImageFit = 'cover' | 'contain' | 'fill' | 'none'
export type MImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | 'auto'

export interface MImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'hidden'>, MHiddenProps {
    fit?: MImageFit
    ratio?: MImageRatio
    rounded?: boolean
    bordered?: boolean
    shadow?: boolean
    clickEffect?: MClickEffect
    fallback?: string
    /** Show skeleton placeholder instead of image */
    skeleton?: boolean
}
