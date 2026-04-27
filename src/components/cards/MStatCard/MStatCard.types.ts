import type {ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MCardProps} from '../MCard'

export type MCardStatTrendType = 'up' | 'down' | 'neutral'

export interface MCardStatProps extends Omit<MCardProps, 'children' | 'color'> {
    label: ReactNode
    value: ReactNode
    icon?: ReactNode
    badge?: ReactNode
    helperText?: ReactNode
    trend?: ReactNode
    trendType?: MCardStatTrendType
    color?: MColor
}

export type MStatCardTrendType = MCardStatTrendType
export type MStatCardProps = MCardStatProps
