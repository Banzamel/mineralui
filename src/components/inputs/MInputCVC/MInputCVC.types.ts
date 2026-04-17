import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputCVCProps extends Omit<MInputProps, 'type' | 'maxLength' | 'showCharCount' | 'inputMode'> {
    length?: 3 | 4
    validateOnBlur?: boolean
    validateOnChange?: boolean
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (raw: string) => void
}
