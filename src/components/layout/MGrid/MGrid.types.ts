import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MGridType = 'row' | 'col'
export const mGridColumnValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export type MGridColumns = (typeof mGridColumnValues)[number]

export interface MGridProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    type?: MGridType
    span?: MGridColumns
    sm?: MGridColumns
    md?: MGridColumns
    lg?: MGridColumns
    xl?: MGridColumns
    children?: ReactNode
    className?: string
    style?: CSSProperties
}

export interface MGridItemProps extends Omit<MGridProps, 'type'>, Pick<MGridProps, 'span' | 'sm' | 'md' | 'lg' | 'xl'> {
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
