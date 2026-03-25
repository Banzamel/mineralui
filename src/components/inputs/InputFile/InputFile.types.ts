import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface InputFileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    accept?: string
    multiple?: boolean
    maxSize?: number
    maxFiles?: number
    onChange?: (files: File[]) => void
    label?: string
    helperText?: string
    errorText?: string
    error?: boolean
    disabled?: boolean
    color?: MineralColor
    size?: MineralSize
    preview?: boolean
    icon?: ReactNode
    placeholder?: string
    dropText?: string
    fullWidth?: boolean
    style?: CSSProperties
}
