import type {HTMLAttributes, ReactNode} from 'react'

export interface DataTableColumn<T = any> {
    key: string
    label: string
    sortable?: boolean
    filterable?: boolean
    render?: (value: any, row: T, index: number) => ReactNode
    width?: string | number
    align?: 'left' | 'center' | 'right'
}

export type DataTableSortDir = 'asc' | 'desc'

export interface DataTableSort {
    key: string
    dir: DataTableSortDir
}

export interface DataTableProps<T = any> extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    columns: DataTableColumn<T>[]
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
    sort?: DataTableSort | null
    onSortChange?: (sort: DataTableSort | null) => void
    selectedKeys?: string[]
    onSelectionChange?: (keys: string[]) => void
    emptyText?: string
    filterPlaceholder?: string
}
