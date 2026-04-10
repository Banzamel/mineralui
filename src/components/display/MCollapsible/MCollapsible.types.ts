import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MCollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
    title: ReactNode
    defaultOpen?: boolean
    open?: boolean
    onToggle?: (open: boolean) => void
    color?: MColor
    children?: ReactNode
}
