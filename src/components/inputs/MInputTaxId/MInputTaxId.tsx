import {useState, useCallback, forwardRef} from 'react'
import type * as React from 'react'
import type {MInputTaxIdProps, MTaxIdType} from './MInputTaxId.types'
import {MInput} from '../MInput'
import {validateNIP, validatePESEL, validateREGON} from '../../../utils/validators'
import {formatNIP, stripNonDigits} from '../../../utils/formatters'
import type {ValidationResult} from '../../../utils/validators'
import {MCheckIcon, MIdCardIcon} from '../../../icons'

const VALIDATORS: Record<MTaxIdType, (v: string) => ValidationResult> = {
    NIP: validateNIP,
    PESEL: validatePESEL,
    REGON: validateREGON,
}

const MAX_LENGTHS: Record<MTaxIdType, number> = {
    NIP: 13,
    PESEL: 11,
    REGON: 14,
}

const PLACEHOLDERS: Record<MTaxIdType, string> = {
    NIP: '123-456-78-19',
    PESEL: '00000000000',
    REGON: '000000000',
}

// Extend the base input with NIP, PESEL and REGON formatting and validation.
export const MInputTaxId = forwardRef<HTMLInputElement, MInputTaxIdProps>(function MInputTaxId(
    {
        taxIdType,
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
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? value.toString() : internalValue

    // Normalize the visible value based on the selected identifier type.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const digits = stripNonDigits(e.target.value)
            const formatted = formatOnChange && taxIdType === 'NIP' ? formatNIP(digits) : digits

            if (value === undefined) {
                setInternalValue(formatted)
            }
            onValueChange?.(digits)
            onChange?.(e)
        },
        [onChange, value, formatOnChange, taxIdType, onValueChange]
    )

    // Validate the stripped numeric value against the active identifier rules.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)
            if (validateOnBlur && currentValue) {
                const validator = VALIDATORS[taxIdType]
                const result = validator(stripNonDigits(currentValue))
                setValidation(result)
                onValidationChange?.(result)
            }
            onBlur?.(e)
        },
        [onBlur, validateOnBlur, currentValue, taxIdType, onValidationChange]
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
            inputMode="numeric"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            error={isError}
            errorText={resolvedErrorText}
            success={isSuccess}
            placeholder={placeholder ?? PLACEHOLDERS[taxIdType]}
            startIcon={<MIdCardIcon />}
            endIcon={validIcon}
            maxLength={MAX_LENGTHS[taxIdType]}
        />
    )
})
