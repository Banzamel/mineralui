import type {ElementType, HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MCardActionProps} from '../shared'

export type MCardWidgetTrendType = 'up' | 'down' | 'neutral'

export interface MCardWidgetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title'>, MCardActionProps {
    title: ReactNode
    value: ReactNode
    trend?: ReactNode
    trendType?: MCardWidgetTrendType
    icon?: ReactNode
    color?: MColor
    helperText?: ReactNode
}
