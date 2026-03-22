import type {InputGroupProps} from '../InputGroup/InputGroup.types'
import type {ValidationResult} from '../../../utils/validators'

export interface InputPostCodeProps extends Omit<InputGroupProps, 'prepend' | 'type' | 'inputMode'> {
    country?: string
    defaultCountry?: string
    selectableCountry?: boolean
    validateOnBlur?: boolean
    validateOnChange?: boolean
    onCountryChange?: (countryCode: string) => void
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string, countryCode: string) => void
}
