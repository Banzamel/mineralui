import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'

export interface ListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'color'> {
    ordered?: boolean
    color?: MineralColor
    fcolor?: MineralFontColor
    children?: ReactNode
}
