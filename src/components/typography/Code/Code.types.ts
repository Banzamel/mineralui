import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'

export interface CodeProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
    color?: MineralColor
    fcolor?: MineralFontColor
    children?: ReactNode
}
