import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCodeProps extends Omit<HTMLAttributes<HTMLElement>, 'color'> {
    color?: MColor
    children?: ReactNode
}
