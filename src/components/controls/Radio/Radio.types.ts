import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface RadioProps {
    checked?: boolean
    defaultChecked?: boolean
    name?: string
    id?: string
    value?: string
    disabled?: boolean
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    label?: ReactNode
    labelPosition?: 'right' | 'left'
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clickEffect?: MineralClickEffect
    rippleColor?: string
    className?: string
    style?: CSSProperties
}

export interface RadioGroupProps {
    name: string
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    direction?: 'horizontal' | 'vertical'
    children: ReactNode
    disabled?: boolean
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    error?: boolean
    errorText?: string
    label?: string
    className?: string
    style?: CSSProperties
}

export interface RadioGroupContextValue {
    name: string
    value?: string
    disabled?: boolean
    size?: MineralSize
    color?: MineralColor
    fcolor?: MineralFontColor
    onChange?: (value: string) => void
}
