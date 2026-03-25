import type {HTMLAttributes, ReactNode} from 'react'

export interface MBreadcrumbItem {
    label: ReactNode
    href?: string
    onClick?: () => void
}

export interface MBreadcrumbProps extends HTMLAttributes<HTMLElement> {
    items: MBreadcrumbItem[]
    separator?: ReactNode
    maxItems?: number
}
