import {useMemo, useState} from 'react'
import type {DataTableProps, DataTableSort} from './DataTable.types'
import {cn} from '../../../utils/cn'
import './DataTable.css'

function getRowKey<T>(row: T, index: number, rowKey?: string | ((row: T, index: number) => string)): string {
    if (typeof rowKey === 'function') return rowKey(row, index)
    if (typeof rowKey === 'string') return String((row as any)[rowKey])
    return String((row as any).id ?? index)
}

export function DataTable<T = any>({
    columns,
    data,
    rowKey,
    sortable = false,
    filterable = false,
    selectable = false,
    pagination = false,
    pageSize = 10,
    striped = false,
    compact = false,
    stickyHeader = false,
    sort: controlledSort,
    onSortChange,
    selectedKeys: controlledSelected,
    onSelectionChange,
    emptyText = 'No data',
    filterPlaceholder = 'Filter…',
    className,
    ...rest
}: DataTableProps<T>) {
    const [internalSort, setInternalSort] = useState<DataTableSort | null>(null)
    const [internalSelected, setInternalSelected] = useState<string[]>([])
    const [filter, setFilter] = useState('')
    const [page, setPage] = useState(0)

    const activeSort = controlledSort !== undefined ? controlledSort : internalSort
    const selected = controlledSelected ?? internalSelected
    const setSelected = onSelectionChange ?? setInternalSelected

    function handleSort(key: string) {
        let next: DataTableSort | null
        if (activeSort?.key === key) {
            next = activeSort.dir === 'asc' ? {key, dir: 'desc'} : null
        } else {
            next = {key, dir: 'asc'}
        }
        if (onSortChange) onSortChange(next)
        else setInternalSort(next)
        setPage(0)
    }

    const filtered = useMemo(() => {
        if (!filterable || !filter.trim()) return data
        const lc = filter.toLowerCase()
        return data.filter((row) =>
            columns.some((col) => {
                if (col.filterable === false) return false
                const val = (row as any)[col.key]
                return val != null && String(val).toLowerCase().includes(lc)
            })
        )
    }, [data, filter, filterable, columns])

    const sorted = useMemo(() => {
        if (!activeSort) return filtered
        const col = columns.find((c) => c.key === activeSort.key)
        if (!col?.sortable && !sortable) return filtered
        const dir = activeSort.dir === 'asc' ? 1 : -1
        return [...filtered].sort((a, b) => {
            const va = (a as any)[activeSort.key]
            const vb = (b as any)[activeSort.key]
            if (va == null && vb == null) return 0
            if (va == null) return 1
            if (vb == null) return -1
            if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir
            return String(va).localeCompare(String(vb)) * dir
        })
    }, [filtered, activeSort, columns, sortable])

    const totalPages = pagination ? Math.max(1, Math.ceil(sorted.length / pageSize)) : 1
    const pageData = pagination ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted

    const allKeys = pageData.map((row, i) => getRowKey(row, page * pageSize + i, rowKey))
    const allSelected = allKeys.length > 0 && allKeys.every((k) => selected.includes(k))

    function toggleAll() {
        if (allSelected) {
            setSelected(selected.filter((k) => !allKeys.includes(k)))
        } else {
            setSelected([...new Set([...selected, ...allKeys])])
        }
    }

    function toggleRow(key: string) {
        setSelected(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key])
    }

    return (
        <div className={cn('data-table', className)} {...rest}>
            {filterable && (
                <div className="data-table-toolbar">
                    <input
                        type="text"
                        className="data-table-filter"
                        placeholder={filterPlaceholder}
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                            setPage(0)
                        }}
                    />
                </div>
            )}
            <div className="data-table-scroll">
                <table className={cn('data-table-root', striped && 'striped', compact && 'compact')}>
                    <thead className={cn('data-table-head', stickyHeader && 'sticky')}>
                        <tr>
                            {selectable && (
                                <th className="data-table-th data-table-check-col">
                                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                                </th>
                            )}
                            {columns.map((col) => {
                                const isSortable = col.sortable ?? sortable
                                const isSorted = activeSort?.key === col.key
                                return (
                                    <th
                                        key={col.key}
                                        className={cn(
                                            'data-table-th',
                                            isSortable && 'sortable',
                                            isSorted && `sorted-${activeSort!.dir}`
                                        )}
                                        style={{
                                            width: col.width,
                                            textAlign: col.align,
                                        }}
                                        onClick={isSortable ? () => handleSort(col.key) : undefined}
                                    >
                                        <span className="data-table-th-content">
                                            {col.label}
                                            {isSortable && (
                                                <span className="data-table-sort-icon">
                                                    {isSorted ? (activeSort!.dir === 'asc' ? '▲' : '▼') : '⇅'}
                                                </span>
                                            )}
                                        </span>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.length === 0 && (
                            <tr>
                                <td
                                    className="data-table-empty"
                                    colSpan={columns.length + (selectable ? 1 : 0)}
                                >
                                    {emptyText}
                                </td>
                            </tr>
                        )}
                        {pageData.map((row, i) => {
                            const key = getRowKey(row, page * pageSize + i, rowKey)
                            const isSelected = selected.includes(key)
                            return (
                                <tr
                                    key={key}
                                    className={cn('data-table-row', isSelected && 'selected')}
                                >
                                    {selectable && (
                                        <td className="data-table-td data-table-check-col">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleRow(key)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className="data-table-td"
                                            style={{textAlign: col.align}}
                                        >
                                            {col.render
                                                ? col.render((row as any)[col.key], row, page * pageSize + i)
                                                : (row as any)[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {pagination && totalPages > 1 && (
                <div className="data-table-pagination">
                    <button
                        className="data-table-page-btn"
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                    >
                        ‹
                    </button>
                    <span className="data-table-page-info">
                        {page + 1} / {totalPages}
                    </span>
                    <button
                        className="data-table-page-btn"
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    )
}
