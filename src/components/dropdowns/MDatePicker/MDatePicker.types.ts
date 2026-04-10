import type {CSSProperties} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {ValidationResult} from '../../../utils/validators'

export type MDatePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface MDatePickerProps {
    value?: Date | string
    defaultValue?: Date | string
    onChange?: (date: Date | null) => void
    format?: string
    locale?: string
    min?: Date | string
    max?: Date | string
    disabledDates?: Date[] | ((date: Date) => boolean)
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    name?: string
    id?: string
    variant?: MDatePickerVariant
    size?: MSize
    color?: MColor
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    clearable?: boolean
    withTime?: boolean
    validateOnBlur?: boolean
    validateOnChange?: boolean
    onValidationChange?: (result: ValidationResult) => void
    timeFormat?: '24h' | '12h'
    showSeconds?: boolean
    minuteStep?: number
    timePlaceholder?: string
    inline?: boolean
    showTodayButton?: boolean
    firstDayOfWeek?: 0 | 1
    fullWidth?: boolean
    className?: string
    style?: CSSProperties
}
