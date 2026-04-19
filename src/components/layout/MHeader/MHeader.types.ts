import type {HTMLAttributes, ReactNode} from 'react'
import type {MContainerSize} from '../MContainer'
import type {MHiddenProps} from '../../../theme'

export type MHeaderTone = 'default' | 'surface' | 'subtle'
export type MHeaderLayout = 'split' | 'balanced'

export interface MHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>, MHiddenProps {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MHeaderTone
    layout?: MHeaderLayout
    children?: ReactNode
}
