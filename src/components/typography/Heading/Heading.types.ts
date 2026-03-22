import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'> {
    level?: HeadingLevel
    color?: MineralColor
    fcolor?: MineralFontColor
    children?: ReactNode
}
