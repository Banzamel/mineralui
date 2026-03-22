import {useState, useRef, useCallback, useMemo, useEffect} from 'react'
import type {TimePickerProps} from './TimePicker.types'
import {Popover} from '../../primitives/Popover'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {formatTime, parseTime} from '../../../utils/dateUtils'
import './TimePicker.css'

// Compare time tuples so min/max checks can stay string-format agnostic.
function compareTimeParts(
    left: {hours: number; minutes: number; seconds: number},
    right: {hours: number; minutes: number; seconds: number}
): number {
    if (left.hours !== right.hours) return left.hours - right.hours
    if (left.minutes !== right.minutes) return left.minutes - right.minutes
    return left.seconds - right.seconds
}

// Check whether a time falls within optional min and max boundaries.
function isTimeInRange(
    value: {hours: number; minutes: number; seconds: number},
    min?: {hours: number; minutes: number; seconds: number} | null,
    max?: {hours: number; minutes: number; seconds: number} | null
): boolean {
    if (min && compareTimeParts(value, min) < 0) return false
    if (max && compareTimeParts(value, max) > 0) return false
    return true
}

const ClearIcon = () => (
    <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M4 4L12 12M12 4L4 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
)

// Render a time input backed by scrollable hour, minute and second columns.
export function TimePicker({
    value,
    defaultValue,
    onChange,
    format = '24h',
    showSeconds = false,
    minuteStep = 1,
    min,
    max,
    placeholder,
    disabled = false,
    readOnly = false,
    name,
    id,
    variant = 'outlined',
    size = 'md',
    fcolor,
    label,
    helperText,
    errorText,
    error = false,
    required = false,
    clearable = false,
    fullWidth = false,
    className,
    style,
}: TimePickerProps) {
    const [open, setOpen] = useState(false)
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const triggerRef = useRef<HTMLDivElement>(null)

    const currentValue = value !== undefined ? value : internalValue
    const hasError = error || !!errorText
    const parsed = parseTime(currentValue)
    const minTime = parseTime(min ?? '')
    const maxTime = parseTime(max ?? '')

    // Build the visible hour list based on the selected time format.
    const hours = useMemo(() => {
        const items: number[] = []
        const maxHour = format === '12h' ? 12 : 23
        const startHour = format === '12h' ? 1 : 0
        for (let index = startHour; index <= maxHour; index++) {
            items.push(index)
        }
        return items
    }, [format])

    // Build the minute list using the configured step size.
    const minutes = useMemo(() => {
        const items: number[] = []
        for (let index = 0; index < 60; index += minuteStep) {
            items.push(index)
        }
        return items
    }, [minuteStep])

    // Build the seconds list only when the picker exposes seconds.
    const seconds = useMemo(() => {
        if (!showSeconds) return []
        const items: number[] = []
        for (let index = 0; index < 60; index++) {
            items.push(index)
        }
        return items
    }, [showSeconds])

    // Reuse range validation for list rendering and direct text input.
    const isSelectable = useCallback(
        (hoursValue: number, minutesValue: number, secondsValue: number = 0) => {
            return isTimeInRange({hours: hoursValue, minutes: minutesValue, seconds: secondsValue}, minTime, maxTime)
        },
        [maxTime, minTime]
    )

    // Apply the selected time and keep uncontrolled usage in sync.
    const handleSelect = useCallback(
        (hoursValue: number, minutesValue: number, secondsValue: number = 0) => {
            if (!isSelectable(hoursValue, minutesValue, secondsValue)) return
            const time = formatTime(hoursValue, minutesValue, secondsValue, showSeconds)
            if (value === undefined) setInternalValue(time)
            onChange?.(time)
        },
        [isSelectable, onChange, showSeconds, value]
    )

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const raw = event.target.value
            if (value === undefined) setInternalValue(raw)
        },
        [value]
    )

    // Normalize manual input once the user leaves the field.
    const handleInputBlur = useCallback(() => {
        const nextValue = parseTime(currentValue)
        if (nextValue && isTimeInRange(nextValue, minTime, maxTime)) {
            const time = formatTime(nextValue.hours, nextValue.minutes, nextValue.seconds, showSeconds)
            if (value === undefined) setInternalValue(time)
            onChange?.(time)
        }
    }, [currentValue, maxTime, minTime, onChange, showSeconds, value])

    // Clear the current time without closing the trigger first.
    const handleClear = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation()
            if (value === undefined) setInternalValue('')
            onChange?.('')
        },
        [onChange, value]
    )

    const clockIcon = (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="7" />
            <line x1="8" y1="4" x2="8" y2="8" />
            <line x1="8" y1="8" x2="11" y2="10" />
        </svg>
    )

    return (
        <div
            className={cn('time-picker', ...getAppearanceClassNames({fcolor}), fullWidth && 'full-width', className)}
            style={style}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn('label', open && 'focused', hasError && 'error', required && 'required')}
                >
                    {label}
                </label>
            )}

            <div
                ref={triggerRef}
                className={cn('trigger', variant, size, open && 'focused', hasError && 'error', disabled && 'disabled')}
                onClick={() => !disabled && !readOnly && setOpen(true)}
            >
                <span className="icon">{clockIcon}</span>
                <input
                    type="text"
                    className="input"
                    value={currentValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder={placeholder ?? (showSeconds ? 'HH:MM:SS' : 'HH:MM')}
                    disabled={disabled}
                    readOnly={readOnly}
                    id={id}
                    aria-invalid={hasError || undefined}
                />
                {clearable && currentValue && !disabled && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label="Clear time"
                    >
                        <ClearIcon />
                    </button>
                )}
            </div>

            {name && <input type="hidden" name={name} value={currentValue} />}

            <Popover className="time-picker-popover" open={open} anchorRef={triggerRef} onClose={() => setOpen(false)} placement="bottom-start">
                <div className="columns">
                    <TimeColumn
                        items={hours}
                        selected={parsed?.hours}
                        onSelect={(hoursValue) => handleSelect(hoursValue, parsed?.minutes ?? 0, parsed?.seconds ?? 0)}
                        isDisabled={(hoursValue) =>
                            !isSelectable(hoursValue, parsed?.minutes ?? 0, parsed?.seconds ?? 0)
                        }
                        label="Hr"
                    />
                    <TimeColumn
                        items={minutes}
                        selected={parsed?.minutes}
                        onSelect={(minutesValue) =>
                            handleSelect(parsed?.hours ?? 0, minutesValue, parsed?.seconds ?? 0)
                        }
                        isDisabled={(minutesValue) =>
                            !isSelectable(parsed?.hours ?? 0, minutesValue, parsed?.seconds ?? 0)
                        }
                        label="Min"
                    />
                    {showSeconds && (
                        <TimeColumn
                            items={seconds}
                            selected={parsed?.seconds}
                            onSelect={(secondsValue) =>
                                handleSelect(parsed?.hours ?? 0, parsed?.minutes ?? 0, secondsValue)
                            }
                            isDisabled={(secondsValue) =>
                                !isSelectable(parsed?.hours ?? 0, parsed?.minutes ?? 0, secondsValue)
                            }
                            label="Sec"
                        />
                    )}
                </div>
            </Popover>

            {(errorText || helperText) && (
                <div className="bottom-row">
                    {errorText ? (
                        <span className="error-text" role="alert">
                            {errorText}
                        </span>
                    ) : (
                        <span className="helper-text">{helperText}</span>
                    )}
                </div>
            )}
        </div>
    )
}

// Render one scrollable time column and keep the selected value centered.
function TimeColumn({
    items,
    selected,
    onSelect,
    isDisabled,
    label,
}: {
    items: number[]
    selected?: number
    onSelect: (value: number) => void
    isDisabled?: (value: number) => boolean
    label: string
}) {
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (selected === undefined || !listRef.current) return
        const element = listRef.current.querySelector(`[data-value="${selected}"]`) as HTMLElement | null
        if (element) {
            const list = listRef.current
            list.scrollTop = element.offsetTop - list.clientHeight / 2 + element.offsetHeight / 2
        }
    }, [selected])

    const pad = (value: number) => value.toString().padStart(2, '0')

    return (
        <div className="column">
            <div className="column-label">{label}</div>
            <div ref={listRef} className="column-list">
                {items.map((item) => {
                    const disabled = isDisabled?.(item) ?? false
                    return (
                        <button
                            key={item}
                            type="button"
                            data-value={item}
                            className={cn('column-item', item === selected && 'selected', disabled && 'disabled')}
                            onClick={() => onSelect(item)}
                            disabled={disabled}
                        >
                            {pad(item)}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
