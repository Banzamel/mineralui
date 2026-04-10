import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'

import type {MSize} from '../../../theme'

export type MTagVariant = 'solid' | 'outlined'

export interface MTagProps extends HTMLAttributes<HTMLSpanElement> {
    label: ReactNode
    color?: MColor
    variant?: MTagVariant
    size?: MSize
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    icon?: ReactNode
}
