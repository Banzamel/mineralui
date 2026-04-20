import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'

export type MSectionSpacing = 'sm' | 'md' | 'lg' | 'xl'
export type MSectionTone = 'default' | 'subtle' | 'surface' | 'inverse'

export interface MSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>, MHiddenProps {
    as?: 'section' | 'div' | 'main' | 'header' | 'footer'
    spacing?: MSectionSpacing
    tone?: MSectionTone
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
