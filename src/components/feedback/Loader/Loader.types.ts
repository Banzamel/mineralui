import type {HTMLAttributes} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface LoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    color?: MineralColor
    size?: MineralSize | number
    label?: string
    center?: boolean
    minHeight?: string | number
}
