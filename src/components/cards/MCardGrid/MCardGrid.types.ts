import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCardGridFilterKey<T> {
    key: keyof T & string
    label: string
    options?: string[]
}

export interface MCardGridSortKey<T> {
    key: keyof T & string
    label: string
}

export interface MCardGridSort<T = unknown> {
    key: keyof T & string
    direction: 'asc' | 'desc'
}

export interface MCardGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
    items: T[]
    renderCard: (item: T, index: number) => ReactNode
    color?: MColor

    searchable?: boolean
    searchKeys?: (keyof T & string)[]
    searchPlaceholder?: string
    search?: string
    onSearchChange?: (search: string) => void

    filterable?: boolean
    filterKeys?: MCardGridFilterKey<T>[]
    filters?: Record<string, string[]>
    onFiltersChange?: (filters: Record<string, string[]>) => void

    sortable?: boolean
    sortKeys?: MCardGridSortKey<T>[]
    defaultSort?: MCardGridSort<T>
    sort?: MCardGridSort<T> | null
    onSortChange?: (sort: MCardGridSort<T> | null) => void

    pagination?: boolean
    pageSize?: number
    page?: number
    onPageChange?: (page: number) => void
    total?: number

    manualSearch?: boolean
    manualFilters?: boolean
    manualSort?: boolean
    manualPagination?: boolean

    columns?: number
    emptyMessage?: ReactNode
}
