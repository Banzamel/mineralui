import type {HTMLAttributes, ReactNode} from 'react'

export interface MasonryProps<T = unknown> extends HTMLAttributes<HTMLDivElement> {
    items?: T[]
    renderItem?: (item: T, index: number) => ReactNode
    itemMinWidth?: number
    children?: ReactNode
}
