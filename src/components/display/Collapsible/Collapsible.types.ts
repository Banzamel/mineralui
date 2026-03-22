import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralFontColor} from '../../../theme'

export interface CollapsibleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
    title: ReactNode
    defaultOpen?: boolean
    open?: boolean
    onToggle?: (open: boolean) => void
    fcolor?: MineralFontColor
    children?: ReactNode
}
