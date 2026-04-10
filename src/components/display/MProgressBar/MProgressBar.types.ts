import type {HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MProgressBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    value: number
    max?: number
    color?: MColor
    size?: MSize
    label?: string
    showValue?: boolean
    animated?: boolean
    striped?: boolean
}
