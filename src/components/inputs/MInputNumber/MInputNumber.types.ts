import type {MInputProps} from '../MInput'

export interface MInputNumberProps extends Omit<MInputProps, 'type'> {
    min?: number
    max?: number
    step?: number
    showStepper?: boolean
    precision?: number
    allowNegative?: boolean
    onValueChange?: (value: number | null) => void
}
