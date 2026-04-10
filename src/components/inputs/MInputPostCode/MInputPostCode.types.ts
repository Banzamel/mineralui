import type {MInputGroupProps} from '../MInputGroup'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputPostCodeProps extends Omit<MInputGroupProps, 'prepend' | 'type' | 'inputMode'> {
    country?: string
    defaultCountry?: string
    selectableCountry?: boolean
    validateOnBlur?: boolean
    validateOnChange?: boolean
    onCountryChange?: (countryCode: string) => void
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string, formattedValue: string, countryCode: string) => void
}
