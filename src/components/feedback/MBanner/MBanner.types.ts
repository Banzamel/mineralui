import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps} from '../../../theme'

export type MBannerVariant = 'filled' | 'outlined' | 'ghost'

export interface MBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'hidden'>, MHiddenProps {
    color?: MColor
    variant?: MBannerVariant
    icon?: ReactNode
    action?: ReactNode
    dismissible?: boolean
    onDismiss?: () => void
    children?: ReactNode
}
