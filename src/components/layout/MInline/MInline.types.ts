import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type MInlineAlign = 'start' | 'center' | 'end' | 'stretch'
export type MInlineJustify = 'start' | 'center' | 'end' | 'between'
export type MInlineWrap = 'wrap' | 'nowrap'

export interface MInlineProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    align?: MInlineAlign
    justify?: MInlineJustify
    wrap?: MInlineWrap
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
