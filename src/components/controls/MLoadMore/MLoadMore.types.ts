import type {HTMLAttributes} from 'react'
import type {MColor} from '../../../theme'
import type {MButtonVariant} from '../MButton/MButton.types'

export interface MLoadMoreProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
    onLoadMore: () => void
    loading?: boolean
    hasMore?: boolean
    loaded?: number
    total?: number
    auto?: boolean
    autoThreshold?: number
    variant?: MButtonVariant
    color?: MColor
    label?: string
    loadingLabel?: string
    doneLabel?: string
}
