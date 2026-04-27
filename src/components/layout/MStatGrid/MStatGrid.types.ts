import type {HTMLAttributes, ReactNode} from 'react'
import type {MSimpleGridColumns} from '../MSimpleGrid'

export interface MStatGridProps<T = unknown> extends HTMLAttributes<HTMLDivElement> {
    items?: T[]
    renderItem?: (item: T, index: number) => ReactNode
    columns?: MSimpleGridColumns
    minItemWidth?: string
    children?: ReactNode
}
