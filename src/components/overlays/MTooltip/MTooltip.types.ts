import type {ReactNode} from 'react'

export type MTooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface MTooltipProps {
    content: ReactNode
    placement?: MTooltipPlacement
    delay?: number
    className?: string
    children: ReactNode
}
