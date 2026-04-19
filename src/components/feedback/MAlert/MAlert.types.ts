import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps} from '../../../theme'

export interface MAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'hidden'>, MHiddenProps {
    color?: MColor
    icon?: ReactNode | boolean
    title?: ReactNode
    children?: ReactNode
}
