import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MContainerSize = 'content' | 'wide' | 'full'

export interface MContainerProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    size?: MContainerSize
    padded?: boolean
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
