import {useState, useCallback, useMemo} from 'react'
import type {RadioGroupProps} from './Radio.types'
import {RadioContext} from './RadioContext'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import './Radio.css'

// Coordinate multiple radio items through shared context and optional controlled state.
export function RadioGroup({
    name,
    value,
    defaultValue,
    onChange,
    direction = 'vertical',
    children,
    disabled = false,
    size = 'md',
    color = 'primary',
    fcolor,
    error = false,
    errorText,
    label,
    className,
    style,
}: RadioGroupProps) {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const currentValue = value !== undefined ? value : internalValue

    // Mirror controlled and uncontrolled usage with the same group API.
    const handleChange = useCallback(
        (val: string) => {
            if (value === undefined) {
                setInternalValue(val)
            }
            onChange?.(val)
        },
        [onChange, value]
    )

    // Memoize context so nested radios only update when relevant inputs change.
    const ctx = useMemo(
        () => ({name, value: currentValue, disabled, size, color, fcolor, onChange: handleChange}),
        [name, currentValue, disabled, size, color, fcolor, handleChange]
    )

    return (
        <RadioContext.Provider value={ctx}>
            <fieldset
                className={cn('radio-group', direction, ...getAppearanceClassNames({fcolor}), className)}
                style={style}
                role="radiogroup"
            >
                {label && <legend className={cn('label', error && 'error')}>{label}</legend>}
                {children}
                {errorText && (
                    <span className="error-text" role="alert">
                        {errorText}
                    </span>
                )}
            </fieldset>
        </RadioContext.Provider>
    )
}
