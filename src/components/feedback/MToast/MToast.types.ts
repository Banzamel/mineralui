import type {ReactNode} from 'react'
import type {MColor} from '../../../theme'

export type MToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'

export interface MToastEntry {
    id: string
    title?: ReactNode
    /** Body text. Optional — a toast may carry the title alone. */
    message?: ReactNode
    color?: MColor
    icon?: ReactNode | boolean
    duration?: number
}

export interface MToastProviderProps {
    position?: MToastPosition
    duration?: number
    children: ReactNode
}

export interface MToastOptions {
    title?: ReactNode
    /**
     * Body text. Optional — when the title already says everything, omit it
     * instead of padding the toast with a filler second line. At least one of
     * `title` / `message` should be provided.
     */
    message?: ReactNode
    color?: MColor
    icon?: ReactNode | boolean
    duration?: number
}

export interface MToastContext {
    toast: (options: MToastOptions) => string
    dismiss: (id: string) => void
}
