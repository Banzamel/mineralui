import type {ButtonHTMLAttributes, CSSProperties, ElementType, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export type MButtonVariant = 'filled' | 'secondary' | 'outlined' | 'ghost' | 'link' | 'icon'
export type MButtonShape = 'default' | 'circle'

export interface MButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    component?: ElementType
    to?: string
    href?: string
    variant?: MButtonVariant
    size?: MSize
    color?: MColor
    fullWidth?: boolean
    rounded?: boolean
    shape?: MButtonShape
    iconOnly?: boolean
    loading?: boolean
    active?: boolean
    startIcon?: ReactNode
    endIcon?: ReactNode
    clickEffect?: MClickEffect
    pulsing?: boolean
    badge?: ReactNode | number | boolean
    badgeColor?: MColor
    badgePulsing?: boolean
    rippleColor?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode
}
