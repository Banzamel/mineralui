import type {InputProps} from '../Input'
import type {ValidationResult} from '../../../utils/validators'

export interface InputPhoneProps extends Omit<InputProps, 'type'> {
    countryCode?: string
    showCountryCode?: boolean
    formatOnChange?: boolean
    validateOnBlur?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string) => void
}
