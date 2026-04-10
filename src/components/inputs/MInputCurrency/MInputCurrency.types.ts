import type {MInputProps} from '../MInput'

export interface MInputCurrencyProps extends Omit<MInputProps, 'type'> {
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
