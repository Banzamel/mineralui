import type {HTMLAttributes, ReactNode} from 'react'
import type {MContainerSize} from '../MContainer'

export type MNavbarTone = 'default' | 'surface' | 'subtle'
export type MNavbarJustify = 'start' | 'center' | 'between' | 'end'

export interface MNavbarProps extends HTMLAttributes<HTMLElement> {
    container?: MContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MNavbarTone
    justify?: MNavbarJustify
    wrap?: boolean
    children?: ReactNode
}
