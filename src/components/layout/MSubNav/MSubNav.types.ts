import type {HTMLAttributes, ReactNode, ElementType} from 'react'

export interface MSubNavItem {
    label: ReactNode
    value: string
    icon?: ReactNode
    href?: string
    disabled?: boolean
}

export interface MSubNavProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
    items: MSubNavItem[]
    active?: string
    onChange?: (value: string) => void
    component?: ElementType
}
