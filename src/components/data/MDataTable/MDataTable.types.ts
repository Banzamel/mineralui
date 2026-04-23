import type {HTMLAttributes, ReactNode} from 'react'

export interface MDataTableColumn<T = any> {
    key: string
    label: string
    sortable?: boolean
    filterable?: boolean
    render?: (value: any, row: T, index: number) => ReactNode
    width?: string | number
    align?: 'left' | 'center' | 'right'
}

export type MDataTableSortDir = 'asc' | 'desc'

export interface MDataTableSort {
    key: string
    dir: MDataTableSortDir
}

export interface MDataTableFilterKey<T = any> {
    key: keyof T & string
    label: string
    options?: string[]
}

export interface MDataTableSortKey<T = any> {
    key: keyof T & string
    label: string
}

export interface MDataTableProps<T = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    columns: MDataTableColumn<T>[]
    data: T[]
    rowKey?: string | ((row: T, index: number) => string)

    sortable?: boolean
    filterable?: boolean
    selectable?: boolean
    pagination?: boolean
    pageSize?: number
    striped?: boolean
    compact?: boolean
    stickyHeader?: boolean

    sort?: MDataTableSort | null
    onSortChange?: (sort: MDataTableSort | null) => void

    search?: string
    onSearchChange?: (search: string) => void
    searchKeys?: (keyof T & string)[]

    filterKeys?: MDataTableFilterKey<T>[]
    filters?: Record<string, string[]>
    onFiltersChange?: (filters: Record<string, string[]>) => void

    sortKeys?: MDataTableSortKey<T>[]

    page?: number
    onPageChange?: (page: number) => void
    total?: number

    manualSearch?: boolean
    manualFilters?: boolean
    manualSort?: boolean
    manualPagination?: boolean

    selectedKeys?: string[]
    onSelectionChange?: (keys: string[]) => void
    emptyText?: string
    filterPlaceholder?: string
}
