import {useState, useCallback, forwardRef} from 'react'
import type {InputPhoneProps} from './InputPhone.types'
import {Input} from '../Input'
import {cn} from '../../../utils/cn'
import {validatePhone} from '../../../utils/validators'
import {formatPhone, stripNonDigits} from '../../../utils/formatters'
import type {ValidationResult} from '../../../utils/validators'
import {PhoneIcon} from '../../../icons'
import './InputPhone.css'

// Extend the base input with country-aware phone formatting and validation.
export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(function InputPhone(
    {
        countryCode = 'PL',
        showCountryCode = true,
        formatOnChange = true,
        validateOnBlur = true,
        onValidationChange,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        error,
        errorText,
        placeholder = '123 456 789',
        className,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? value.toString() : internalValue

    // Keep the emitted raw digits and the displayed formatted value aligned.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = stripNonDigits(e.target.value)
            const formatted = formatOnChange ? formatPhone(digits, {countryCode}) : digits

            if (value === undefined) {
                setInternalValue(formatted)
            }
            onValueChange?.(digits, formatted)
            onChange?.(e)
        },
        [onChange, value, formatOnChange, countryCode, onValueChange]
    )

    // Validate the raw number on blur using country-specific length rules.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)
            if (validateOnBlur && currentValue) {
                const result = validatePhone(stripNonDigits(currentValue), countryCode)
                setValidation(result)
                onValidationChange?.(result)
            }
            onBlur?.(e)
        },
        [onBlur, validateOnBlur, currentValue, countryCode, onValidationChange]
    )

    const COUNTRY_PREFIXES: Record<string, string> = {
        PL: '+48',
        DE: '+49',
        US: '+1',
        GB: '+44',
        FR: '+33',
        CZ: '+420',
        SK: '+421',
    }

    const prefix = showCountryCode ? (
        <span className="phone prefix">{COUNTRY_PREFIXES[countryCode.toUpperCase()] ?? `+${countryCode}`}</span>
    ) : undefined

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)

    return (
        <Input
            {...rest}
            ref={ref}
            type="tel"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError}
            errorText={resolvedErrorText}
            placeholder={placeholder}
            startIcon={showCountryCode ? prefix : <PhoneIcon />}
            className={cn('phone input', className)}
        />
    )
})
