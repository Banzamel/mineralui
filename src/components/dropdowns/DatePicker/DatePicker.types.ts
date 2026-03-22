import type {CSSProperties} from 'react'
import type {MineralFontColor, MineralSize} from '../../../theme'

export type DatePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface DatePickerProps {
    value?: Date | string
    defaultValue?: Date | string
    onChange?: (date: Date | null) => void
    format?: string
    locale?: 'pl' | 'en'
    min?: Date | string
    max?: Date | string
    disabledDates?: Date[] | ((date: Date) => boolean)
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    name?: string
    id?: string
    variant?: DatePickerVariant
    size?: MineralSize
    fcolor?: MineralFontColor
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    clearable?: boolean
    inline?: boolean
    showTodayButton?: boolean
    firstDayOfWeek?: 0 | 1
    fullWidth?: boolean
    className?: string
    style?: CSSProperties
}
