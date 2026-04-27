import type {ElementType, ReactNode} from 'react'
import type {MSheetSize} from '../MSheet'

export interface MCommandPaletteItem {
    id: string
    title: ReactNode
    description?: ReactNode
    group?: ReactNode
    keywords?: string[]
    icon?: ReactNode
    badge?: ReactNode
    actionLabel?: ReactNode
    component?: ElementType
    to?: string
    href?: string
    target?: string
    rel?: string
    onSelect?: () => void
}

export interface MCommandPaletteProps {
    items: MCommandPaletteItem[]
    featuredItems?: MCommandPaletteItem[]
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    onSelect?: (item: MCommandPaletteItem) => void
    title?: ReactNode
    description?: ReactNode
    trigger?: ReactNode
    shortcut?: string
    placeholder?: string
    emptyLabel?: ReactNode
    footer?: ReactNode
    size?: MSheetSize
    closeOnSelect?: boolean
}
