import type {HTMLAttributes} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    color?: MineralColor
    size?: MineralSize | number
    label?: string
}
