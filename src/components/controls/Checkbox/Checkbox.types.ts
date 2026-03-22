import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface CheckboxProps {
    checked?: boolean
    defaultChecked?: boolean
    indeterminate?: boolean
    name?: string
    id?: string
    value?: string
    disabled?: boolean
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    label?: ReactNode
    labelPosition?: 'right' | 'left'
    error?: boolean
    errorText?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clickEffect?: MineralClickEffect
    rippleColor?: string
    className?: string
    style?: CSSProperties
}
