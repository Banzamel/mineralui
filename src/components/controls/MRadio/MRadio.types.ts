import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export interface MRadioProps {
    checked?: boolean
    defaultChecked?: boolean
    name?: string
    id?: string
    value?: string
    disabled?: boolean
    size?: MSize
    color?: MColor
    label?: ReactNode
    labelPosition?: 'right' | 'left'
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clickEffect?: MClickEffect
    rippleColor?: string
    className?: string
    style?: CSSProperties
}

export interface MRadioGroupProps {
    name: string
    value?: string
    defaultValue?: string
    onChange?: (value: string) => void
    direction?: 'horizontal' | 'vertical'
    children: ReactNode
    disabled?: boolean
    size?: MSize
    color?: MColor
    error?: boolean
    errorText?: string
    label?: string
    className?: string
    style?: CSSProperties
}

export interface MRadioGroupContextValue {
    name: string
    value?: string
    disabled?: boolean
    size?: MSize
    color?: MColor
    onChange?: (value: string) => void
}
