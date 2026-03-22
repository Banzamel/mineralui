import type {CSSProperties} from 'react'
import type {MineralFontColor, MineralSize} from '../../../theme'

export type DateRangePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface DateRangeValue {
    start: Date | string | null
    end: Date | string | null
}

export interface DateRangePreset {
    label: string
    value: {
        start: Date | string
        end: Date | string
    }
}

export interface DateRangePickerProps {
    value?: DateRangeValue
    defaultValue?: DateRangeValue
    onChange?: (range: {start: Date | null; end: Date | null}) => void
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
    variant?: DateRangePickerVariant
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
    presets?: boolean | DateRangePreset[]
    presetsSidebar?: boolean
    firstDayOfWeek?: 0 | 1
    fullWidth?: boolean
    allowSameDay?: boolean
    className?: string
    style?: CSSProperties
}
