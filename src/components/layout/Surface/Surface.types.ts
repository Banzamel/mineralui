import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type SurfaceTone = 'default' | 'subtle' | 'raised' | 'inverse'

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    tone?: SurfaceTone
    outlined?: boolean
    padded?: boolean
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
