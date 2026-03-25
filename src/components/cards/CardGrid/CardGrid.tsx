import {useState, useMemo, useRef, useEffect} from 'react'
import type {CardGridProps} from './CardGrid.types'
import {cn} from '../../../utils/cn'
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

// Grid container with search, filter and sort toolbar for card collections.
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
        function close(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false)
        }
        document.addEventListener('mousedown', close)
        return () => document.removeEventListener('mousedown', close)
    }, [])

    const processed = useMemo(() => {
        let result = [...items]

        // Search
        if (search && searchKeys && searchKeys.length > 0) {
            const q = search.toLowerCase()
            result = result.filter((item) =>
                searchKeys.some((key) => {
                    const val = getNestedValue(item, key)
                    return val != null && String(val).toLowerCase().includes(q)
                })
            )
        }

        // Filter
        for (const [key, selected] of Object.entries(filters)) {
            if (selected.size === 0) continue
            result = result.filter((item) => {
                const val = getNestedValue(item, key)
                return val != null && selected.has(String(val))
            })
        }

        // Sort
        if (sortKey) {
            result.sort((a, b) => {
                const av = getNestedValue(a, sortKey)
                const bv = getNestedValue(b, sortKey)
                if (av == null && bv == null) return 0
                if (av == null) return 1
                if (bv == null) return -1
                const cmp = String(av).localeCompare(String(bv), undefined, {numeric: true})
                return sortDir === 'asc' ? cmp : -cmp
            })
        }

        return result
    }, [items, search, searchKeys, filters, sortKey, sortDir])

    function toggleFilter(key: string, value: string) {
        setFilters((prev) => {
            const set = new Set(prev[key] ?? [])
            if (set.has(value)) set.delete(value)
            else set.add(value)
            return {...prev, [key]: set}
        })
    }

    // Gather unique options for each filter key
    const filterOptions = useMemo(() => {
        const map: Record<string, string[]> = {}
        for (const fk of filterKeys) {
            if (fk.options) {
                map[fk.key] = fk.options
            } else {
                const vals = new Set<string>()
                for (const item of items) {
                    const v = getNestedValue(item, fk.key)
                    if (v != null) vals.add(String(v))
                }
                map[fk.key] = Array.from(vals).sort()
            }
        }
        return map
    }, [items, filterKeys])

    const activeSort = sortKeys.find((s) => s.key === sortKey)

    return (
        <div className={cn('card-grid', className)} style={style} {...rest}>
            {/* Toolbar */}
            {(searchable || filterable || sortable) && (
                <div className="cg-toolbar">
                    {searchable && (
                        <input
                            type="text"
                            className="cg-search"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    )}

                    <div className="cg-toolbar-actions">
                        {filterable && filterKeys.length > 0 && (
                            <div className="cg-dropdown-wrap" ref={filterRef}>
                                <button className="cg-toolbar-btn" onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false) }}>
                                    ☰ Filter
                                </button>
                                {filterOpen && (
                                    <div className="cg-dropdown">
                                        {filterKeys.map((fk) => (
                                            <div key={fk.key} className="cg-filter-group">
                                                <span className="cg-filter-label">{fk.label}</span>
                                                {(filterOptions[fk.key] ?? []).map((opt) => (
                                                    <label key={opt} className="cg-filter-option">
                                                        <input
                                                            type="checkbox"
                                                            checked={filters[fk.key]?.has(opt) ?? false}
                                                            onChange={() => toggleFilter(fk.key, opt)}
                                                        />
                                                        {opt}
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
                                <button className="cg-toolbar-btn" onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false) }}>
                                    ↕ {activeSort ? activeSort.label : 'Sort'}
                                </button>
                                {sortOpen && (
                                    <div className="cg-dropdown">
                                        {sortKeys.map((sk) => (
                                            <button
                                                key={sk.key}
                                                className={cn('cg-sort-item', sortKey === sk.key && 'active')}
                                                onClick={() => {
                                                    if (sortKey === sk.key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
                                                    else { setSortKey(sk.key); setSortDir('asc') }
                                                    setSortOpen(false)
                                                }}
                                            >
                                                {sk.label}
                                                {sortKey === sk.key && (
                                                    <span className="cg-sort-dir">{sortDir === 'asc' ? '↑' : '↓'}</span>
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

            {/* Grid */}
            {processed.length > 0 ? (
                <div
                    className="cg-grid"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        ...(gap ? {gap} : {}),
                    }}
                >
                    {processed.map((item, i) => renderCard(item, i))}
                </div>
            ) : (
                <div className="cg-empty">{emptyMessage}</div>
            )}
        </div>
    )
}
