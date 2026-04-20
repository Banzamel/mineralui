import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MInlineAlign = 'start' | 'center' | 'end' | 'stretch'
export type MInlineJustify = 'start' | 'center' | 'end' | 'between'
export type MInlineWrap = 'wrap' | 'nowrap'

export interface MInlineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    align?: MInlineAlign
    justify?: MInlineJustify
    wrap?: MInlineWrap
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
