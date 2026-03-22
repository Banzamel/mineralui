import type {HTMLAttributes} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: number
    max?: number
    color?: MineralColor
    size?: MineralSize
    readOnly?: boolean
    onChange?: (value: number) => void
}
