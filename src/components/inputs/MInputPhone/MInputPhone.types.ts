import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputPhoneProps extends Omit<MInputProps, 'type'> {
    countryCode?: string
    showCountryCode?: boolean
    formatOnChange?: boolean
    validateOnBlur?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string) => void
}
