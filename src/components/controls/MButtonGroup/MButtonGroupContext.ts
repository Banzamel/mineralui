import {createContext, useContext} from 'react'
import type {MButtonVariant} from '../MButton/MButton.types'
import type {MColor, MSize} from '../../../theme'

export interface MButtonGroupContextValue {
    variant?: MButtonVariant
    size?: MSize
    color?: MColor
}

export const ButtonGroupContext = createContext<MButtonGroupContextValue | null>(null)

export function useButtonGroup(): MButtonGroupContextValue | null {
    return useContext(ButtonGroupContext)
}
