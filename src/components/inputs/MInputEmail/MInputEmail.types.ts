import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputEmailProps extends Omit<MInputProps, 'type'> {
    validateOnBlur?: boolean
    validateOnChange?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
}
