import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {StackGap} from '../Stack/Stack.types'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type InlineAlign = 'start' | 'center' | 'end' | 'stretch'
export type InlineJustify = 'start' | 'center' | 'end' | 'between'
export type InlineWrap = 'wrap' | 'nowrap'

export interface InlineProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    gap?: StackGap
    align?: InlineAlign
    justify?: InlineJustify
    wrap?: InlineWrap
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
