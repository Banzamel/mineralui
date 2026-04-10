import type {CSSProperties} from 'react'
import type {MColor, MSize} from '../../../theme'

export type MTimePickerVariant = 'outlined' | 'filled' | 'underlined'

export interface MTimePickerProps {
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
    variant?: MTimePickerVariant
    size?: MSize
    color?: MColor
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
