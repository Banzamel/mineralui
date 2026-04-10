import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'

export type MInputFileCropShape = 'square' | 'circle'

export interface MInputFileCropOptions {
    shape?: MInputFileCropShape
    outputSize?: number
    quality?: number
}

export interface MInputFileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    color?: MColor
    size?: MSize
    preview?: boolean
    clearable?: boolean
    icon?: ReactNode
    placeholder?: string
    dropText?: string
    fullWidth?: boolean
    crop?: MInputFileCropOptions | boolean
    onClear?: () => void
    style?: CSSProperties
}
