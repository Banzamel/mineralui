import {createContext, useContext} from 'react'
import type {RadioGroupContextValue} from './Radio.types'

export const RadioContext = createContext<RadioGroupContextValue | null>(null)

// Read the nearest radio-group context when a radio participates in grouped state.
export function useRadioGroup(): RadioGroupContextValue | null {
    return useContext(RadioContext)
}
