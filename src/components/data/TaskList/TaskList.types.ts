import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor} from '../../../theme'

export interface TaskItem {
    id: string
    label: ReactNode
    checked?: boolean
    disabled?: boolean
}

export interface TaskListProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    items: TaskItem[]
    color?: MineralColor
    strikethrough?: boolean
    onChange?: (id: string, checked: boolean) => void
}
