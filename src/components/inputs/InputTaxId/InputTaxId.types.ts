import type {InputProps} from '../Input'
import type {ValidationResult} from '../../../utils/validators'

export type TaxIdType = 'NIP' | 'PESEL' | 'REGON'

export interface InputTaxIdProps extends Omit<InputProps, 'type'> {
    taxIdType: TaxIdType
    formatOnChange?: boolean
    validateOnBlur?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string) => void
}
