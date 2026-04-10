import {forwardRef, useEffect, useRef} from 'react'
import type * as React from 'react'
import type {MCheckboxProps} from './MCheckbox.types'
import {cn} from '../../../utils/cn'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './MCheckbox.css'

// Render a styled checkbox while keeping the native input for accessibility.
export const MCheckbox = forwardRef<HTMLInputElement, MCheckboxProps>(function MCheckbox(
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
        <div className={cn('checkbox', className)} style={style}>
            <label className={cn('label', size, labelPosition === 'left' && 'label-left', disabled && 'disabled')}>
                <span
                    className={cn('box', `color-${color}`, hasError && 'error', effectClassName)}
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
                    <span className="indeterminate-mark" />
                </span>
                {label && <span className={cn('label-text', hasError && 'error')}>{label}</span>}
            </label>
            {errorText && (
                <span className="field-error" role="alert">
                    {errorText}
                </span>
            )}
        </div>
    )
})
