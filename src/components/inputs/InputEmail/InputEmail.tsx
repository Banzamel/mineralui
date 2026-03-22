import {useState, useCallback, forwardRef} from 'react'
import type {InputEmailProps} from './InputEmail.types'
import {Input} from '../Input'
import {validateEmail} from '../../../utils/validators'
import type {ValidationResult} from '../../../utils/validators'

// Extend the base input with email validation and optional success feedback.
export const InputEmail = forwardRef<HTMLInputElement, InputEmailProps>(function InputEmail(
    {
        validateOnBlur = true,
        validateOnChange = false,
        showValidIcon = true,
        onValidationChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        error,
        errorText,
        success,
        placeholder = 'email@example.com',
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? value.toString() : internalValue

    // Reuse the shared email validator and surface the latest result upstream.
    const runValidation = useCallback(
        (val: string) => {
            const result = validateEmail(val)
            setValidation(result)
            onValidationChange?.(result)
            return result
        },
        [onValidationChange]
    )

    // Validate while typing only when the component is configured to do so.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (value === undefined) {
                setInternalValue(e.target.value)
            }
            if (validateOnChange && touched) {
                runValidation(e.target.value)
            }
            onChange?.(e)
        },
        [onChange, value, validateOnChange, touched, runValidation]
    )

    // Validate optional email input on blur once the user has interacted with it.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)
            if (validateOnBlur && e.target.value) {
                runValidation(e.target.value)
            }
            onBlur?.(e)
        },
        [onBlur, validateOnBlur, runValidation]
    )

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)
    const isSuccess =
        !isError && success !== undefined ? success : touched && validation.valid && currentValue.length > 0

    const emailIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="3" width="14" height="10" rx="2" />
            <path d="M1 5L8 9L15 5" />
        </svg>
    )

    const validIcon =
        showValidIcon && isSuccess ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--mineral-success)" strokeWidth="2">
                <path d="M3 8L6.5 11.5L13 4.5" />
            </svg>
        ) : undefined

    return (
        <Input
            {...rest}
            ref={ref}
            type="email"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError}
            errorText={resolvedErrorText}
            success={isSuccess}
            placeholder={placeholder}
            startIcon={emailIcon}
            endIcon={validIcon}
        />
    )
})
