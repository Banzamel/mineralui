import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'

export const gridColumnValues = [1, 2, 3, 4] as const
export type GridColumns = (typeof gridColumnValues)[number]

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: GridColumns
    minItemWidth?: string
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
