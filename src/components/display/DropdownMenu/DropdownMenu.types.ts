import type {ReactNode, ElementType, CSSProperties} from 'react'
import type {PopoverPlacement} from '../../primitives/Popover'
import type {MineralColor, MineralSize} from '../../../theme'

export interface MDropdownMenuProps {
    trigger: ReactNode
    placement?: PopoverPlacement
    size?: MineralSize
    closeOnSelect?: boolean
    openOn?: 'click' | 'hover'
    className?: string
    style?: CSSProperties
    children: ReactNode
}

export interface MDropdownItemProps {
    icon?: ReactNode
    label: ReactNode
    href?: string
    to?: string
    onClick?: () => void
    color?: MineralColor
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
