import type {AnchorHTMLAttributes, ElementType, ReactNode} from 'react'

export type MLinkTone = 'default' | 'muted' | 'accent' | 'inherit'
export type MLinkUnderline = 'always' | 'hover' | 'none'

export interface MLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: ElementType
    to?: string
    tone?: MLinkTone
    underline?: MLinkUnderline
    current?: boolean
    block?: boolean
    disabled?: boolean
    children?: ReactNode
}
