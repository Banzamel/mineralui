import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {StackGap} from '../Stack'

export const gridColumnValues = [1, 2, 3, 4] as const
export type GridColumns = (typeof gridColumnValues)[number]

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: GridColumns
    gap?: StackGap
    minItemWidth?: string
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
