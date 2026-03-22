import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type TextTone = 'default' | 'muted' | 'accent' | 'success' | 'danger'
export type TextSize = 'sm' | 'md' | 'lg'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'>, LayoutUtilityProps {
    as?: 'p' | 'span' | 'div' | 'strong' | 'em'
    tone?: TextTone
    size?: TextSize
    align?: TextAlign
    color?: MineralColor
    fcolor?: MineralFontColor
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    children?: ReactNode
}
