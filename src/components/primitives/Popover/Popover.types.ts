import type {ReactNode, CSSProperties, RefObject} from 'react'

export type PopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'

export interface PopoverProps {
    open: boolean
    anchorRef: RefObject<HTMLElement | null>
    onClose: () => void
    placement?: PopoverPlacement
    matchWidth?: boolean
    offset?: number
    children: ReactNode
    className?: string
    style?: CSSProperties
}
