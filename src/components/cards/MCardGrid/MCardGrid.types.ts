import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

/**
 * Responsive columns descriptor for `MCardGrid`. Follows the framework's
 * mobile-first convention — `base` defines the smallest-screen value and each
 * larger breakpoint kicks in via a `min-width` media query. Missing breakpoints
 * inherit from the next smaller one (cascade in CSS, ending at `base`).
 *
 * Breakpoints map 1:1 to `MBreakpoints`:
 *  - `base` — default (mobile / no media query)
 *  - `sm`   — `@media (min-width: 640px)`
 *  - `md`   — `@media (min-width: 768px)`
 *  - `lg`   — `@media (min-width: 1024px)`
 *  - `xl`   — `@media (min-width: 1280px)`
 *  - `xxl`  — `@media (min-width: 1536px)` (matches `MBreakpoints['2xl']`)
 */
export interface MCardGridResponsiveColumns {
    /** Smallest-screen value (mobile-first base). Default `1`. */
    base?: number
    /** Used from `min-width: 640px` upward. */
    sm?: number
    /** Used from `min-width: 768px` upward. */
    md?: number
    /** Used from `min-width: 1024px` upward. */
    lg?: number
    /** Used from `min-width: 1280px` upward. */
    xl?: number
    /** Used from `min-width: 1536px` upward (matches `MBreakpoints['2xl']`). */
    xxl?: number
}

export interface MCardGridFilterKey<T> {
    key: keyof T & string
    label: string
    options?: string[]
}

export interface MCardGridSortKey<T> {
    key: keyof T & string
    label: string
}

export interface MCardGridSort<T = unknown> {
    key: keyof T & string
    direction: 'asc' | 'desc'
}

export interface MCardGridProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
    items: T[]
    renderCard: (item: T, index: number) => ReactNode
    color?: MColor

    searchable?: boolean
    searchKeys?: (keyof T & string)[]
    searchPlaceholder?: string
    search?: string
    onSearchChange?: (search: string) => void

    filterable?: boolean
    filterKeys?: MCardGridFilterKey<T>[]
    filters?: Record<string, string[]>
    onFiltersChange?: (filters: Record<string, string[]>) => void

    sortable?: boolean
    sortKeys?: MCardGridSortKey<T>[]
    defaultSort?: MCardGridSort<T>
    sort?: MCardGridSort<T> | null
    onSortChange?: (sort: MCardGridSort<T> | null) => void

    pagination?: boolean
    pageSize?: number
    page?: number
    onPageChange?: (page: number) => void
    total?: number

    manualSearch?: boolean
    manualFilters?: boolean
    manualSort?: boolean
    manualPagination?: boolean

    /**
     * Number of grid columns. Accepts:
     *  - `number` — fixed column count for every screen (back-compat).
     *  - `MCardGridResponsiveColumns` — per-breakpoint counts following the
     *    framework's mobile-first convention. Example:
     *    `{base: 1, sm: 2, lg: 3, xl: 4}` → 1 column on mobile, 2 from 640px,
     *    3 from 1024px, 4 from 1280px. Missing breakpoints inherit from the
     *    next smaller one via the CSS variable cascade.
     *
     * Defaults to `3` so an unconfigured grid behaves as before.
     */
    columns?: number | MCardGridResponsiveColumns
    emptyMessage?: ReactNode
}
