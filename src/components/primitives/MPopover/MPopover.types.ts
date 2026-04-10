import type {ReactNode, CSSProperties, RefObject} from 'react'

export type MPopoverPlacement =
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'

export interface MPopoverProps {
    open: boolean
    anchorRef: RefObject<HTMLElement | null>
    onClose: () => void
    placement?: MPopoverPlacement
    matchWidth?: boolean
    offset?: number
    zIndex?: number | string
    children: ReactNode
    className?: string
    style?: CSSProperties
}
