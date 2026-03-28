import type {HTMLAttributes, ReactNode} from 'react'
import type {ContainerSize} from '../Container'
import type {MineralFontColor} from '../../../theme'

export type MHeaderTone = 'default' | 'surface' | 'subtle'

export interface MHeaderProps extends HTMLAttributes<HTMLElement> {
    container?: ContainerSize
    padded?: boolean
    bordered?: boolean
    sticky?: boolean
    tone?: MHeaderTone
    fcolor?: MineralFontColor
    children?: ReactNode
}
