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
    selectedKeys?: string[]
    onSelectionChange?: (keys: string[]) => void
    emptyText?: string
    filterPlaceholder?: string
}
