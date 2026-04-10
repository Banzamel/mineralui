import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export type MTaxIdType = 'NIP' | 'PESEL' | 'REGON'

export interface MInputTaxIdProps extends Omit<MInputProps, 'type'> {
    taxIdType: MTaxIdType
    formatOnChange?: boolean
    validateOnBlur?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (rawValue: string) => void
}
