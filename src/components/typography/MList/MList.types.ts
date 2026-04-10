import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'color'> {
    ordered?: boolean
    color?: MColor
    children?: ReactNode
}
