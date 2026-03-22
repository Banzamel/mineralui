import type {ChangeEvent, CSSProperties, FocusEvent, KeyboardEvent, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export type InputVariant = 'outlined' | 'filled' | 'underlined'

export interface InputProps {
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time'
    value?: string | number
    defaultValue?: string | number
    name?: string
    id?: string
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    autoFocus?: boolean
    autoComplete?: string
    inputMode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
    variant?: InputVariant
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    fullWidth?: boolean
    rounded?: boolean
    label?: string
    helperText?: string
    errorText?: string
    startIcon?: ReactNode
    endIcon?: ReactNode
    clearable?: boolean
    error?: boolean
    success?: boolean
    maxLength?: number
    showCharCount?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
    onClear?: () => void
    loading?: boolean
    clickEffect?: MineralClickEffect
    rippleColor?: string
    className?: string
    style?: CSSProperties
    inputClassName?: string
    labelClassName?: string
}
