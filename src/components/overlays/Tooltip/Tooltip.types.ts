import type {ReactNode} from 'react'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
    content: ReactNode
    placement?: TooltipPlacement
    delay?: number
    className?: string
    children: ReactNode
}
