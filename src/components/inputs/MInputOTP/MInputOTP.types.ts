import type {CSSProperties, HTMLAttributes} from 'react'
import type {MColor, MSize} from '../../../theme'

export interface MInputOTPProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    length?: number
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    disabled?: boolean
    color?: MColor
    size?: MSize
    error?: boolean
    errorText?: string
    clearable?: boolean
    label?: string
    onClear?: () => void
    style?: CSSProperties
}
