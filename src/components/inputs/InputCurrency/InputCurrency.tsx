import {useState, useCallback, forwardRef} from 'react'
import type * as React from 'react'
import type {InputCurrencyProps} from './InputCurrency.types'
import {Input} from '../Input'
import {cn} from '../../../utils/cn'
import {formatCurrency, parseCurrencyToNumber} from '../../../utils/formatters'
import './InputCurrency.css'

// Extend the base input with currency formatting and numeric callbacks.
export const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>(function InputCurrency(
    {
        currency,
        currencySymbol,
        currencyPosition = 'end',
        decimalSeparator = ',',
        thousandSeparator = ' ',
        precision = 2,
        min,
        max,
        allowNegative = false,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onBlur,
        placeholder = '0,00',
        startIcon,
        endIcon,
        className,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const currentValue = value !== undefined ? value.toString() : internalValue

    const symbol = currencySymbol ?? currency ?? ''

    // Filter user input down to one decimal separator and an optional minus sign.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            let filtered = ''
            let hasDecimal = false
            for (const ch of raw) {
                if (ch >= '0' && ch <= '9') {
                    filtered += ch
                } else if ((ch === ',' || ch === '.') && !hasDecimal) {
                    filtered += decimalSeparator
                    hasDecimal = true
                } else if (ch === '-' && allowNegative && filtered.length === 0) {
                    filtered += '-'
                }
            }

            const formatted = formatCurrency(filtered, {decimalSeparator, thousandSeparator, precision})

            if (value === undefined) {
                setInternalValue(formatted)
            }

            const num = parseCurrencyToNumber(formatted, thousandSeparator, decimalSeparator)
            onValueChange?.(num)
            onChange?.(e)
        },
        [onChange, value, decimalSeparator, thousandSeparator, precision, allowNegative, onValueChange]
    )

    // Clamp the numeric value on blur and snap it to the configured precision.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            let num = parseCurrencyToNumber(currentValue, thousandSeparator, decimalSeparator)
            if (num !== null) {
                if (min !== undefined && num < min) num = min
                if (max !== undefined && num > max) num = max
                const fixed = num.toFixed(precision).replace('.', decimalSeparator)
                const formatted = formatCurrency(fixed, {decimalSeparator, thousandSeparator, precision})
                if (value === undefined) {
                    setInternalValue(formatted)
                }
                onValueChange?.(num)
            }
            onBlur?.(e)
        },
        [currentValue, min, max, precision, decimalSeparator, thousandSeparator, value, onValueChange, onBlur]
    )

    const symbolEl = symbol ? <span className="currency symbol">{symbol}</span> : undefined

    return (
        <Input
            {...rest}
            ref={ref}
            type="text"
            inputMode="decimal"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            startIcon={currencyPosition === 'start' ? symbolEl : startIcon}
            endIcon={currencyPosition === 'end' ? symbolEl : endIcon}
            className={cn('currency input', className)}
        />
    )
})
