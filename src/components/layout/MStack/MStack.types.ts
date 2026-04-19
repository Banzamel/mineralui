import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'
import type {RevealProp} from '../../../utils/useReveal'

export type MStackAlign = 'stretch' | 'start' | 'center' | 'end'

export interface MStackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    align?: MStackAlign
    reveal?: RevealProp
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
