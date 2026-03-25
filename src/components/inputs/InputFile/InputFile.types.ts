import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export type InputFileCropShape = 'square' | 'circle'

export interface InputFileCropOptions {
    shape?: InputFileCropShape
    outputSize?: number
    quality?: number
}

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
    crop?: InputFileCropOptions | boolean
    style?: CSSProperties
}
