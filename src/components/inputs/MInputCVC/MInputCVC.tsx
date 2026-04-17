import {forwardRef, useCallback, useState} from 'react'
import type * as React from 'react'
import type {MInputCVCProps} from './MInputCVC.types'
import {MInput} from '../MInput'
import type {ValidationResult} from '../../../utils/validators'
import {MCheckIcon} from '../../../icons'
import {cn} from '../../../utils/cn'
import './MInputCVC.css'

const OK: ValidationResult = {valid: true}

function stripDigits(value: string) {
    return value.replace(/\D/g, '')
}

function validateCvc(value: string, length: 3 | 4): ValidationResult {
    if (!value) {
        return OK
    }

    const digits = stripDigits(value)

    if (digits.length !== length) {
        return {valid: false, error: `Security code must have ${length} digits`}
    }

    return OK
}

export const MInputCVC = forwardRef<HTMLInputElement, MInputCVCProps>(function MInputCVC(
    {
        length = 3,
        validateOnBlur = true,
        validateOnChange = false,
        onValidationChange,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        onKeyDown,
        error,
        errorText,
        success,
        placeholder,
        className,
        inputClassName,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(() => stripDigits(defaultValue?.toString() ?? '').slice(0, length))
    const [validation, setValidation] = useState<ValidationResult>(OK)
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? stripDigits(value.toString()).slice(0, length) : internalValue

    const runValidation = useCallback(
        (nextValue: string) => {
            const result = validateCvc(nextValue, length)
            setValidation(result)
            onValidationChange?.(result)
            return result
        },
        [length, onValidationChange]
    )

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const nextValue = stripDigits(event.target.value).slice(0, length)

            if (value === undefined) {
                setInternalValue(nextValue)
            }

            onValueChange?.(nextValue)

            if (validateOnChange && touched) {
                runValidation(nextValue)
            }

            onChange?.(event)
        },
        [length, onChange, onValueChange, runValidation, touched, validateOnChange, value]
    )

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true)

            if (validateOnBlur && currentValue) {
                runValidation(currentValue)
            }

            onBlur?.(event)
        },
        [currentValue, onBlur, runValidation, validateOnBlur]
    )

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                onKeyDown?.(event)
                return
            }

            if (event.ctrlKey || event.metaKey) {
                onKeyDown?.(event)
                return
            }

            if (!/^\d$/.test(event.key)) {
                event.preventDefault()
            }

            onKeyDown?.(event)
        },
        [onKeyDown]
    )

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)
    const isSuccess = !isError && (success !== undefined ? success : touched && currentValue.length === length)
    const endIcon = isSuccess ? <MCheckIcon /> : undefined

    return (
        <MInput
            {...rest}
            ref={ref}
            type="text"
            inputMode="numeric"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={isError}
            errorText={resolvedErrorText}
            success={isSuccess}
            placeholder={placeholder ?? ''.padEnd(length, '0')}
            maxLength={length}
            endIcon={endIcon}
            inputClassName={cn('input-cvc-field', inputClassName)}
            className={className}
        />
    )
})
