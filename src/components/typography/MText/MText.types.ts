import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MTextTone = 'default' | 'muted' | 'accent'
export type MTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type MTextAlign = 'left' | 'center' | 'right' | 'justify'

export interface MTextProps extends Omit<HTMLAttributes<HTMLElement>, 'color'>, LayoutUtilityProps {
    as?: 'p' | 'span' | 'div' | 'strong' | 'em'
    tone?: MTextTone
    size?: MTextSize
    align?: MTextAlign
    color?: MColor
    weight?: 'normal' | 'medium' | 'semibold' | 'bold'
    /** Single-line ellipsis when true, multi-line clamp when a number */
    truncate?: boolean | number
    children?: ReactNode
}
