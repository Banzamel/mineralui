import type {HTMLAttributes, ReactNode} from 'react'
import type {MColor, MHiddenProps, MSize} from '../../../theme'

export type MTagVariant = 'solid' | 'outlined'

export interface MTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'hidden'>, MHiddenProps {
    label: ReactNode
    color?: MColor
    variant?: MTagVariant
    size?: MSize
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    icon?: ReactNode
}
