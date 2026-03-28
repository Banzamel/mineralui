import type {ReactNode} from 'react'
import type {InputProps} from '../Input'

export interface InputGroupAddon {
    type: 'text' | 'icon' | 'button' | 'checkbox'
    content: ReactNode
    onClick?: () => void
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

export type InputGroupSlot = InputGroupAddon | ReactNode

export interface InputGroupProps extends Omit<InputProps, 'startIcon' | 'endIcon' | 'rounded'> {
    prepend?: InputGroupSlot | InputGroupSlot[]
    append?: InputGroupSlot | InputGroupSlot[]
}
