import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MGridType = 'row' | 'col'
export type MGridAlign = 'stretch' | 'start' | 'center' | 'end' | 'baseline'
export const mGridColumnValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export type MGridColumns = (typeof mGridColumnValues)[number]

export interface MGridProps extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    type?: MGridType
    sm?: MGridColumns
    md?: MGridColumns
    lg?: MGridColumns
    xl?: MGridColumns
    xxl?: MGridColumns
    align?: MGridAlign
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

export interface MGridItemProps extends Omit<MGridProps, 'type'> {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
