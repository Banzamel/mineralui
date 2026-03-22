import {createContext, useContext} from 'react'
import type {FormContextValue} from './Form.types'

export const FormContext = createContext<FormContextValue | null>(null)

// Read the nearest form context to integrate custom fields with shared state.
export function useFormContext(): FormContextValue | null {
    return useContext(FormContext)
}
