import type {ButtonHTMLAttributes, ReactNode} from 'react'
import type {MColor} from '../../../theme'
import type {MCardActionProps} from '../shared'

export interface MCardActionAreaProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, MCardActionProps {
    color?: MColor
    children?: ReactNode
}
