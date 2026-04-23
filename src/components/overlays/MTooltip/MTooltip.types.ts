import type {HTMLAttributes, ReactNode} from 'react'

export type MTooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface MTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content' | 'children'> {
    content: ReactNode
    placement?: MTooltipPlacement
    delay?: number
    className?: string
    children: ReactNode
}
