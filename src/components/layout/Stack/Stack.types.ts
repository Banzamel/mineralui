import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {LayoutUtilityProps} from '../../../utils/layoutProps'

export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type StackAlign = 'stretch' | 'start' | 'center' | 'end'

export interface StackProps extends HTMLAttributes<HTMLDivElement>, LayoutUtilityProps {
    gap?: StackGap
    align?: StackAlign
    children?: ReactNode
    className?: string
    style?: CSSProperties
}
