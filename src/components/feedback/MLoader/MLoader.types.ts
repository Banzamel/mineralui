import type {HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MLoaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    color?: MColor
    size?: MSize | number
    label?: string
    center?: boolean
    minHeight?: string | number
}
