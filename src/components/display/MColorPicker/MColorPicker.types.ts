import type {HTMLAttributes} from 'react'
import type {MSize} from '../../../theme'

export type MColorPickerFormat = 'hex' | 'rgb' | 'hsl'

export interface MColorPickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string
    onChange?: (color: string) => void
    swatches?: string[]
    format?: MColorPickerFormat
    size?: MSize
    label?: string
    disabled?: boolean
}
