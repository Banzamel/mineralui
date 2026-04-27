import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MButtonVariant} from '../MButton'
import type {MSimpleGridColumns} from '../../layout/MSimpleGrid'

export interface MQuickActionItem {
    key?: string
    label: ReactNode
    description?: ReactNode
    icon?: ReactNode
    component?: ElementType
    to?: string
    href?: string
    target?: string
    rel?: string
    onClick?: () => void
    color?: MColor
    variant?: MButtonVariant
    badge?: ReactNode | number | boolean
    badgeColor?: MColor
    badgePulsing?: boolean
    pulsing?: boolean
    disabled?: boolean
}

export interface MQuickActionsProps extends HTMLAttributes<HTMLDivElement> {
    items: MQuickActionItem[]
    layout?: 'group' | 'grid'
    orientation?: 'horizontal' | 'vertical'
    columns?: MSimpleGridColumns
    size?: MSize
    color?: MColor
    variant?: MButtonVariant
    fullWidth?: boolean
}
