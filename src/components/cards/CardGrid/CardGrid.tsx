import {useState, useMemo, useRef, useEffect} from 'react'
import type {CardGridProps} from './CardGrid.types'
import {cn} from '../../../utils/cn'
import {InputSearch} from '../../inputs/InputSearch'
import './CardGrid.css'

function getNestedValue(obj: unknown, key: string): unknown {
    const parts = key.split('.')
    let val: unknown = obj

    for (const p of parts) {
        if (val == null || typeof val !== 'object') return undefined
        val = (val as Record<string, unknown>)[p]
    }

    return val
}

export function CardGrid<T extends Record<string, unknown>>({
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
    gap,
    emptyMessage = 'No results found.',
    className,
    style,
    ...rest
}: CardGridProps<T>) {
    const [search, setSearch] = useState('')
    const [filters, setFilters] = useState<Record<string, Set<string>>>({})
    const [sortKey, setSortKey] = useState<string | null>(defaultSort?.key ?? null)
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSort?.direction ?? 'asc')
    const [filterOpen, setFilterOpen] = useState(false)
    const [sortOpen, setSortOpen] = useState(false)
    const filterRef = useRef<HTMLDivElement>(null)
    const sortRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function close(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setFilterOpen(false)
            }

            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setSortOpen(false)
            }
        }

        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
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
                <div className="cg-toolbar">
                    {searchable && (
                        <InputSearch
                            className="cg-search"
                            size="sm"
                            fullWidth
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            onClear={() => setSearch('')}
                        />
                    )}

                    <div className="cg-toolbar-actions">
                        {filterable && filterKeys.length > 0 && (
                            <div className="cg-dropdown-wrap" ref={filterRef}>
                                <button
                                    type="button"
                                    className="cg-toolbar-btn"
                                    aria-expanded={filterOpen}
                                    onClick={() => {
                                        setFilterOpen(!filterOpen)
                                        setSortOpen(false)
                                    }}
                                >
                                    Filter
                                </button>
                                {filterOpen && (
                                    <div className="cg-dropdown">
                                        {filterKeys.map((filterKey) => (
                                            <div key={filterKey.key} className="cg-filter-group">
                                                <span className="cg-filter-label">{filterKey.label}</span>
                                                {(filterOptions[filterKey.key] ?? []).map((option) => (
                                                    <label key={option} className="cg-filter-option">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters[filterKey.key]?.has(option) ?? false}
                                                            onChange={() => toggleFilter(filterKey.key, option)}
                                                        />
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {sortable && sortKeys.length > 0 && (
                            <div className="cg-dropdown-wrap" ref={sortRef}>
                                <button
                                    type="button"
                                    className="cg-toolbar-btn"
                                    aria-expanded={sortOpen}
                                    onClick={() => {
                                        setSortOpen(!sortOpen)
                                        setFilterOpen(false)
                                    }}
                                >
                                    {activeSort ? `Sort: ${activeSort.label}` : 'Sort'}
                                </button>
                                {sortOpen && (
                                    <div className="cg-dropdown">
                                        {sortKeys.map((sortItem) => (
                                            <button
                                                key={sortItem.key}
                                                type="button"
                                                className={cn('cg-sort-item', sortKey === sortItem.key && 'active')}
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
                                                    <span className="cg-sort-dir">
                                                        {sortDir === 'asc' ? 'Up' : 'Down'}
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {processed.length > 0 ? (
                <div
                    className="cg-grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        ...(gap ? {gap} : {}),
                    }}
                >
                    {processed.map((item, index) => renderCard(item, index))}
                </div>
            ) : (
                <div className="cg-empty">{emptyMessage}</div>
            )}
        </div>
    )
}
