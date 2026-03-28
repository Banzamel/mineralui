import type {ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface ToastEntry {
    id: string
    title?: ReactNode
    message: ReactNode
    color?: MineralColor
    icon?: ReactNode | boolean
    duration?: number
}

export interface ToastProviderProps {
    position?: ToastPosition
    duration?: number
    children: ReactNode
}

export interface ToastOptions {
    title?: ReactNode
    message: ReactNode
    color?: MineralColor
    icon?: ReactNode | boolean
    duration?: number
}

export interface ToastContext {
    toast: (options: ToastOptions) => string
    dismiss: (id: string) => void
}
