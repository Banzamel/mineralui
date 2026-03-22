import type {InputProps} from '../Input/Input.types'
import type {CreditCardBrand} from '../../../utils/creditCards'
import type {ValidationResult} from '../../../utils/validators'

export interface InputCreditCardProps extends Omit<InputProps, 'type' | 'inputMode' | 'startIcon' | 'endIcon'> {
    validateOnBlur?: boolean
    validateOnChange?: boolean
    showBrandIcon?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onCardBrandChange?: (brand: CreditCardBrand) => void
    onValueChange?: (rawValue: string, formattedValue: string, brand: CreditCardBrand) => void
}
