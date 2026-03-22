import {useState, useRef, useCallback, forwardRef, isValidElement} from 'react'
import type {InputGroupProps, InputGroupAddon, InputGroupSlot} from './InputGroup.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useControllableString} from '../../../utils/useControllableString'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './InputGroup.css'

// Detect structured addon configs while leaving raw React nodes untouched.
function isAddonObject(slot: InputGroupSlot): slot is InputGroupAddon {
    return typeof slot === 'object' && slot !== null && !isValidElement(slot) && 'type' in slot
}

// Render one prepend or append slot based on its declared addon type.
function renderSlot(slot: InputGroupSlot, position: 'prepend' | 'append', index: number) {
    if (!isAddonObject(slot)) {
        // Raw ReactNode — render as-is inside addon container
        return (
            <div key={`${position}-${index}`} className={cn('addon', 'custom', position)}>
                {slot}
            </div>
        )
    }

    const addon = slot

    if (addon.type === 'button') {
        return (
            <button
                key={`${position}-${index}`}
                type="button"
                className={cn('addon', position, 'button')}
                onClick={addon.onClick}
            >
                {addon.content}
            </button>
        )
    }

    if (addon.type === 'checkbox') {
        return (
            <label key={`${position}-${index}`} className={cn('addon', position, 'checkbox')}>
                <input
                    type="checkbox"
                    checked={addon.checked}
                    onChange={(e) => addon.onCheckedChange?.(e.target.checked)}
                />
            </label>
        )
    }

    // text or icon
    return (
        <span key={`${position}-${index}`} className={cn('addon', position)}>
            {addon.content}
        </span>
    )
}

// Normalize the public slot API to a flat array for predictable rendering.
function normalizeSlots(slots?: InputGroupSlot | InputGroupSlot[]): InputGroupSlot[] {
    if (slots === undefined || slots === null) return []
    if (Array.isArray(slots)) return slots
    return [slots]
}

// Render a grouped input with prepend and append content around a shared field.
export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(function InputGroup(
    {
        prepend,
        append,
        type = 'text',
        value,
        defaultValue,
        name,
        id,
        placeholder,
        disabled = false,
        readOnly = false,
        required = false,
        autoFocus = false,
        autoComplete,
        inputMode,
        size = 'md',
        fcolor,
        fullWidth = false,
        label,
        helperText,
        errorText,
        color = 'primary',
        error = false,
        maxLength,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        loading = false,
        clickEffect = 'ripple',
        rippleColor,
        className,
        style,
        inputClassName,
        labelClassName,
    },
    ref
) {
    const [focused, setFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const {effectClassName, effectLayer, handlePointerDown} = useInteractionEffect<HTMLDivElement>({
        effect: clickEffect,
        disabled: disabled || readOnly,
        color: rippleColor,
    })

    const hasError = error || !!errorText
    const {currentValue, setCurrentValue} = useControllableString(value, defaultValue)

    // Mirror focus state so the wrapper can style the group consistently.
    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true)
            onFocus?.(e)
        },
        [onFocus]
    )

    // Clear wrapper focus styling before delegating blur handling.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false)
            onBlur?.(e)
        },
        [onBlur]
    )

    // Keep uncontrolled usage working without blocking controlled integrations.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(e.target.value)
            onChange?.(e)
        },
        [onChange, setCurrentValue]
    )

    const prependSlots = normalizeSlots(prepend)
    const appendSlots = normalizeSlots(append)

    return (
        <div
            className={cn(
                'input-group',
                color,
                ...getAppearanceClassNames({fcolor}),
                fullWidth && 'full-width',
                className
            )}
            style={style}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn(
                        'label',
                        focused && 'focused',
                        hasError && 'error',
                        required && 'required',
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}

            <div
                className={cn(
                    'container',
                    size,
                    focused && 'focused',
                    hasError && 'has-error',
                    disabled && 'disabled',
                    effectClassName
                )}
                onPointerDown={handlePointerDown}
            >
                {effectLayer}
                {prependSlots.map((slot, i) => renderSlot(slot, 'prepend', i))}

                <input
                    ref={ref ?? inputRef}
                    type={type}
                    value={currentValue}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={required}
                    autoFocus={autoFocus}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    maxLength={maxLength}
                    className={cn('field', inputClassName)}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={onKeyDown}
                    aria-invalid={hasError || undefined}
                    aria-describedby={errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                />

                {loading && (
                    <span className={'spinner-addon'}>
                        <span className={'spinner'} />
                    </span>
                )}

                {appendSlots.map((slot, i) => renderSlot(slot, 'append', i))}
            </div>

            {(errorText || helperText) && (
                <div className={'bottom'}>
                    {errorText && (
                        <span id={id ? `${id}-error` : undefined} className={'error-text'} role="alert">
                            {errorText}
                        </span>
                    )}
                    {!errorText && helperText && (
                        <span id={id ? `${id}-helper` : undefined} className={'helper'}>
                            {helperText}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
})
