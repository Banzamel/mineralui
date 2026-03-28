import type {HTMLAttributes, ReactNode} from 'react'

export type DrawerSide = 'left' | 'right' | 'bottom'
export type DrawerSize = 'sm' | 'md' | 'lg' | 'full'

export interface DrawerSectionProps extends HTMLAttributes<HTMLDivElement> {
    bordered?: boolean
    children?: ReactNode
}

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean
    onClose: () => void
    side?: DrawerSide
    size?: DrawerSize
    overlay?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    children?: ReactNode
}
