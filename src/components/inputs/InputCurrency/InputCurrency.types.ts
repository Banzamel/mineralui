import type {InputProps} from '../Input'

export interface InputCurrencyProps extends Omit<InputProps, 'type'> {
    currency?: string
    currencySymbol?: string
    currencyPosition?: 'start' | 'end'
    decimalSeparator?: '.' | ','
    thousandSeparator?: ' ' | '.' | ',' | ''
    precision?: number
    min?: number
    max?: number
    allowNegative?: boolean
    onValueChange?: (value: number | null) => void
}
