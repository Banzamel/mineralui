import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {RevealProp} from '../../../utils/useReveal'

export type SectionSpacing = 'sm' | 'md' | 'lg' | 'xl'
export type SectionTone = 'default' | 'subtle' | 'surface' | 'inverse'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
    as?: 'section' | 'div' | 'main' | 'header' | 'footer'
    spacing?: SectionSpacing
    tone?: SectionTone
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
