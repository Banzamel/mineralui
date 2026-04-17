import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export interface MInputExpDateProps extends Omit<MInputProps, 'type' | 'maxLength' | 'showCharCount' | 'inputMode'> {
    validateOnBlur?: boolean
    validateOnChange?: boolean
    minYear?: number
    maxYear?: number
    onValidationChange?: (result: ValidationResult) => void
    onValueChange?: (raw: string, formatted: string) => void
}
