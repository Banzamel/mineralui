import {forwardRef, useCallback} from 'react'
import type * as React from 'react'
import type {RadioProps} from './Radio.types'
import {useRadioGroup} from './RadioContext'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {useInteractionEffect} from '../../../utils/useInteractionEffect'
import './Radio.css'

// Render a single radio that can work standalone or inside RadioGroup.
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
    {
        checked,
        defaultChecked,
        name,
        id,
        value,
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
    const group = useRadioGroup()

    const resolvedName = group?.name ?? name
    const resolvedDisabled = group?.disabled ?? disabled
    const resolvedSize = group?.size ?? size
    const resolvedColor = group?.color ?? color
    const resolvedFontColor = group?.fcolor ?? fcolor
    const resolvedChecked = group ? group.value === value : checked
    const {effectClassName, effectLayer, handlePointerDown, triggerEffect} = useInteractionEffect<HTMLSpanElement>({
        effect: clickEffect,
        disabled: resolvedDisabled,
        centered: true,
        color: rippleColor,
    })

    // Delegate selection back to the group when one is present.
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(event)
            if (group?.onChange && value) {
                group.onChange(value)
            }
        },
        [onChange, group, value]
    )

    return (
        <label
            className={cn(
                'radio',
                resolvedSize,
                ...getAppearanceClassNames({fcolor: resolvedFontColor}),
                labelPosition === 'left' && 'label-left',
                resolvedDisabled && 'disabled',
                className
            )}
            style={style}
        >
            <span className={cn('circle', resolvedColor, effectClassName)} onPointerDown={handlePointerDown}>
                {effectLayer}
                <input
                    ref={ref}
                    type="radio"
                    name={resolvedName}
                    id={id}
                    value={value}
                    checked={resolvedChecked}
                    defaultChecked={!group ? defaultChecked : undefined}
                    disabled={resolvedDisabled}
                    onChange={handleChange}
                    onKeyDown={(event) => {
                        if (event.key === ' ' || event.key === 'Enter') {
                            triggerEffect(event.currentTarget.parentElement as HTMLSpanElement | null)
                        }
                    }}
                    className="input"
                />
            </span>
            {label && <span className="label-text">{label}</span>}
        </label>
    )
})
