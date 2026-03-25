import type {CSSProperties, HTMLAttributes} from 'react'
import type {MineralColor, MineralSize} from '../../../theme'

export interface InputOTPProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    length?: number
    value?: string
    onChange?: (value: string) => void
    autoFocus?: boolean
    disabled?: boolean
    color?: MineralColor
    size?: MineralSize
    error?: boolean
    errorText?: string
    label?: string
    style?: CSSProperties
}
