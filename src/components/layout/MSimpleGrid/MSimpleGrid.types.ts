import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'

export const mSimpleGridColumnValues = [1, 2, 3, 4] as const
export type MSimpleGridColumns = (typeof mSimpleGridColumnValues)[number]

export interface MSimpleGridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: MSimpleGridColumns
    minItemWidth?: string
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
