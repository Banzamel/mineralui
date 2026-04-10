import type {HTMLAttributes, ReactNode} from 'react'

export type MModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface MModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
    open: boolean
    onClose: () => void
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    size?: MModalSize
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
}
