import type {ReactNode, HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MEmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    icon?: ReactNode
    illustration?: ReactNode
    title: ReactNode
    description?: ReactNode
    buttonText?: string
    onAction?: () => void
    color?: MColor
    size?: MSize
}
