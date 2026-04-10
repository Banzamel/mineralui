import type {HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MSpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
    color?: MColor | 'inherit'
    size?: MSize | number
    label?: string
}
