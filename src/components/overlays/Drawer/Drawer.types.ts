import type {HTMLAttributes, ReactNode} from 'react'

export type DrawerSide = 'left' | 'right' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean
    onClose: () => void
    side?: DrawerSide
    size?: DrawerSize
    title?: ReactNode
    overlay?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    children?: ReactNode
}
