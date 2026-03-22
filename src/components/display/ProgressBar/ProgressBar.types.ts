import type {HTMLAttributes} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface ProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    value: number
    max?: number
    color?: MineralColor
    size?: MineralSize
    label?: string
    showValue?: boolean
    animated?: boolean
    striped?: boolean
}
