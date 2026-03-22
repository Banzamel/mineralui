import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    color?: MineralColor
    fcolor?: MineralFontColor
    title?: ReactNode
    children?: ReactNode
}
