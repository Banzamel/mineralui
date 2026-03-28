import {useState, useCallback, forwardRef} from 'react'
import type {InputIBANProps} from './InputIBAN.types'
import {Input} from '../Input'
import {validateIBAN} from '../../../utils/validators'
import {formatIBAN, unformatIBAN} from '../../../utils/formatters'
import type {ValidationResult} from '../../../utils/validators'
import {BankIcon, CheckIcon} from '../../../icons'

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

    const validIcon =
        showValidIcon && isSuccess ? (
            <span style={{display: 'inline-flex', color: 'var(--mineral-success)'}}>
                <CheckIcon />
            </span>
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
            startIcon={<BankIcon />}
            endIcon={validIcon}
            maxLength={34 + 8}
        />
    )
})
