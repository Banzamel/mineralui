import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MBadgeProps extends HTMLAttributes<HTMLSpanElement> {
    color?: MColor
    size?: MSize
    pulsing?: boolean
    rounded?: boolean
    fullWidth?: boolean
    icon?: ReactNode
    children?: ReactNode
}
