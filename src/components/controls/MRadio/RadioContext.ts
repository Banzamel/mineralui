import {createContext, useContext} from 'react'
import type {MRadioGroupContextValue} from './MRadio.types'

export const RadioContext = createContext<MRadioGroupContextValue | null>(null)

// Read the nearest radio-group context when a radio participates in grouped state.
export function useRadioGroup(): MRadioGroupContextValue | null {
    return useContext(RadioContext)
}
