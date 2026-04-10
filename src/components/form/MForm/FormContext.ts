import {createContext, useContext} from 'react'
import type {MFormContextValue} from './MForm.types'

export const FormContext = createContext<MFormContextValue | null>(null)

// Read the nearest form context to integrate custom fields with shared state.
export function useFormContext(): MFormContextValue | null {
    return useContext(FormContext)
}
