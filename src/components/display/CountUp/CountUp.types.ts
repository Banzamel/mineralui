import type {HTMLAttributes} from 'react'

export interface CountUpProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    value: number
    from?: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
    separator?: string
}
