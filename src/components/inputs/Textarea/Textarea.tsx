import {useState, useRef, useCallback, useEffect, forwardRef} from 'react'
import type {TextareaProps} from './Textarea.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useControllableString} from '../../../utils/useControllableString'
import {useGhostText} from '../../../utils/useGhostText'
import './Textarea.css'

// Render the multiline text input with optional auto-resize behavior.
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    {
        value,
        defaultValue,
        name,
        id,
        placeholder,
        disabled = false,
        readOnly = false,
        required = false,
        autoFocus = false,
        rows = 3,
        autoResize = false,
        minRows,
        maxRows,
        variant = 'outlined',
        size = 'md',
        color,
        fcolor,
        fullWidth = false,
        label,
        helperText,
        errorText,
        error = false,
        success = false,
        maxLength,
        showCharCount = false,
        ghostOptions,
        ghostMinChars = 2,
        onGhostAccept,
        loading = false,
        onChange,
        onFocus,
        onBlur,
        className,
        style,
        textareaClassName,
        labelClassName,
    },
    ref
) {
    const [focused, setFocused] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const {currentValue, setCurrentValue} = useControllableString(value, defaultValue)
    const ghost = useGhostText({
        options: ghostOptions ?? [],
        value: currentValue,
        minChars: ghostMinChars,
    })
    const hasError = error || !!errorText
    const resolvedRef = ref ?? textareaRef

    // Resize the textarea to fit content while respecting min and max row limits.
    const adjustHeight = useCallback(() => {
        const el = typeof resolvedRef === 'function' ? null : resolvedRef?.current
        if (!el || !autoResize) return

        el.style.height = 'auto'
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20
        const minH = minRows ? minRows * lineHeight : 0
        const maxH = maxRows ? maxRows * lineHeight : Infinity
        const newHeight = Math.min(Math.max(el.scrollHeight, minH), maxH)
        el.style.height = `${newHeight}px`
        el.style.overflowY = el.scrollHeight > newHeight ? 'auto' : 'hidden'
    }, [autoResize, minRows, maxRows, resolvedRef])

    useEffect(() => {
        adjustHeight()
    }, [currentValue, adjustHeight])

    // Mirror focus state so wrapper styling stays consistent with Input.
    const handleFocus = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(true)
            onFocus?.(e)
        },
        [onFocus]
    )

    // Clear focus styling before delegating blur handling.
    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            setFocused(false)
            onBlur?.(e)
        },
        [onBlur]
    )

    // Keep uncontrolled usage working without blocking controlled integrations.
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCurrentValue(e.target.value)
            onChange?.(e)
            ghost.reset()
        },
        [onChange, setCurrentValue, ghost.reset]
    )

    // Intercept keyboard events for ghost text acceptance.
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (ghostOptions && ghost.hint) {
                const accepted = ghost.onKeyDown(e)
                if (accepted) {
                    const result = ghost.accept()
                    setCurrentValue(result.value)
                    onGhostAccept?.(result.value)
                    const el = typeof resolvedRef === 'function' ? null : resolvedRef?.current
                    if (el) {
                        const nativeSet = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set
                        nativeSet?.call(el, result.value)
                        el.dispatchEvent(new Event('input', {bubbles: true}))
                    }
                    return
                }
            }
        },
        [ghostOptions, ghost, setCurrentValue, onGhostAccept, resolvedRef]
    )

    const containerClasses = cn(
        'container',
        variant,
        size,
        focused && 'focused',
        hasError && 'error',
        success && !hasError && 'success',
        color === 'neutral' && 'color-neutral',
        color === 'success' && 'color-success',
        color === 'error' && 'color-error',
        color === 'warning' && 'color-warning',
        color === 'info' && 'color-info',
        disabled && 'disabled'
    )

    return (
        <div
            className={cn('textarea', ...getAppearanceClassNames({fcolor}), fullWidth && 'full-width', className)}
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

            <div className={containerClasses}>
                {ghostOptions ? (
                    <div className="ghost-text-field ghost-text-field-multi">
                        <textarea
                            ref={resolvedRef as React.Ref<HTMLTextAreaElement>}
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            disabled={disabled}
                            readOnly={readOnly}
                            required={required}
                            autoFocus={autoFocus}
                            rows={autoResize ? (minRows ?? rows) : rows}
                            maxLength={maxLength}
                            value={currentValue}
                            className={cn('field', textareaClassName)}
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
                    <textarea
                        ref={resolvedRef as React.Ref<HTMLTextAreaElement>}
                        name={name}
                        id={id}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        autoFocus={autoFocus}
                        rows={autoResize ? (minRows ?? rows) : rows}
                        maxLength={maxLength}
                        value={currentValue}
                        className={cn('field', textareaClassName)}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        aria-invalid={hasError || undefined}
                        aria-describedby={errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined}
                    />
                )}
                {loading && <span className="spinner" />}
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
