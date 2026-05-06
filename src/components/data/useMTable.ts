import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import type {MDataTableSort} from './MDataTable'

/**
 * Generic query shape that backend lists can satisfy. Drop-in adapter between
 * `useMTable` and the API call. The framework does not assume axios/fetch/swr —
 * the consumer plugs whatever fetcher they want.
 */
export interface MTableQuery {
    page?: number
    perPage?: number
    search?: string
    filters?: Record<string, string[]>
    sort?: MDataTableSort | null
}

/**
 * Standard list response. Mirrors the most common server convention
 * (data + meta with pagination total). Adapt your fetcher to this shape if your
 * backend uses different envelope keys.
 */
export interface MTableResponse<T> {
    data: T[]
    meta: {
        total: number
        page: number
        perPage: number
        totalPages: number
    }
}

export type MTableFetcher<T> = (query: MTableQuery, signal?: AbortSignal) => Promise<MTableResponse<T>>

export interface MTableOptions {
    perPage?: number
    initialPage?: number
    initialSearch?: string
    initialFilters?: Record<string, string[]>
    initialSort?: MDataTableSort | null
    /** Bump to force a refetch (e.g. after a mutation invalidates the list). */
    invalidationKey?: number | string
}

export interface MTableProps<T> {
    data: T[]
    total: number
    page: number
    onPageChange: (page: number) => void
    sort: MDataTableSort | null
    onSortChange: (sort: MDataTableSort | null) => void
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

export interface MTableHandle<T> {
    /** Spread directly onto `<MDataTable>` — wires up all manual* + state props. */
    tableProps: MTableProps<T>
    isLoading: boolean
    error: Error | null
    /** Trigger a fresh fetch with current query. */
    refetch: () => void
}

/**
 * Adapter hook that bridges a fetcher returning `MTableResponse<T>` with
 * `MDataTable` in manual mode. Owns the search / filters / sort / page state,
 * debounces nothing on its own (fetcher decides), and aborts in-flight
 * requests when the query changes. Spread `tableProps` onto your table.
 */
export function useMTable<T>(fetcher: MTableFetcher<T>, options: MTableOptions = {}): MTableHandle<T> {
    const {perPage = 20, initialPage = 1, initialSearch = '', initialFilters, initialSort = null, invalidationKey} = options

    const [data, setData] = useState<T[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(initialPage)
    const [search, setSearch] = useState(initialSearch)
    const [filters, setFilters] = useState<Record<string, string[]>>(initialFilters ?? {})
    const [sort, setSort] = useState<MDataTableSort | null>(initialSort)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [bump, setBump] = useState(0)

    const fetcherRef = useRef(fetcher)
    fetcherRef.current = fetcher

    const query = useMemo<MTableQuery>(
        () => ({page, perPage, search, filters, sort}),
        [page, perPage, search, filters, sort],
    )

    useEffect(() => {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined
        let cancelled = false
        setIsLoading(true)
        setError(null)
        fetcherRef
            .current(query, controller?.signal)
            .then((response) => {
                if (cancelled) return
                setData(response.data)
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

    // Reset to page 1 when search/filters/sort change.
    const handleSearchChange = useCallback((next: string) => {
        setSearch(next)
        setPage(1)
    }, [])
    const handleFiltersChange = useCallback((next: Record<string, string[]>) => {
        setFilters(next)
        setPage(1)
    }, [])
    const handleSortChange = useCallback((next: MDataTableSort | null) => {
        setSort(next)
        setPage(1)
    }, [])

    const refetch = useCallback(() => setBump((value) => value + 1), [])

    const tableProps: MTableProps<T> = {
        data,
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

    return {tableProps, isLoading, error, refetch}
}
