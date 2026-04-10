import type {HTMLAttributes, ReactNode} from 'react'
import type {MContainerSize} from '../MContainer'

export type MHeaderTone = 'default' | 'surface' | 'subtle'
export type MHeaderLayout = 'split' | 'balanced'

export interface MHeaderProps extends HTMLAttributes<HTMLElement> {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MHeaderTone
    layout?: MHeaderLayout
    children?: ReactNode
}
