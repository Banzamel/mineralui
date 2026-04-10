import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export type MBannerVariant = 'filled' | 'outlined' | 'ghost'

export interface MBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    color?: MColor
    variant?: MBannerVariant
    icon?: ReactNode
    action?: ReactNode
    dismissible?: boolean
    onDismiss?: () => void
    children?: ReactNode
}
