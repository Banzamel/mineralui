import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'
import type {SurfaceProps} from '../../layout'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface CardProps extends Omit<SurfaceProps, 'children'> {
    interactive?: boolean
    stretch?: boolean
    color?: MineralColor
    fcolor?: MineralFontColor
    clickEffect?: MineralClickEffect
    rippleColor?: string
    children?: ReactNode
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
}
