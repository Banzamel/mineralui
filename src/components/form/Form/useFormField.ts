import {useEffect, useCallback} from 'react'
import {useFormContext} from './FormContext'
import type {ValidatorFn} from '../../../utils/validators'

export interface UseFormFieldOptions {
    validate?: ValidatorFn[]
    required?: boolean
}

export interface UseFormFieldReturn {
    value: unknown
    error: string | undefined
    touched: boolean
    onChange: (value: unknown) => void
    onBlur: () => void
}

// Connect a field name to the nearest form context and expose field-level helpers.
export function useFormField(name: string, options?: UseFormFieldOptions): UseFormFieldReturn {
    const ctx = useFormContext()

    // Register the field definition so the form can validate and reset it centrally.
    useEffect(() => {
        if (!ctx) return
        ctx.registerField({
            name,
            validate: options?.validate,
            required: options?.required,
        })
        return () => ctx.unregisterField(name)
    }, [ctx, name, options?.validate, options?.required])

    // Forward value updates into the form state.
    const onChange = useCallback(
        (val: unknown) => {
            ctx?.setFieldValue(name, val)
        },
        [ctx, name]
    )

    // Mark the field as touched when the control loses focus.
    const onBlur = useCallback(() => {
        ctx?.setFieldTouched(name, true)
    }, [ctx, name])

    return {
        value: ctx?.values[name] ?? '',
        error: ctx?.errors[name],
        touched: ctx?.touched[name] ?? false,
        onChange,
        onBlur,
    }
}
