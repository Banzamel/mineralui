import type {ReactNode, RefObject} from 'react'
import type {MColor} from '../../../theme'
import type {MPopoverPlacement} from '../../primitives'

export interface MPopconfirmProps {
    title: ReactNode
    description?: ReactNode
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    color?: MColor
    icon?: ReactNode
    placement?: MPopoverPlacement
    open: boolean
    onOpenChange: (open: boolean) => void
    anchorRef: RefObject<HTMLElement | null>
    className?: string
}
