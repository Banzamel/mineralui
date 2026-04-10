import type {ChangeEvent, FocusEvent, CSSProperties} from 'react'
import type {MColor, MSize} from '../../../theme'

export type MTextareaVariant = 'outlined' | 'filled' | 'underlined'

export interface MTextareaProps {
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

    variant?: MTextareaVariant
    size?: MSize
    color?: MColor
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
