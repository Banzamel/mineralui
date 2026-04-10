import {useState, useCallback, useEffect, forwardRef} from 'react'
import type * as React from 'react'
import type {MInputIBANProps} from './MInputIBAN.types'
import {MInput} from '../MInput'
import {validateIBAN} from '../../../utils/validators'
import {formatIBAN, unformatIBAN} from '../../../utils/formatters'
import type {ValidationResult} from '../../../utils/validators'
import {MBankIcon, MCheckIcon} from '../../../icons'

function normalizeCountryCode(countryCode?: string): string | undefined {
    const normalized = countryCode
        ?.replace(/[^a-zA-Z]/g, '')
        .toUpperCase()
        .slice(0, 2)
    return normalized || undefined
}

function normalizeIbanValue(value: string, countryCode?: string): string {
    const clean = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    const normalizedCountryCode = normalizeCountryCode(countryCode)

    if (!normalizedCountryCode) {
        return clean
    }

    return `${normalizedCountryCode}${clean.replace(/^[A-Z]{0,2}/, '')}`
}

function formatIbanDisplayValue(value: string, countryCode?: string, formatOnChange: boolean = true): string {
    const normalized = normalizeIbanValue(value, countryCode)
    return formatOnChange ? formatIBAN(normalized) : normalized
}

function buildIbanPlaceholder(countryCode?: string): string {
    const normalizedCountryCode = normalizeCountryCode(countryCode)
    return normalizedCountryCode
        ? `${normalizedCountryCode}00 0000 0000 0000 0000 0000 0000`
        : 'PL00 0000 0000 0000 0000 0000 0000'
}

// Extend the base input with IBAN formatting and checksum validation.
export const MInputIBAN = forwardRef<HTMLInputElement, MInputIBANProps>(function MInputIBAN(
    {
        countryCode,
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
        placeholder,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(() =>
        formatIbanDisplayValue(defaultValue?.toString() ?? '', countryCode, formatOnChange)
    )
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue =
        value !== undefined ? formatIbanDisplayValue(value.toString(), countryCode, formatOnChange) : internalValue

    useEffect(() => {
        if (value !== undefined) return
        setInternalValue((prev) => formatIbanDisplayValue(prev, countryCode, formatOnChange))
    }, [countryCode, formatOnChange, value])

    // Keep raw and formatted IBAN values aligned for consumers and display.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const clean = normalizeIbanValue(unformatIBAN(e.target.value), countryCode)
            const formatted = formatOnChange ? formatIBAN(clean) : clean

            if (value === undefined) {
                setInternalValue(formatted)
            }
            onValueChange?.(clean, formatted)
            onChange?.(e)
        },
        [countryCode, onChange, value, formatOnChange, onValueChange]
    )

    // Validate the normalized IBAN once the user leaves the field.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)
            if (validateOnBlur && currentValue) {
                const result = validateIBAN(normalizeIbanValue(unformatIBAN(currentValue), countryCode))
                setValidation(result)
                onValidationChange?.(result)
            }
            onBlur?.(e)
        },
        [countryCode, onBlur, validateOnBlur, currentValue, onValidationChange]
    )

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)
    const isSuccess =
        !isError && (success !== undefined ? success : touched && validation.valid && currentValue.length > 0)

    const validIcon =
        showValidIcon && isSuccess ? (
            <span className="validation-icon">
                <MCheckIcon />
            </span>
        ) : undefined

    return (
        <MInput
            {...rest}
            ref={ref}
            type="text"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError}
            errorText={resolvedErrorText}
            success={isSuccess}
            placeholder={placeholder ?? buildIbanPlaceholder(countryCode)}
            startIcon={<MBankIcon />}
            endIcon={validIcon}
            maxLength={34 + 8}
        />
    )
})
