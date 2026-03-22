import {useState, useCallback, forwardRef} from 'react'
import type {InputIBANProps} from './InputIBAN.types'
import {Input} from '../Input'
import {validateIBAN} from '../../../utils/validators'
import {formatIBAN, unformatIBAN} from '../../../utils/formatters'
import type {ValidationResult} from '../../../utils/validators'

// Extend the base input with IBAN formatting and checksum validation.
export const InputIBAN = forwardRef<HTMLInputElement, InputIBANProps>(function InputIBAN(
    {
        formatOnChange = true,
        validateOnBlur = true,
        showValidIcon = true,
        onValidationChange,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        error,
        errorText,
        success,
        placeholder = 'PL00 0000 0000 0000 0000 0000 0000',
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? value.toString() : internalValue

    // Keep raw and formatted IBAN values aligned for consumers and display.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let raw = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase()
            const clean = raw.replace(/\s/g, '')
            const formatted = formatOnChange ? formatIBAN(clean) : clean

            if (value === undefined) {
                setInternalValue(formatted)
            }
            onValueChange?.(clean, formatted)
            onChange?.(e)
        },
        [onChange, value, formatOnChange, onValueChange]
    )

    // Validate the normalized IBAN once the user leaves the field.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)
            if (validateOnBlur && currentValue) {
                const result = validateIBAN(unformatIBAN(currentValue))
                setValidation(result)
                onValidationChange?.(result)
            }
            onBlur?.(e)
        },
        [onBlur, validateOnBlur, currentValue, onValidationChange]
    )

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)
    const isSuccess =
        !isError && (success !== undefined ? success : touched && validation.valid && currentValue.length > 0)

    const bankIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 14h14" />
            <path d="M2 6h12" />
            <path d="M8 2L1 6h14L8 2z" />
            <path d="M3 6v8M6 6v8M10 6v8M13 6v8" />
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
            type="text"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError}
            errorText={resolvedErrorText}
            success={isSuccess}
            placeholder={placeholder}
            startIcon={bankIcon}
            endIcon={validIcon}
            maxLength={34 + 8}
        />
    )
})
