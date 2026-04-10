import type {HTMLAttributes, ReactNode} from 'react'

export type MDrawerSide = 'left' | 'right' | 'bottom'
export type MDrawerSize = 'sm' | 'md' | 'lg' | 'full'

export interface MDrawerSectionProps extends HTMLAttributes<HTMLDivElement> {
    bordered?: boolean
    children?: ReactNode
}

export interface MDrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean
    onClose: () => void
    side?: MDrawerSide
    size?: MDrawerSize
    overlay?: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    children?: ReactNode
}
