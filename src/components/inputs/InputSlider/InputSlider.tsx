import {useState, useCallback, forwardRef} from 'react'
import type {InputSliderProps} from './InputSlider.types'
import {Slider} from '../../controls/Slider'
import {cn} from '../../../utils/cn'
import './InputSlider.css'

function clampValue(val: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, val))
}

function roundToPrecision(val: number, precision: number): number {
    const factor = Math.pow(10, precision)
    return Math.round(val * factor) / factor
}

export const InputSlider = forwardRef<HTMLDivElement, InputSliderProps>(function InputSlider(
    {
        min = 0,
        max = 100,
        step = 1,
        value,
        onChange,
        precision = 0,
        marks,
        showInput = true,
        color = 'primary',
        size = 'md',
        disabled = false,
        label,
        fullWidth = false,
        className,
        ...rest
    },
    ref
) {
    const [internalValue, setInternalValue] = useState(min)
    const currentValue = value !== undefined ? value : internalValue

    const update = useCallback(
        (newVal: number) => {
            const clamped = roundToPrecision(clampValue(newVal, min, max), precision)
            if (value === undefined) setInternalValue(clamped)
            onChange?.(clamped)
        },
        [min, max, precision, value, onChange]
    )

    const handleSliderChange = useCallback(
        (val: number) => update(val),
        [update]
    )

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value
            if (raw === '' || raw === '-') return
            const num = parseFloat(raw)
            if (!isNaN(num)) update(num)
        },
        [update]
    )

    const handleBlur = useCallback(() => {
        update(currentValue)
    }, [currentValue, update])

    return (
        <div
            ref={ref}
            className={cn('input-slider', size, fullWidth && 'full-width', disabled && 'disabled', className)}
            {...rest}
        >
            {label && <div className="input-slider-label">{label}</div>}
            <div className="input-slider-row">
                <Slider
                    min={min}
                    max={max}
                    step={step}
                    value={currentValue}
                    onChange={handleSliderChange}
                    marks={marks}
                    color={color}
                    disabled={disabled}
                />
                {showInput && (
                    <input
                        type="text"
                        inputMode="decimal"
                        className={cn('input-slider-field', color)}
                        value={currentValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                        aria-label={label || 'Slider value'}
                    />
                )}
            </div>
        </div>
    )
})
