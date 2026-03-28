import type {HTMLAttributes} from 'react'
import type {RelativeTimeFallbackFormat} from '../../../utils/relativeTime'

export type TimeAgoUpdate = 'auto' | 'none' | 'minute' | 'hour' | 'day'

export interface TimeAgoProps extends Omit<HTMLAttributes<HTMLElement>, 'children' | 'dateTime'> {
    value: Date | string | number
    locale?: string
    maxRelative?: string | number
    fallbackFormat?: RelativeTimeFallbackFormat
    titleAbsolute?: boolean
    update?: TimeAgoUpdate
}
