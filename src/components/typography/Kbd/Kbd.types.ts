import type {HTMLAttributes, ReactNode} from 'react'
import type {MineralSize} from '../../../theme'

export interface KbdProps extends HTMLAttributes<HTMLElement> {
    size?: MineralSize
    children?: ReactNode
}
