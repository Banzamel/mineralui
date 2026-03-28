import {forwardRef, useCallback, useMemo, useState} from 'react'
import type {InputCreditCardProps} from './InputCreditCard.types'
import {Input} from '../Input'
import {cn} from '../../../utils/cn'
import {detectCardBrand, formatCardNumber, stripCardNumber, validateCardNumber} from '../../../utils/creditCards'
import type {ValidationResult} from '../../../utils/validators'
import {CheckIcon} from '../../../icons'
import './InputCreditCard.css'

function CardBrandBadge({value}: {value: string}) {
    const brand = detectCardBrand(value)

    return <span className={cn('credit brand', brand.brand)}>{brand.iconLabel}</span>
}

// Extend the base input with payment card detection, formatting and checksum validation.
export const InputCreditCard = forwardRef<HTMLInputElement, InputCreditCardProps>(function InputCreditCard(
    {
        validateOnBlur = true,
        validateOnChange = false,
        showBrandIcon = true,
        showValidIcon = true,
        onValidationChange,
        onCardBrandChange,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        error,
        errorText,
        success,
        placeholder = '4242 4242 4242 4242',
        className,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(() => formatCardNumber(defaultValue?.toString() ?? ''))
    const [validation, setValidation] = useState<ValidationResult>({valid: true})
    const [touched, setTouched] = useState(false)

    const currentValue = value !== undefined ? formatCardNumber(value.toString()) : internalValue
    const detectedBrand = useMemo(() => detectCardBrand(currentValue), [currentValue])

    const runValidation = useCallback(
        (formattedValue: string) => {
            const result = validateCardNumber(formattedValue)
            setValidation(result)
            onValidationChange?.(result)
            return result
        },
        [onValidationChange]
    )

    // Keep the visible card number grouped while exposing raw digits to the caller.
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatCardNumber(event.target.value)
            const nextBrand = detectCardBrand(formattedValue)

            if (value === undefined) {
                setInternalValue(formattedValue)
            }

            onCardBrandChange?.(nextBrand.brand)
            onValueChange?.(stripCardNumber(formattedValue), formattedValue, nextBrand.brand)

            if (validateOnChange && touched) {
                runValidation(formattedValue)
            }

            onChange?.(event)
        },
        [onCardBrandChange, onChange, onValueChange, runValidation, touched, validateOnChange, value]
    )

    // Validate after the user leaves the field so checksum feedback stays predictable.
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

    const isError = error || (touched && !validation.valid)
    const resolvedErrorText = errorText || (touched && !validation.valid ? validation.error : undefined)
    const isSuccess =
        !isError && success !== undefined
            ? success
            : touched && validation.valid && stripCardNumber(currentValue).length > 0

    const validIcon =
        showValidIcon && isSuccess ? (
            <span className="credit valid" aria-hidden="true">
                <CheckIcon />
            </span>
        ) : undefined

    return (
        <Input
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
            placeholder={placeholder}
            startIcon={showBrandIcon ? <CardBrandBadge value={currentValue} /> : undefined}
            endIcon={validIcon}
            className={cn('credit card input', className)}
        />
    )
})
