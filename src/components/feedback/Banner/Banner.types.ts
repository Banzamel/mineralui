import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export type BannerVariant = 'filled' | 'outlined' | 'ghost'

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    color?: MineralColor
    variant?: BannerVariant
    icon?: ReactNode
    action?: ReactNode
    dismissible?: boolean
    onDismiss?: () => void
    children?: ReactNode
}
