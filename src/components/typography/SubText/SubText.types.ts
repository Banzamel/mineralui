import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralFontColor} from '../../../theme'

export type SubTextSize = 'xs' | 'sm' | 'md'

export interface SubTextProps extends HTMLAttributes<HTMLElement> {
    as?: 'span' | 'p' | 'div' | 'small'
    size?: SubTextSize
    fcolor?: MineralFontColor
    children?: ReactNode
}
