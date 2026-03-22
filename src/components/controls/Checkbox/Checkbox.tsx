import {forwardRef, useEffect, useRef} from 'react'
import type {CheckboxProps} from './Checkbox.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Checkbox.css'

// Render a styled checkbox while keeping the native input for accessibility.
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    {
        checked,
        defaultChecked,
        indeterminate = false,
        name,
        id,
        value,
        disabled = false,
        size = 'md',
        color = 'primary',
        fcolor,
        label,
        labelPosition = 'right',
        error = false,
        errorText,
        onChange,
        clickEffect = 'ripple',
        rippleColor,
        className,
        style,
    },
    ref
) {
    const internalRef = useRef<HTMLInputElement>(null)
    const inputRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef
    const {effectClassName, effectLayer, handlePointerDown, triggerEffect} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect,
        disabled,
        centered: true,
        color: rippleColor,
    })

    // Keep the browser indeterminate flag in sync with React props.
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.indeterminate = indeterminate
        }
    }, [indeterminate, inputRef])

    const hasError = error || !!errorText

    return (
        <div className={cn('checkbox', ...getAppearanceClassNames({fcolor}), className)} style={style}>
            <label className={cn('label', size, labelPosition === 'left' && 'label-left', disabled && 'disabled')}>
                <span
                    className={cn('box', color, hasError && 'error', effectClassName)}
                    onPointerDown={handlePointerDown}
                >
                    {effectLayer}
                    <input
                        ref={inputRef}
                        type="checkbox"
                        checked={checked}
                        defaultChecked={defaultChecked}
                        name={name}
                        id={id}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                        onKeyDown={(event) => {
                            if (event.key === ' ' || event.key === 'Enter') {
                                triggerEffect(event.currentTarget.parentElement as HTMLSpanElement | null)
                            }
                        }}
                        className="input"
                        aria-invalid={hasError || undefined}
                    />
                    <svg className="checkmark" viewBox="0 0 16 16" fill="none">
                        <path
                            className="check-path"
                            d="M3.5 8L6.5 11L12.5 5"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="indeterminate-mark" />
                </span>
                {label && <span className="label-text">{label}</span>}
            </label>
            {errorText && (
                <span className="error-text" role="alert">
                    {errorText}
                </span>
            )}
        </div>
    )
})
