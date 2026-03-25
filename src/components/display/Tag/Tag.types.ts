import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralFontColor} from '../../../theme'

export type TagVariant = 'solid' | 'outlined'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    label: ReactNode
    color?: MineralColor
    variant?: TagVariant
    closable?: boolean
    onClose?: () => void
    icon?: ReactNode
    fcolor?: MineralFontColor
}
