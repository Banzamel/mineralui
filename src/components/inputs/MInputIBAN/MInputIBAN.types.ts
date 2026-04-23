import type {MInputGroupProps} from '../MInputGroup'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputIBANProps extends Omit<MInputGroupProps, 'type' | 'prepend' | 'append'> {
    countryCode?: string
    formatOnChange?: boolean
    validateOnBlur?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string) => void
    onCountryChange?: (countryCode: string) => void
}
