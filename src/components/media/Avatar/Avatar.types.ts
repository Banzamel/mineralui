import type {CSSProperties, HTMLAttributes} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type AvatarSize = 'sm' | 'md' | 'lg' | number
export type AvatarShape = 'circle' | 'rounded' | 'square'

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    src?: string
    alt?: string
    name?: string
    initials?: string
    size?: AvatarSize
    shape?: AvatarShape
    color?: MineralColor
    fcolor?: MineralFontColor
    backgroundColor?: string
    clickEffect?: MineralClickEffect
    rippleColor?: string
    style?: CSSProperties
}
