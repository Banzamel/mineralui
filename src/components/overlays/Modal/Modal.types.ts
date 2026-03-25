import type {HTMLAttributes, ReactNode} from 'react'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
    open: boolean
    onClose: () => void
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    size?: ModalSize
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
}
