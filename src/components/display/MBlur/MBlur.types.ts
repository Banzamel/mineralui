import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'

export type MBlurTrigger = 'hover' | 'click' | 'focus' | 'none'

export interface MBlurProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onToggle'> {
    children?: ReactNode
    amount?: number
    reveal?: MBlurTrigger
    revealed?: boolean
    defaultRevealed?: boolean
    onToggle?: (revealed: boolean) => void
    inline?: boolean
    className?: string
    style?: CSSProperties
}
