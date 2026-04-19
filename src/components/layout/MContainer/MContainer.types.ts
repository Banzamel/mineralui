import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MContainerSize = 'content' | 'wide' | 'full'

export interface MContainerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    size?: MContainerSize
    padded?: boolean
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
