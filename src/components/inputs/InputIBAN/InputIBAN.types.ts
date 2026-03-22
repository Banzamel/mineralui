import type {InputProps} from '../Input'
import type {ValidationResult} from '../../../utils/validators'

export interface InputIBANProps extends Omit<InputProps, 'type'> {
    countryCode?: string
    formatOnChange?: boolean
    validateOnBlur?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string) => void
}
