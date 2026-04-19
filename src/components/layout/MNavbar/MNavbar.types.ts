import type {HTMLAttributes, ReactNode} from 'react'
import type {MHiddenProps} from '../../../theme'
import type {MContainerSize} from '../MContainer'

export type MNavbarTone = 'default' | 'surface' | 'subtle'
export type MNavbarJustify = 'start' | 'center' | 'between' | 'end'
export type MNavbarMobileMenu = 'dropdown' | 'drawer'

export interface MNavbarProps extends Omit<HTMLAttributes<HTMLElement>, 'hidden'>, MHiddenProps {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MNavbarTone
    justify?: MNavbarJustify
    wrap?: boolean
    mobileMenu?: MNavbarMobileMenu
    mobileMenuContent?: ReactNode
    mobileMenuLabel?: string
    mobileBreakpoint?: number
    children?: ReactNode
}
