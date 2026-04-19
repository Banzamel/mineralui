import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MAvatarSize = MSize | number
export type MAvatarShape = 'circle' | 'rounded' | 'square'

export interface MAvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'hidden'>, MHiddenProps {
    src?: string
    alt?: string
    name?: string
    initials?: string
    size?: MAvatarSize
    shape?: MAvatarShape
    color?: MColor
    badge?: ReactNode | number | boolean
    badgeColor?: MColor
    badgePulsing?: boolean
    backgroundColor?: string
    clickEffect?: MClickEffect
    rippleColor?: string
    /** Show skeleton placeholder instead of content */
    skeleton?: boolean
    style?: CSSProperties
}
