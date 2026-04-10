import type {ReactNode, ElementType, CSSProperties} from 'react'
import type {MColor} from '../../../theme'

export type MSidebarMode = 'expanded' | 'collapsed'

export interface MSidebarProps {
    mode?: 'expanded' | 'collapsed' | 'auto'
    defaultMode?: MSidebarMode
    onModeChange?: (mode: MSidebarMode) => void
    persist?: boolean
    side?: 'left' | 'right'
    tone?: 'default' | 'subtle' | 'surface' | 'inverse'
    bordered?: boolean
    mobileBreakpoint?: number
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export interface MSidebarHeaderProps {
    bordered?: boolean
    className?: string
    children: ReactNode
}

export interface MSidebarBodyProps {
    className?: string
    children: ReactNode
}

export interface MSidebarNavProps {
    className?: string
    children: ReactNode
}

export interface MSidebarItemProps {
    icon?: ReactNode
    label: ReactNode
    href?: string
    to?: string
    onClick?: () => void
    active?: boolean
    disabled?: boolean
    badge?: ReactNode
    color?: MColor
    component?: ElementType
    className?: string
}

export interface MSidebarGroupProps {
    label: string
    icon?: ReactNode
    active?: boolean
    defaultOpen?: boolean
    collapsible?: boolean
    children: ReactNode
    className?: string
}

export interface MSidebarFooterProps {
    bordered?: boolean
    className?: string
    children: ReactNode
}

export interface MSidebarDividerProps {
    className?: string
    spacing?: 'sm' | 'md' | 'lg'
}
