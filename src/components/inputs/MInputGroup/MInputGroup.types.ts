import type {ReactNode} from 'react'
import type {MInputProps} from '../MInput'

export interface MInputGroupAddon {
    type: 'text' | 'icon' | 'button' | 'checkbox'
    content: ReactNode
    onClick?: () => void
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

export type MInputGroupSlot = MInputGroupAddon | ReactNode

export interface MInputGroupProps extends Omit<MInputProps, 'startIcon' | 'endIcon' | 'rounded'> {
    prepend?: MInputGroupSlot | MInputGroupSlot[]
    append?: MInputGroupSlot | MInputGroupSlot[]
}
