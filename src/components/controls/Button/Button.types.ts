import type {ButtonHTMLAttributes, CSSProperties, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'link' | 'icon'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
    variant?: ButtonVariant
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    fullWidth?: boolean
    rounded?: boolean
    iconOnly?: boolean
    loading?: boolean
    startIcon?: ReactNode
    endIcon?: ReactNode
    clickEffect?: MineralClickEffect
    pulsing?: boolean
    rippleColor?: string
    className?: string
    style?: CSSProperties
    children?: ReactNode
}
