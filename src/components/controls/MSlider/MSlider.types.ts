import type {HTMLAttributes} from 'react'
import type {MColor} from '../../../theme'

export interface MSliderMark {
    value: number
    label?: string
}

export interface MSliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    min?: number
    max?: number
    step?: number
    value: number
    onChange: (value: number) => void
    marks?: MSliderMark[]
    label?: string
    color?: MColor
    disabled?: boolean
}
