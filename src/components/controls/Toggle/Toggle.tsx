import {forwardRef} from 'react'
import type {ToggleProps} from './Toggle.types'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Toggle.css'

// Render a switch-style boolean control with the same API shape as Checkbox.
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
    {
        checked,
        defaultChecked,
        name,
        id,
        disabled = false,
        size = 'md',
        color = 'primary',
        fcolor,
        label,
        labelPosition = 'right',
        onChange,
        clickEffect = 'ripple',
        rippleColor,
        className,
        style,
    },
    ref
) {
    const {effectClassName, effectLayer, handlePointerDown, triggerEffect} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect,
        disabled,
        centered: true,
        color: rippleColor,
    })

    return (
        <label
            className={cn(
                'toggle',
                size,
                ...getAppearanceClassNames({fcolor}),
                labelPosition === 'left' && 'label-left',
                disabled && 'disabled',
                className
            )}
            style={style}
        >
            <span className={cn('track', color, effectClassName)} onPointerDown={handlePointerDown}>
                {effectLayer}
                <input
                    ref={ref}
                    type="checkbox"
                    checked={checked}
                    defaultChecked={defaultChecked}
                    name={name}
                    id={id}
                    disabled={disabled}
                    onChange={onChange}
                    onKeyDown={(event) => {
                        if (event.key === ' ' || event.key === 'Enter') {
                            triggerEffect(event.currentTarget.parentElement as HTMLSpanElement | null)
                        }
                    }}
                    className="input"
                    role="switch"
                    aria-checked={checked}
                />
                <span className="knob" />
            </span>
            {label && <span className="label-text">{label}</span>}
        </label>
    )
})
