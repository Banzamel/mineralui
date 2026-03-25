import type {HTMLAttributes} from 'react'
import type {MineralColor} from '../../../theme'

export interface SliderMark {
    value: number
    label?: string
}

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    min?: number
    max?: number
    step?: number
    value: number
    onChange: (value: number) => void
    marks?: SliderMark[]
    label?: string
    color?: MineralColor
    disabled?: boolean
}
