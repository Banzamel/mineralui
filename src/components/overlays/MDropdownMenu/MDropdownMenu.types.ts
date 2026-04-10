import type {ReactNode, ElementType, CSSProperties} from 'react'
import type {MPopoverPlacement} from '../../primitives'
import type {MColor} from '../../../theme'

export interface MDropdownMenuProps {
    trigger: ReactNode
    placement?: MPopoverPlacement
    closeOnSelect?: boolean
    openOn?: 'click' | 'hover'
    onOpenChange?: (open: boolean) => void
    className?: string
    style?: CSSProperties
    popoverClassName?: string
    popoverStyle?: CSSProperties
    children: ReactNode
}

export interface MDropdownItemProps {
    icon?: ReactNode
    label: ReactNode
    href?: string
    to?: string
    onClick?: () => void
    color?: MColor
    disabled?: boolean
    active?: boolean
    component?: ElementType
    className?: string
}

export interface MDropdownGroupProps {
    label: string
    children: ReactNode
}

export interface MDropdownDividerProps {
    className?: string
}
