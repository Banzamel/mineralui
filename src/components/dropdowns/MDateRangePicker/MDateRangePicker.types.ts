import type {CSSProperties} from 'react'
import type {MColor, MSize} from '../../../theme'

export type MDateRangePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface MDateRangeValue {
    start: Date | string | null
    end: Date | string | null
}

export interface MDateRangePreset {
    label: string
    value: {
        start: Date | string
        end: Date | string
    }
}

export interface MDateRangePickerProps {
    value?: MDateRangeValue
    defaultValue?: MDateRangeValue
    onChange?: (range: {start: Date | null; end: Date | null}) => void
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
    variant?: MDateRangePickerVariant
    size?: MSize
    color?: MColor
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    clearable?: boolean
    inline?: boolean
    showTodayButton?: boolean
    presets?: boolean | MDateRangePreset[]
    presetsSidebar?: boolean
    firstDayOfWeek?: 0 | 1
    fullWidth?: boolean
    allowSameDay?: boolean
    className?: string
    style?: CSSProperties
}
