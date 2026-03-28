import type {ReactNode, CSSProperties, RefObject} from 'react'

export type PopoverPlacement =
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'right-start'
    | 'right-end'
    | 'left-start'
    | 'left-end'

export interface PopoverProps {
    open: boolean
    anchorRef: RefObject<HTMLElement | null>
    onClose: () => void
    placement?: PopoverPlacement
    matchWidth?: boolean
    offset?: number
    zIndex?: number | string
    children: ReactNode
    className?: string
    style?: CSSProperties
}
