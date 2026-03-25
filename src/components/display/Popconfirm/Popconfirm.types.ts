import type {ReactNode, RefObject} from 'react'
import type {MineralColor} from '../../../theme'
import type {PopoverPlacement} from '../../primitives/Popover'

export interface PopconfirmProps {
    title: ReactNode
    description?: ReactNode
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    color?: MineralColor
    icon?: ReactNode
    placement?: PopoverPlacement
    open: boolean
    onOpenChange: (open: boolean) => void
    anchorRef: RefObject<HTMLElement | null>
    className?: string
}
