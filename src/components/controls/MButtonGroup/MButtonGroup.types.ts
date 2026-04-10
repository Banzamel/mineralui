import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MButtonVariant} from '../MButton/MButton.types'

export type MButtonGroupOrientation = 'horizontal' | 'vertical'

export interface MButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    orientation?: MButtonGroupOrientation
    variant?: MButtonVariant
    size?: MSize
    color?: MColor
    attached?: boolean
    className?: string
    children?: ReactNode
}
