import type {HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MRatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: number
    max?: number
    color?: MColor
    size?: MSize
    readOnly?: boolean
    onChange?: (value: number) => void
}
