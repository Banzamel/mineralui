import type {CSSProperties, ChangeEvent, ReactNode} from 'react'
import type {MineralColor, MineralFontColor, MineralSize} from '../../../theme'
import type {MineralClickEffect} from '../../../utils/useInteractionEffect'

export interface ToggleProps {
    checked?: boolean
    defaultChecked?: boolean
    name?: string
    id?: string
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
