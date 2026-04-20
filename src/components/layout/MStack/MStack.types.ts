import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type MStackAlign = 'stretch' | 'start' | 'center' | 'end'

export interface MStackProps extends Omit<HTMLAttributes<HTMLDivElement>, 'hidden'>, LayoutUtilityProps, MHiddenProps {
    align?: MStackAlign
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
