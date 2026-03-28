import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type StackAlign = 'stretch' | 'start' | 'center' | 'end'

export interface StackProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    align?: StackAlign
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
