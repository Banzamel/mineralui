import {forwardRef, useCallback, useRef, useState} from 'react'
import type * as React from 'react'
import type {InputProps} from './Input.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useControllableString} from '../../../utils/useControllableString'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import {useGhostText} from '../../../utils/useGhostText'
import {CloseIcon} from '../../../icons'
import './Input.css'

// Render the base text input used by all specialized input wrappers.
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
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
        variant = 'outlined',
        size = 'md',
        color,
        fcolor,
        fullWidth = false,
        rounded = false,
        label,
        helperText,
        errorText,
        startIcon,
        endIcon,
        clearable = false,
        error = false,
        success = false,
        maxLength,
        showCharCount = false,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
        onClear,
        ghostOptions,
        ghostMinChars = 2,
        onGhostAccept,
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

    const {isControlled, currentValue, setCurrentValue} = useControllableString(value, defaultValue)
    const ghost = useGhostText({
        options: ghostOptions ?? [],
        value: currentValue,
        minChars: ghostMinChars,
    })
    const hasError = error || !!errorText
    const hasContent = currentValue.length > 0

    // Mirror focus state so the wrapper can style the input consistently.
    const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true)
            onFocus?.(event)
        },
        [onFocus]
    )

    // Clear focus styles before delegating to the caller.
    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false)
            onBlur?.(event)
        },
        [onBlur]
    )

    // Keep uncontrolled usage working without blocking controlled integrations.
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentValue(event.target.value)
            onChange?.(event)
            ghost.reset()
        },
        [onChange, setCurrentValue, ghost.reset]
    )

    // Intercept keyboard events for ghost text acceptance before delegating.
    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (ghostOptions && ghost.hint) {
                const accepted = ghost.onKeyDown(event)
                if (accepted) {
                    const result = ghost.accept()
                    setCurrentValue(result.value)
                    onGhostAccept?.(result.value)
                    // Fire synthetic change so controlled parents stay in sync.
                    const input = (ref as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current
                    if (input) {
                        const nativeSet = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
                        nativeSet?.call(input, result.value)
                        input.dispatchEvent(new Event('input', {bubbles: true}))
                    }
                    return
                }
            }
            onKeyDown?.(event)
        },
        [ghostOptions, ghost, setCurrentValue, onGhostAccept, onKeyDown, ref]
    )

    // Reset the visible value while preserving focus for quick repeated input.
    const handleClear = useCallback(() => {
        setCurrentValue('')

        const input = (ref as React.RefObject<HTMLInputElement>)?.current ?? inputRef.current
        if (input && isControlled) {
            input.value = ''
        }

        onClear?.()
        input?.focus()
    }, [isControlled, onClear, ref, setCurrentValue])

    const containerClasses = cn(
        'container',
        variant,
        size,
        focused && 'focused',
        hasError && 'input-error',
        success && !hasError && 'input-success',
        color === 'neutral' && 'color-neutral',
        color === 'success' && 'color-success',
        color === 'error' && 'color-error',
        color === 'warning' && 'color-warning',
        color === 'info' && 'color-info',
        disabled && 'disabled',
        rounded && 'rounded',
        effectClassName
    )

    return (
        <div
            className={cn('input', ...getAppearanceClassNames({fcolor}), fullWidth && 'full-width', className)}
            style={style}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn(
                        'label',
                        focused && 'focused',
                        hasError && 'error',
                        success && !hasError && 'success',
                        required && 'required',
                        labelClassName
                    )}
                >
                    {label}
                </label>
            )}

            <div className={containerClasses} onPointerDown={handlePointerDown}>
                {effectLayer}
                {startIcon && <span className="start-icon">{startIcon}</span>}

                {ghostOptions ? (
                    <div className="ghost-text-field">
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
                            autoComplete={autoComplete ?? 'off'}
                            inputMode={inputMode}
                            maxLength={maxLength}
                            className={cn('field', inputClassName)}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            aria-invalid={hasError || undefined}
                            aria-describedby={errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                        />
                        {focused && ghost.hint && (
                            <span className="ghost-text-overlay" aria-hidden="true">
                                <span className="ghost-text-typed">{currentValue}</span>
                                <span className="ghost-text-hint">{ghost.hint}</span>
                            </span>
                        )}
                    </div>
                ) : (
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
                )}

                {loading && <span className="spinner" />}

                {clearable && hasContent && !loading && !disabled && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label="Clear input"
                    >
                        <CloseIcon />
                    </button>
                )}

                {endIcon && !loading && <span className="end-icon">{endIcon}</span>}
            </div>

            {(errorText || helperText || showCharCount) && (
                <div className="bottom-row">
                    <span>
                        {errorText && (
                            <span id={id ? `${id}-error` : undefined} className="error-text" role="alert">
                                {errorText}
                            </span>
                        )}
                        {!errorText && helperText && (
                            <span id={id ? `${id}-helper` : undefined} className="helper-text">
                                {helperText}
                            </span>
                        )}
                    </span>
                    {showCharCount && maxLength && (
                        <span className={cn('char-count', currentValue.length > maxLength && 'over')}>
                            {currentValue.length}/{maxLength}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
})
