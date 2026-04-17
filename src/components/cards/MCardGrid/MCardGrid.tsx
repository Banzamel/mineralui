import {useState, useMemo, useRef, useCallback} from 'react'
import type {MCardGridProps} from './MCardGrid.types'
import {cn} from '../../../utils/cn'
import {MButton, MCheckbox} from '../../controls'
import {MInputSearch} from '../../inputs'
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
    searchable = false,
    searchKeys,
    searchPlaceholder = 'Search...',
    filterable = false,
    filterKeys = [],
    sortable = false,
    sortKeys = [],
    defaultSort,
    columns = 3,
    emptyMessage = 'No results found.',
    className,
    style,
    ...rest
}: MCardGridProps<T>) {
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState<Record<string, Set<string>>>({})
    const [sortKey, setSortKey] = useState<string | null>(defaultSort?.key ?? null)
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSort?.direction ?? 'asc')
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const filterBtnRef = useRef<HTMLElement>(null)
    const sortBtnRef = useRef<HTMLElement>(null)

    const openFilter = useCallback(() => {
        setFilterOpen((v) => !v)
        setSortOpen(false)
    }, [])

    const openSort = useCallback(() => {
        setSortOpen((v) => !v)
        setFilterOpen(false)
    }, [])

    const processed = useMemo(() => {
        let result = [...items]

        if (search && searchKeys && searchKeys.length > 0) {
            const query = search.toLowerCase()
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const value = getNestedValue(item, key)
                    return value != null && String(value).toLowerCase().includes(query)
                })
            )
        }

        for (const [key, selected] of Object.entries(filters)) {
            if (selected.size === 0) continue

            result = result.filter((item) => {
                const value = getNestedValue(item, key)
                return value != null && selected.has(String(value))
            })
        }

        if (sortKey) {
            result.sort((a, b) => {
                const av = getNestedValue(a, sortKey)
                const bv = getNestedValue(b, sortKey)

                if (av == null && bv == null) return 0
                if (av == null) return 1
                if (bv == null) return -1

                const compare = String(av).localeCompare(String(bv), undefined, {numeric: true})
                return sortDir === 'asc' ? compare : -compare
            })
        }

        return result
    }, [items, search, searchKeys, filters, sortKey, sortDir])

    function toggleFilter(key: string, value: string) {
        setFilters((prev) => {
            const next = new Set(prev[key] ?? [])

            if (next.has(value)) next.delete(value)
            else next.add(value)

            return {...prev, [key]: next}
        })
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

    const activeSort = sortKeys.find((item) => item.key === sortKey)

    return (
        <div className={cn('card-grid', className)} style={style} {...rest}>
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
                                                        checked={filters[filterKey.key]?.has(option) ?? false}
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
                                    size="sm"
                                    startIcon={
                                        sortKey ? (
                                            sortDir === 'asc' ? (
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
                                            className={cn('card-grid-sort-item', sortKey === sortItem.key && 'active')}
                                            onClick={() => {
                                                if (sortKey === sortItem.key) {
                                                    setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
                                                } else {
                                                    setSortKey(sortItem.key)
                                                    setSortDir('asc')
                                                }
                                                setSortOpen(false)
                                            }}
                                        >
                                            {sortItem.label}
                                            {sortKey === sortItem.key && (
                                                <span className="card-grid-sort-dir">
                                                    {sortDir === 'asc' ? (
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

            {processed.length > 0 ? (
                <div
                    className="card-grid-items"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    }}
                >
                    {processed.map((item, index) => renderCard(item, index))}
                </div>
            ) : (
                <div className="card-grid-empty">{emptyMessage}</div>
            )}
        </div>
    )
}
