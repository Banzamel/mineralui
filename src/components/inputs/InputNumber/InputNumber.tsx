import {useState, useCallback, useRef, useEffect, forwardRef} from 'react'
import type {InputNumberProps} from './InputNumber.types'
import {Input} from '../Input'
import {cn} from '../../../utils/cn'
import './InputNumber.css'

// Keep numeric values inside optional min and max bounds.
function clampValue(val: number, min?: number, max?: number): number {
    if (min !== undefined && val < min) return min
    if (max !== undefined && val > max) return max
    return val
}

// Prevent floating-point drift when step values use decimal precision.
function roundToPrecision(val: number, precision: number): number {
    const factor = Math.pow(10, precision)
    return Math.round(val * factor) / factor
}

// Extend the base input with stepping, clamping and keyboard increment support.
export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
    {
        min,
        max,
        step = 1,
        showStepper = true,
        precision = 0,
        allowNegative = true,
        onValueChange,
        value,
        defaultValue,
        onChange,
        onKeyDown,
        onBlur,
        disabled = false,
        className,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? '')
    const currentValue = value !== undefined ? value.toString() : internalValue
    const intervalRef = useRef<ReturnType<typeof setInterval>>(null)

    // Keep the displayed string and numeric callback in sync.
    const updateValue = useCallback(
        (newVal: string) => {
            if (value === undefined) {
                setInternalValue(newVal)
            }
            const num = parseFloat(newVal)
            onValueChange?.(isNaN(num) ? null : num)
        },
        [value, onValueChange]
    )

    // Move the current value by one step in the requested direction.
    const increment = useCallback(
        (direction: 1 | -1) => {
            const current = parseFloat(currentValue) || 0
            const newVal = roundToPrecision(clampValue(current + step * direction, min, max), precision)
            updateValue(newVal.toString())
        },
        [currentValue, step, min, max, precision, updateValue]
    )

    // Repeat stepping while the pointer is held on a stepper button.
    const startHold = useCallback(
        (direction: 1 | -1) => {
            increment(direction)
            intervalRef.current = setInterval(() => increment(direction), 150)
        },
        [increment]
    )

    // Clear the hold timer when the pointer is released.
    const stopHold = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }, [])

    useEffect(() => stopHold, [stopHold])

    // Filter user input down to numeric characters before storing it.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            const filtered = raw.replace(allowNegative ? /[^\d.,-]/g : /[^\d.,]/g, '')
            updateValue(filtered)
            onChange?.(e)
        },
        [onChange, allowNegative, updateValue]
    )

    // Snap the entered value back into range when the field loses focus.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            const num = parseFloat(currentValue)
            if (!isNaN(num)) {
                const clamped = roundToPrecision(clampValue(num, min, max), precision)
                updateValue(clamped.toString())
            }
            onBlur?.(e)
        },
        [currentValue, min, max, precision, updateValue, onBlur]
    )

    // Support ArrowUp and ArrowDown as a keyboard stepper.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault()
                increment(1)
            } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                increment(-1)
            }
            onKeyDown?.(e)
        },
        [increment, onKeyDown]
    )

    const stepper =
        showStepper && !disabled ? (
            <div className="stepper">
                <button
                    type="button"
                    className="step-btn"
                    onMouseDown={() => startHold(1)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    tabIndex={-1}
                    aria-label="Increment"
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                            d="M4 10L8 6L12 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    type="button"
                    className="step-btn"
                    onMouseDown={() => startHold(-1)}
                    onMouseUp={stopHold}
                    onMouseLeave={stopHold}
                    tabIndex={-1}
                    aria-label="Decrement"
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                            d="M4 6L8 10L12 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        ) : undefined

    return (
        <Input
            {...rest}
            ref={ref}
            type="text"
            inputMode="decimal"
            value={currentValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            endIcon={stepper}
            disabled={disabled}
            className={cn('input-number', className)}
        />
    )
})
