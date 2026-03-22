import type {InputProps} from '../Input'
import type {ValidationResult} from '../../../utils/validators'

export interface InputEmailProps extends Omit<InputProps, 'type'> {
    validateOnBlur?: boolean
    validateOnChange?: boolean
    showValidIcon?: boolean
    onValidationChange?: (result: ValidationResult) => void
}
