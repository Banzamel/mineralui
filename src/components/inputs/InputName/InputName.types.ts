import type {InputProps} from '../Input'
import type {ValidationResult} from '../../../utils/validators'

export interface InputNameProps extends Omit<InputProps, 'type'> {
    autoCapitalize?: boolean
    allowNumbers?: boolean
    allowSpecialChars?: boolean
    minWords?: number
    validateOnBlur?: boolean
    onValidationChange?: (result: ValidationResult) => void
}
