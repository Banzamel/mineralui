import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type ContainerSize = 'content' | 'wide' | 'full'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    size?: ContainerSize
    padded?: boolean
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
