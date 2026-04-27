import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MInlineAlign = 'start' | 'center' | 'end' | 'stretch'
export type MInlineJustify = 'start' | 'center' | 'end' | 'between'
export type MInlineWrap = 'wrap' | 'nowrap'

// `spacing` is intentionally excluded — MInline already has a built-in flex gap between children.
// Users reaching for `spacing` to widen that gap would instead get an outer margin, which combined
// with `fullWidth` overflows the parent container. Use `padding` or `mx/my` when outer spacing is needed.
export interface MInlineProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, Omit<LayoutUtilityProps, 'spacing'>, MHiddenProps {
    align?: MInlineAlign
    justify?: MInlineJustify
    wrap?: MInlineWrap
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
