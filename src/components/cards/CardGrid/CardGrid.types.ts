import type {HTMLAttributes, ReactNode} from 'react'

export interface CardGridFilterKey<T> {
    key: keyof T & string
    label: string
    options?: string[]
}

export interface CardGridSortKey<T> {
    key: keyof T & string
    label: string
}

export interface CardGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    items: T[]
    renderCard: (item: T, index: number) => ReactNode
    searchable?: boolean
    searchKeys?: (keyof T & string)[]
    searchPlaceholder?: string
    filterable?: boolean
    filterKeys?: CardGridFilterKey<T>[]
    sortable?: boolean
    sortKeys?: CardGridSortKey<T>[]
    defaultSort?: {key: keyof T & string; direction: 'asc' | 'desc'}
    columns?: number
    gap?: string
    emptyMessage?: ReactNode
}
