import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

export type MCardWidgetTrendType = 'up' | 'down' | 'neutral'

export interface MCardWidgetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
    title: ReactNode
    value: ReactNode
    trend?: ReactNode
    trendType?: MCardWidgetTrendType
    icon?: ReactNode
    color?: MColor
    helperText?: ReactNode
}
