import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    color?: MColor
    icon?: ReactNode | boolean
    title?: ReactNode
    children?: ReactNode
}
