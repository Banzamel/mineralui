import type {MInputProps} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'

export type MDateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD'

export interface MInputDateProps extends Omit<MInputProps, 'type' | 'maxLength' | 'showCharCount'> {
    format?: MDateFormat
    separator?: '/' | '.' | '-'
    minDate?: Date
    maxDate?: Date
    validateOnBlur?: boolean
    validateOnChange?: boolean
    onDateChange?: (date: Date | null, raw: string) => void
    onValidationChange?: (result: ValidationResult) => void
}
