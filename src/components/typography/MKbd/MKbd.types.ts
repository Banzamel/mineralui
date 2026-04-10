import type {HTMLAttributes, ReactNode} from 'react'
import type {MSize} from '../../../theme'

export interface MKbdProps extends HTMLAttributes<HTMLElement> {
    size?: MSize
    children?: ReactNode
}
