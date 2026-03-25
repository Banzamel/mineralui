import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    color?: MineralColor
    size?: MineralSize
    fcolor?: MineralFontColor
    pulsing?: boolean
    children?: ReactNode
}
