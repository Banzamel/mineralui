import type {CSSProperties} from 'react'
import type {MineralFontColor, MineralSize} from '../../../theme'

export type TimePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface TimePickerProps {
    value?: string
    defaultValue?: string
    onChange?: (time: string) => void
    format?: '24h' | '12h'
    showSeconds?: boolean
    minuteStep?: number
    min?: string
    max?: string
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    name?: string
    id?: string
    variant?: TimePickerVariant
    size?: MineralSize
    fcolor?: MineralFontColor
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    required?: boolean
    clearable?: boolean
    fullWidth?: boolean
    className?: string
    style?: CSSProperties
}
