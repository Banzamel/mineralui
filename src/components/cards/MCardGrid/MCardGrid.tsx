import {Fragment, useState, useMemo, useRef, useCallback} from 'react'
import type {MCardGridProps, MCardGridSort} from './MCardGrid.types'
import {cn} from '../../../utils/cn'
import {MButton, MCheckbox} from '../../controls'
import {MInputSearch} from '../../inputs'
import {MPagination} from '../../layout'
import {MPopover} from '../../primitives'
import {MArrowDownIcon, MArrowUpIcon, MFilterIcon, MSortIcon} from '../../../icons'
import './MCardGrid.css'

function getNestedValue(obj: unknown, key: string): unknown {
    const parts = key.split('.')
    let val: unknown = obj

    for (const p of parts) {
        if (val == null || typeof val !== 'object') return undefined
        val = (val as Record<string, unknown>)[p]
    }

    return val
}

export function MCardGrid<T extends Record<string, unknown>>({
    items,
    renderCard,
    color = 'primary',
    searchable = false,
    searchKeys,
    searchPlaceholder = 'Search...',
    search: controlledSearch,
    onSearchChange,
    filterable = false,
    filterKeys = [],
    filters: controlledFilters,
    onFiltersChange,
    sortable = false,
    sortKeys = [],
    defaultSort,
    sort: controlledSort,
    onSortChange,
    pagination = false,
    pageSize = 12,
    page: controlledPage,
    onPageChange,
    total,
    manualSearch = false,
    manualFilters = false,
    manualSort = false,
    manualPagination = false,
    columns = 3,
    emptyMessage = 'No results found.',
    className,
    style,
    ...rest
}: MCardGridProps<T>) {
    const [internalSearch, setInternalSearch] = useState('')
    const [internalFilters, setInternalFilters] = useState<Record<string, string[]>>({})
    const [internalSort, setInternalSort] = useState<MCardGridSort<T> | null>(defaultSort ?? null)
    const [internalPage, setInternalPage] = useState(1)
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const filterBtnRef = useRef<HTMLElement>(null)
    const sortBtnRef = useRef<HTMLElement>(null)

    const search = controlledSearch !== undefined ? controlledSearch : internalSearch
    const filters = controlledFilters !== undefined ? controlledFilters : internalFilters
    const sort = controlledSort !== undefined ? controlledSort : internalSort
    const page = controlledPage !== undefined ? controlledPage : internalPage

    const setSearch = useCallback(
        (next: string) => {
            if (controlledSearch === undefined) setInternalSearch(next)
            if (!manualPagination && controlledPage === undefined) setInternalPage(1)
            onSearchChange?.(next)
        },
        [controlledSearch, controlledPage, manualPagination, onSearchChange]
    )

    const setFilters = useCallback(
        (next: Record<string, string[]>) => {
            if (controlledFilters === undefined) setInternalFilters(next)
            if (!manualPagination && controlledPage === undefined) setInternalPage(1)
            onFiltersChange?.(next)
        },
        [controlledFilters, controlledPage, manualPagination, onFiltersChange]
    )

    const setSort = useCallback(
        (next: MCardGridSort<T> | null) => {
            if (controlledSort === undefined) setInternalSort(next)
            if (!manualPagination && controlledPage === undefined) setInternalPage(1)
            onSortChange?.(next)
        },
        [controlledSort, controlledPage, manualPagination, onSortChange]
    )

    const setPage = useCallback(
        (next: number) => {
            if (controlledPage === undefined) setInternalPage(next)
            onPageChange?.(next)
        },
        [controlledPage, onPageChange]
    )

    const openFilter = useCallback(() => {
        setFilterOpen((v) => !v)
        setSortOpen(false)
    }, [])

    const openSort = useCallback(() => {
        setSortOpen((v) => !v)
        setFilterOpen(false)
    }, [])

    const processed = useMemo(() => {
        let result = items

        if (!manualSearch && search && searchKeys && searchKeys.length > 0) {
            const query = search.toLowerCase()
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const value = getNestedValue(item, key)
                    return value != null && String(value).toLowerCase().includes(query)
                })
            )
        }

        if (!manualFilters) {
            for (const [key, selected] of Object.entries(filters)) {
                if (!selected || selected.length === 0) continue

                result = result.filter((item) => {
                    const value = getNestedValue(item, key)
                    return value != null && selected.includes(String(value))
                })
            }
        }

        if (!manualSort && sort) {
            result = [...result].sort((a, b) => {
                const av = getNestedValue(a, sort.key)
                const bv = getNestedValue(b, sort.key)

                if (av == null && bv == null) return 0
                if (av == null) return 1
                if (bv == null) return -1

                const compare = String(av).localeCompare(String(bv), undefined, {numeric: true})
                return sort.direction === 'asc' ? compare : -compare
            })
        }

        return result === items ? [...result] : result
    }, [items, search, searchKeys, filters, sort, manualSearch, manualFilters, manualSort])

    const totalItems = manualPagination ? (total ?? processed.length) : processed.length
    const paginatedItems = useMemo(() => {
        if (!pagination || manualPagination) return processed
        const start = (page - 1) * pageSize
        return processed.slice(start, start + pageSize)
    }, [processed, pagination, manualPagination, page, pageSize])

    function toggleFilter(key: string, value: string) {
        const current = filters[key] ?? []
        const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
        setFilters({...filters, [key]: next})
    }

    const filterOptions = useMemo(() => {
        const map: Record<string, string[]> = {}

        for (const filterKey of filterKeys) {
            if (filterKey.options) {
                map[filterKey.key] = filterKey.options
                continue
            }

            const values = new Set<string>()

            for (const item of items) {
                const value = getNestedValue(item, filterKey.key)
                if (value != null) values.add(String(value))
            }

            map[filterKey.key] = Array.from(values).sort()
        }

        return map
    }, [items, filterKeys])

    const activeSort = sortKeys.find((item) => item.key === sort?.key)

    return (
        <div className={cn('card-grid', `color-${color}`, className)} style={style} {...rest}>
            {(searchable || filterable || sortable) && (
                <div className="card-grid-toolbar">
                    {searchable && (
                        <MInputSearch
                            className="card-grid-search"
                            size="sm"
                            fullWidth
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onClear={() => setSearch('')}
                        />
                    )}

                    <div className="card-grid-actions">
                        {filterable && filterKeys.length > 0 && (
                            <>
                                <MButton
                                    ref={filterBtnRef}
                                    variant="outlined"
                                    color={color}
                                    size="sm"
                                    startIcon={<MFilterIcon />}
                                    aria-expanded={filterOpen}
                                    onClick={openFilter}
                                >
                                    Filter
                                </MButton>
                                <MPopover
                                    open={filterOpen}
                                    anchorRef={filterBtnRef}
                                    onClose={() => setFilterOpen(false)}
                                    placement="bottom-end"
                                    className="card-grid-dropdown"
                                >
                                    {filterKeys.map((filterKey) => (
                                        <div key={filterKey.key} className="card-grid-filter-group">
                                            <span className="card-grid-filter-label">{filterKey.label}</span>
                                            {(filterOptions[filterKey.key] ?? []).map((option) => (
                                                <div key={option} className="card-grid-filter-option">
                                                    <MCheckbox
                                                        size="sm"
                                                        clickEffect="none"
                                                        checked={filters[filterKey.key]?.includes(option) ?? false}
                                                        onChange={() => toggleFilter(filterKey.key, option)}
                                                        label={option}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </MPopover>
                            </>
                        )}

                        {sortable && sortKeys.length > 0 && (
                            <>
                                <MButton
                                    ref={sortBtnRef}
                                    variant="outlined"
                                    color={color}
                                    size="sm"
                                    startIcon={
                                        sort ? (
                                            sort.direction === 'asc' ? (
                                                <MArrowUpIcon />
                                            ) : (
                                                <MArrowDownIcon />
                                            )
                                        ) : (
                                            <MSortIcon />
                                        )
                                    }
                                    aria-expanded={sortOpen}
                                    onClick={openSort}
                                >
                                    {activeSort ? `Sort: ${activeSort.label}` : 'Sort'}
                                </MButton>
                                <MPopover
                                    open={sortOpen}
                                    anchorRef={sortBtnRef}
                                    onClose={() => setSortOpen(false)}
                                    placement="bottom-end"
                                    className="card-grid-dropdown"
                                >
                                    {sortKeys.map((sortItem) => (
                                        <button
                                            key={sortItem.key}
                                            type="button"
                                            className={cn(
                                                'card-grid-sort-item',
                                                sort?.key === sortItem.key && 'active'
                                            )}
                                            onClick={() => {
                                                if (sort?.key === sortItem.key) {
                                                    setSort({
                                                        key: sortItem.key,
                                                        direction: sort.direction === 'asc' ? 'desc' : 'asc',
                                                    })
                                                } else {
                                                    setSort({key: sortItem.key, direction: 'asc'})
                                                }
                                            }}
                                        >
                                            {sortItem.label}
                                            {sort?.key === sortItem.key && (
                                                <span className="card-grid-sort-dir">
                                                    {sort.direction === 'asc' ? (
                                                        <MArrowUpIcon className="card-grid-sort-icon" />
                                                    ) : (
                                                        <MArrowDownIcon className="card-grid-sort-icon" />
                                                    )}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </MPopover>
                            </>
                        )}
                    </div>
                </div>
            )}

            {paginatedItems.length > 0 ? (
                <div
                    className="card-grid-items"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    }}
                >
                    {paginatedItems.map((item, index) => {
                        // Wrap each card so consumers don't have to remember `key={item.id}` in renderCard.
                        // Prefer the item's id when present (stable across reorders), fall back to index.
                        const id = (item as {id?: string | number} | null | undefined)?.id
                        return <Fragment key={id ?? index}>{renderCard(item, index)}</Fragment>
                    })}
                </div>
            ) : (
                <div className="card-grid-empty">{emptyMessage}</div>
            )}

            {pagination && totalItems > pageSize && (
                <div className="card-grid-pagination">
                    <MPagination total={totalItems} page={page} pageSize={pageSize} onChange={setPage} />
                </div>
            )}
        </div>
    )
}
