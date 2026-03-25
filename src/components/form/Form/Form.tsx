import {useState, useRef, useCallback, useMemo} from 'react'
import type {FormProps, FieldRegistration, FormContextValue, FormHelpers} from './Form.types'
import {FormContext} from './FormContext'
import {validateRequired} from '../../../utils/validators'
import type {ValidationResult} from '../../../utils/validators'
import './Form.css'

// Coordinate form values, validation state and submit helpers through context.
export function Form({
    initialValues = {},
    onSubmit,
    onChange,
    validationMode = 'onBlur',
    children,
    className,
    style,
    noValidate = true,
}: FormProps) {
    const [values, setValues] = useState<Record<string, unknown>>({...initialValues})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const fieldsRef = useRef<Map<string, FieldRegistration>>(new Map())

    // Track mounted fields so validation stays aligned with active inputs.
    const registerField = useCallback((reg: FieldRegistration) => {
        fieldsRef.current.set(reg.name, reg)
    }, [])

    const unregisterField = useCallback((name: string) => {
        fieldsRef.current.delete(name)
    }, [])

    // Run required and custom validators without mutating visible error state yet.
    const validateFieldInternal = useCallback(
        (name: string, val?: unknown): ValidationResult => {
            const reg = fieldsRef.current.get(name)
            if (!reg) return {valid: true}

            const fieldValue = val !== undefined ? val : values[name]
            const strValue = fieldValue != null ? String(fieldValue) : ''

            // Required check
            if (reg.required) {
                const reqResult = validateRequired(strValue)
                if (!reqResult.valid) return reqResult
            }

            // Custom validators
            if (reg.validate) {
                for (const validator of reg.validate) {
                    const result = validator(strValue)
                    if (!result.valid) return result
                }
            }

            return {valid: true}
        },
        [values]
    )

    // Persist the latest validation result for a single field.
    const validateField = useCallback(
        (name: string): ValidationResult => {
            const result = validateFieldInternal(name)
            setErrors((prev) => {
                if (result.valid) {
                    const next = {...prev}
                    delete next[name]
                    return next
                }
                return {...prev, [name]: result.error!}
            })
            return result
        },
        [validateFieldInternal]
    )

    // Validate every registered field before submit.
    const validateAll = useCallback((): boolean => {
        let allValid = true
        const newErrors: Record<string, string> = {}

        for (const [name] of fieldsRef.current) {
            const result = validateFieldInternal(name)
            if (!result.valid) {
                allValid = false
                newErrors[name] = result.error!
            }
        }

        setErrors(newErrors)
        // Mark all as touched
        const allTouched: Record<string, boolean> = {}
        for (const [name] of fieldsRef.current) {
            allTouched[name] = true
        }
        setTouched(allTouched)

        return allValid
    }, [validateFieldInternal])

    // Update field values and trigger onChange or validation according to mode.
    const setFieldValue = useCallback(
        (name: string, val: unknown) => {
            setValues((prev) => {
                const next = {...prev, [name]: val}
                onChange?.(next)
                return next
            })

            if (validationMode === 'onChange' && touched[name]) {
                // Defer validation to next tick so values are updated
                setTimeout(() => validateField(name), 0)
            }
        },
        [onChange, validationMode, touched, validateField]
    )

    const setFieldError = useCallback((name: string, error: string) => {
        setErrors((prev) => ({...prev, [name]: error}))
    }, [])

    // Mark fields as touched so blur validation can start surfacing errors.
    const setFieldTouched = useCallback(
        (name: string, isTouched: boolean) => {
            setTouched((prev) => ({...prev, [name]: isTouched}))
            if (validationMode === 'onBlur' && isTouched) {
                validateField(name)
            }
        },
        [validationMode, validateField]
    )

    const resetForm = useCallback(() => {
        setValues({...initialValues})
        setErrors({})
        setTouched({})
        setIsSubmitting(false)
    }, [initialValues])

    // Guard submit flow with validation and a single in-flight submission state.
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (isSubmitting) return

            const valid = validateAll()
            if (!valid) return

            setIsSubmitting(true)
            const helpers: FormHelpers = {
                setSubmitting: setIsSubmitting,
                resetForm,
                setFieldError,
            }

            try {
                await onSubmit?.(values, helpers)
            } finally {
                setIsSubmitting(false)
            }
        },
        [isSubmitting, validateAll, values, onSubmit, resetForm, setFieldError]
    )

    // Memoize the public form context to limit downstream re-renders.
    const ctx = useMemo<FormContextValue>(
        () => ({
            values,
            errors,
            touched,
            registerField,
            unregisterField,
            setFieldValue,
            setFieldError,
            setFieldTouched,
            validateField,
            validateAll,
            resetForm,
            isSubmitting,
        }),
        [
            values,
            errors,
            touched,
            registerField,
            unregisterField,
            setFieldValue,
            setFieldError,
            setFieldTouched,
            validateField,
            validateAll,
            resetForm,
            isSubmitting,
        ]
    )

    return (
        <FormContext.Provider value={ctx}>
            <form onSubmit={handleSubmit} noValidate={noValidate} className={`form${className ? ` ${className}` : ''}`} style={style}>
                {typeof children === 'function' ? children(ctx) : children}
            </form>
        </FormContext.Provider>
    )
}
