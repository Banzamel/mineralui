import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type MSurfaceTone = 'default' | 'subtle' | 'raised' | 'inverse'

export interface MSurfaceProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    tone?: MSurfaceTone
    outlined?: boolean
    padded?: boolean
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
