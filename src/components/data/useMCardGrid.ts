import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import type {MCardGridSort} from '../cards/MCardGrid'
import type {MTableQuery, MTableResponse, MTableFetcher, MTableOptions} from './useMTable'

/**
 * Card-grid analog of `useMTable`. Same fetcher-agnostic pattern; returns props
 * spreadable onto `<MCardGrid>` in manual mode. Note that `MCardGridSort` uses
 * `direction` (vs `MDataTableSort.dir`) — convert if you reuse a fetcher.
 */
export interface MCardGridProps<T> {
    items: T[]
    total: number
    page: number
    onPageChange: (page: number) => void
    sort: MCardGridSort<T> | null
    onSortChange: (sort: MCardGridSort<T> | null) => void
    search: string
    onSearchChange: (search: string) => void
    filters: Record<string, string[]>
    onFiltersChange: (filters: Record<string, string[]>) => void
    manualSearch: true
    manualFilters: true
    manualSort: true
    manualPagination: true
    pageSize: number
}

export interface MCardGridHandle<T> {
    /** Spread directly onto `<MCardGrid>`. */
    gridProps: MCardGridProps<T>
    isLoading: boolean
    error: Error | null
    refetch: () => void
}

function toTableSort<T>(sort: MCardGridSort<T> | null): MTableQuery['sort'] {
    if (!sort) return null
    return {key: sort.key, dir: sort.direction}
}

/**
 * Adapter hook for `MCardGrid` in manual mode. Owns search / filters / sort /
 * page state, calls a generic `MTableFetcher`, returns `gridProps` to spread.
 */
export function useMCardGrid<T>(fetcher: MTableFetcher<T>, options: MTableOptions = {}): MCardGridHandle<T> {
    const {perPage = 12, initialPage = 1, initialSearch = '', initialFilters, initialSort = null, invalidationKey} = options

    const [items, setItems] = useState<T[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(initialPage)
    const [search, setSearch] = useState(initialSearch)
    const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters ?? {})
    const [sort, setSort] = useState<MCardGridSort<T> | null>(
        (initialSort as MCardGridSort<T> | null | undefined) ?? null,
    )
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [bump, setBump] = useState(0)

    const fetcherRef = useRef(fetcher)
    fetcherRef.current = fetcher

    const query = useMemo<MTableQuery>(
        () => ({page, perPage, search, filters, sort: toTableSort(sort)}),
        [page, perPage, search, filters, sort],
    )

    useEffect(() => {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined
        let cancelled = false
        setIsLoading(true)
        setError(null)
        fetcherRef
            .current(query, controller?.signal)
            .then((response: MTableResponse<T>) => {
                if (cancelled) return
                setItems(response.data)
                setTotal(response.meta.total)
            })
            .catch((err: unknown) => {
                if (cancelled) return
                if (err instanceof Error && err.name === 'AbortError') return
                setError(err instanceof Error ? err : new Error(String(err)))
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false)
            })
        return () => {
            cancelled = true
            controller?.abort()
        }
    }, [query, invalidationKey, bump])

    const handleSearchChange = useCallback((next: string) => {
        setSearch(next)
        setPage(1)
    }, [])
    const handleFiltersChange = useCallback((next: Record<string, string[]>) => {
        setFilters(next)
        setPage(1)
    }, [])
    const handleSortChange = useCallback((next: MCardGridSort<T> | null) => {
        setSort(next)
        setPage(1)
    }, [])

    const refetch = useCallback(() => setBump((value) => value + 1), [])

    const gridProps: MCardGridProps<T> = {
        items,
        total,
        page,
        onPageChange: setPage,
        sort,
        onSortChange: handleSortChange,
        search,
        onSearchChange: handleSearchChange,
        filters,
        onFiltersChange: handleFiltersChange,
        manualSearch: true,
        manualFilters: true,
        manualSort: true,
        manualPagination: true,
        pageSize: perPage,
    }

    return {gridProps, isLoading, error, refetch}
}
