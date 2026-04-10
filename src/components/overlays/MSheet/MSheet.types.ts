import type {HTMLAttributes, ReactNode} from 'react'

export type MSheetSize = 'sm' | 'md' | 'lg' | 'full'

export interface MSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
    open: boolean
    onClose: () => void
    title?: ReactNode
    description?: ReactNode
    footer?: ReactNode
    size?: MSheetSize
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
}
