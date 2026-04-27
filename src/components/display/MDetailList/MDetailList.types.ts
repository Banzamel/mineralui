import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MSize} from '../../../theme'

export interface MDetailListItem {
    key?: string
    label: ReactNode
    value?: ReactNode
    helperText?: ReactNode
    status?: ReactNode
    component?: ElementType
    to?: string
    href?: string
    target?: string
    rel?: string
}

export interface MDetailListProps extends HTMLAttributes<HTMLDivElement> {
    items: MDetailListItem[]
    size?: MSize
    bordered?: boolean
    emptyState?: ReactNode
}
