import type {AnchorHTMLAttributes, ElementType, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'

export type MLinkTone = 'default' | 'muted' | 'accent' | 'inherit'
export type MLinkUnderline = 'always' | 'hover' | 'none'

export interface MLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'hidden'>, MHiddenProps {
    component?: ElementType
    to?: string
    tone?: MLinkTone
    underline?: MLinkUnderline
    current?: boolean
    block?: boolean
    disabled?: boolean
    children?: ReactNode
}
