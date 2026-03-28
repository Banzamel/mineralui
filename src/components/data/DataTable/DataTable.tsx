import {useMemo, useState} from 'react'
import type {DataTableProps, DataTableSort} from './DataTable.types'
import {Checkbox} from '../../controls'
import {InputSearch} from '../../inputs'
import {MPagination} from '../../layout'
import {ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon} from '../../../icons'
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
    filterPlaceholder = 'Search...',
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

        const query = filter.toLowerCase()

        return data.filter((row) =>
            columns.some((col) => {
                if (col.filterable === false) return false

                const value = (row as any)[col.key]
                return value != null && String(value).toLowerCase().includes(query)
            })
        )
    }, [data, filter, filterable, columns])

    const sorted = useMemo(() => {
        if (!activeSort) return filtered

        const col = columns.find((item) => item.key === activeSort.key)
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

    const allKeys = pageData.map((row, index) => getRowKey(row, page * pageSize + index, rowKey))
    const allSelected = allKeys.length > 0 && allKeys.every((key) => selected.includes(key))

    function toggleAll() {
        if (allSelected) {
            setSelected(selected.filter((key) => !allKeys.includes(key)))
        } else {
            setSelected([...new Set([...selected, ...allKeys])])
        }
    }

    function toggleRow(key: string) {
        setSelected(selected.includes(key) ? selected.filter((item) => item !== key) : [...selected, key])
    }

    function handleRowClick(key: string, event: React.MouseEvent) {
        const target = event.target as HTMLElement
        if (target.closest('button, a, [data-no-row-select]')) return
        toggleRow(key)
    }

    return (
        <div className={cn('data-table', className)} {...rest}>
            {filterable && (
                <div className="toolbar">
                    <InputSearch
                        className="filter-search"
                        size="sm"
                        fullWidth
                        placeholder={filterPlaceholder}
                        value={filter}
                        onChange={(event) => {
                            setFilter(event.target.value)
                            setPage(0)
                        }}
                        onClear={() => {
                            setFilter('')
                            setPage(0)
                        }}
                    />
                </div>
            )}
            <div className="scroll">
                <table className={cn('root', striped && 'striped', compact && 'compact')}>
                    <thead className={cn('head', stickyHeader && 'sticky')}>
                        <tr>
                            {selectable && (
                                <th className="th check-col">
                                    <Checkbox checked={allSelected} onChange={toggleAll} size="sm" clickEffect="none" />
                                </th>
                            )}
                            {columns.map((col) => {
                                const isSortable = col.sortable ?? sortable
                                const isSorted = activeSort?.key === col.key

                                return (
                                    <th
                                        key={col.key}
                                        className={cn(
                                            'th',
                                            isSortable && 'sortable',
                                            isSorted && `sorted-${activeSort!.dir}`
                                        )}
                                        style={{
                                            width: col.width,
                                            textAlign: col.align,
                                        }}
                                        onClick={isSortable ? () => handleSort(col.key) : undefined}
                                    >
                                        <span className="th-content">
                                            {col.label}
                                            {isSortable && (
                                                <span className="sort-icon">
                                                    {isSorted ? (
                                                        activeSort!.dir === 'asc' ? (
                                                            <ArrowUpIcon aria-hidden="true" />
                                                        ) : (
                                                            <ArrowDownIcon aria-hidden="true" />
                                                        )
                                                    ) : (
                                                        <ArrowUpDownIcon aria-hidden="true" />
                                                    )}
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
                                <td className="empty" colSpan={columns.length + (selectable ? 1 : 0)}>
                                    {emptyText}
                                </td>
                            </tr>
                        )}
                        {pageData.map((row, index) => {
                            const key = getRowKey(row, page * pageSize + index, rowKey)
                            const isSelected = selected.includes(key)

                            return (
                                <tr
                                    key={key}
                                    className={cn('row', isSelected && 'selected', selectable && 'selectable')}
                                    onClick={selectable ? (event) => handleRowClick(key, event) : undefined}
                                >
                                    {selectable && (
                                        <td className="td check-col">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => {}}
                                                size="sm"
                                                clickEffect="none"
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className="td" style={{textAlign: col.align}}>
                                            {col.render
                                                ? col.render((row as any)[col.key], row, page * pageSize + index)
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
                <MPagination
                    total={sorted.length}
                    page={page + 1}
                    pageSize={pageSize}
                    onChange={(nextPage) => setPage(nextPage - 1)}
                />
            )}
        </div>
    )
}
