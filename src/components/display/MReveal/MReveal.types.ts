import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'

export type MRevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'
export type MRevealTrigger = 'view' | 'mount'

export interface MRevealProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    direction?: MRevealDirection
    delay?: number
    duration?: number
    distance?: number
    once?: boolean
    trigger?: MRevealTrigger
    className?: string
    style?: CSSProperties
}
