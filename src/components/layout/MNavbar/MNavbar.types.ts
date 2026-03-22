import type {HTMLAttributes, ReactNode} from 'react'
import type {ContainerSize} from '../Container/Container.types'
import type {MineralFontColor} from '../../../theme'

export type MNavbarTone = 'default' | 'surface' | 'subtle'
export type MNavbarJustify = 'start' | 'center' | 'between' | 'end'
export type MNavbarAlign = 'start' | 'center' | 'end' | 'stretch'

export interface MNavbarProps extends HTMLAttributes<HTMLElement> {
    container?: ContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MNavbarTone
    fcolor?: MineralFontColor
    justify?: MNavbarJustify
    align?: MNavbarAlign
    wrap?: boolean
    children?: ReactNode
}
