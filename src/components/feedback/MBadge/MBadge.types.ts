import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps, MSize} from '../../../theme'

export interface MBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'hidden'>, MHiddenProps {
    color?: MColor
    size?: MSize
    pulsing?: boolean
    rounded?: boolean
    fullWidth?: boolean
    icon?: ReactNode
    children?: ReactNode
}
