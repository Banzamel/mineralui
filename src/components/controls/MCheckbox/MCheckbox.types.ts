import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export interface MCheckboxProps {
    checked?: boolean
    defaultChecked?: boolean
    indeterminate?: boolean
    name?: string
    id?: string
    value?: string
    disabled?: boolean
    size?: MSize
    color?: MColor
    label?: ReactNode
    labelPosition?: 'right' | 'left'
    error?: boolean
    errorText?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clickEffect?: MClickEffect
    rippleColor?: string
    className?: string
    style?: CSSProperties
}
