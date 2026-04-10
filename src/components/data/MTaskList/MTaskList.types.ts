import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export interface MTaskItem {
    id: string
    label: ReactNode
    checked?: boolean
    disabled?: boolean
}

export interface MTaskListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: MTaskItem[]
    color?: MColor
    strikethrough?: boolean
    onChange?: (id: string, checked: boolean) => void
}
