import type {ReactNode, HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MTimelineItemProps {
    id: string
    title: ReactNode
    description?: ReactNode
    date?: ReactNode
    icon?: ReactNode
    color?: MColor
}

export interface MTimelineProps extends HTMLAttributes<HTMLDivElement> {
    align?: 'left' | 'alternate'
    color?: MColor
    size?: MSize
    children: ReactNode
}
