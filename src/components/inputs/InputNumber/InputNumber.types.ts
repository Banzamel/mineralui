import type {InputProps} from '../Input'

export interface InputNumberProps extends Omit<InputProps, 'type'> {
    min?: number
    max?: number
    step?: number
    showStepper?: boolean
    precision?: number
    allowNegative?: boolean
    onValueChange?: (value: number | null) => void
}
