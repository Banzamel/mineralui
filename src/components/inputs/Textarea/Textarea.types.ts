import type {ChangeEvent, FocusEvent, CSSProperties} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'

export type TextareaVariant = 'outlined' | 'filled' | 'underlined'

export interface TextareaProps {
    value?: string
    defaultValue?: string
    name?: string
    id?: string
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    autoFocus?: boolean

    rows?: number
    autoResize?: boolean
    minRows?: number
    maxRows?: number

    variant?: TextareaVariant
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    fullWidth?: boolean

    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    success?: boolean
    maxLength?: number
    showCharCount?: boolean

    ghostOptions?: string[]
    ghostMinChars?: number
    onGhostAccept?: (value: string) => void

    loading?: boolean

    onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void
    onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void

    className?: string
    style?: CSSProperties
    textareaClassName?: string
    labelClassName?: string
}
