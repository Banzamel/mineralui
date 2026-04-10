import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type MStackAlign = 'stretch' | 'start' | 'center' | 'end'

export interface MStackProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    align?: MStackAlign
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
