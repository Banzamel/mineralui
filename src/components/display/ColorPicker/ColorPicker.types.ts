import type {HTMLAttributes} from 'react'

export type ColorPickerFormat = 'hex' | 'rgb' | 'hsl'

export interface ColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string
    onChange?: (color: string) => void
    swatches?: string[]
    format?: ColorPickerFormat
    size?: 'sm' | 'md' | 'lg'
    label?: string
    disabled?: boolean
}
