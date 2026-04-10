import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MColor, MSize} from '../../../theme'
import type {MClickEffect} from '../../../utils/useInteractionEffect'

export interface MToggleProps {
    checked?: boolean
    defaultChecked?: boolean
    name?: string
    id?: string
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
