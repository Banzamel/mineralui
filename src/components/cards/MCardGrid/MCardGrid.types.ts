import type {HTMLAttributes, ReactNode} from 'react'

export interface MCardGridFilterKey<T> {
    key: keyof T & string
    label: string
    options?: string[]
}

export interface MCardGridSortKey<T> {
    key: keyof T & string
    label: string
}

export interface MCardGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    items: T[]
    renderCard: (item: T, index: number) => ReactNode
    searchable?: boolean
    searchKeys?: (keyof T & string)[]
    searchPlaceholder?: string
    filterable?: boolean
    filterKeys?: MCardGridFilterKey<T>[]
    sortable?: boolean
    sortKeys?: MCardGridSortKey<T>[]
    defaultSort?: {key: keyof T & string; direction: 'asc' | 'desc'}
    columns?: number
    emptyMessage?: ReactNode
}
