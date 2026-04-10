import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputNameProps extends Omit<MInputProps, 'type'> {
    autoCapitalize?: boolean
    allowNumbers?: boolean
    allowSpecialChars?: boolean
    minWords?: number
    validateOnBlur?: boolean
    onValidationChange?: (result: ValidationResult) => void
}
