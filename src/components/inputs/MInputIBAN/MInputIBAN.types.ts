import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputIBANProps extends Omit<MInputProps, 'type'> {
    countryCode?: string
    formatOnChange?: boolean
    validateOnBlur?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string) => void
}
