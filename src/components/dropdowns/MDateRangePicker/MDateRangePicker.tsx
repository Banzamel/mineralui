import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import type * as React from 'react'
import {MPopover} from '../../primitives'
import {cn} from '../../../utils/cn'
import {useMDateRangePickerTexts} from '../../../i18n/frameworkTexts'
import {useDocumentLocale} from '../../../utils/locale'
import {MCalendarIcon, MChevronLeftIcon, MChevronRightIcon, MCloseIcon} from '../../../icons'
import {
    addMonths,
    daysInMonth,
    firstDayOfMonth,
    formatDate,
    getDayNames,
    getMonthNames,
    isDateInRange,
    isSameDay,
    stripTime,
} from '../../../utils/dateUtils'
import type {MDateRangePickerProps, MDateRangePreset} from './MDateRangePicker.types'
import {colorRgbVar} from '../../../utils/colorRgbVar'
import './MDateRangePicker.css'

function toDate(value: Date | string | null | undefined): Date | null {
    if (!value) return null
    if (value instanceof Date) return stripTime(value)
    const date = new Date(value)
    return isNaN(date.getTime()) ? null : stripTime(date)
}

function sortRange(start: Date, end: Date) {
    return start.getTime() <= end.getTime() ? {start, end} : {start: end, end: start}
}

function isBetween(date: Date, start: Date | null, end: Date | null) {
    if (!start || !end) return false
    const time = date.getTime()
    return time > start.getTime() && time < end.getTime()
}

function formatRangeLabel(start: Date | null, end: Date | null, format: string) {
    if (start && end) {
        return `${formatDate(start, format)} - ${formatDate(end, format)}`
    }

    if (start) {
        return `${formatDate(start, format)} - ...`
    }

    return ''
}

function startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

function endOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

function daysAgo(days: number): Date {
    const date = stripTime(new Date())
    date.setDate(date.getDate() - (days - 1))
    return date
}

function monthsAgo(months: number): Date {
    const today = stripTime(new Date())
    return new Date(today.getFullYear(), today.getMonth() - months, today.getDate())
}

function getDefaultPresets(texts: ReturnType<typeof useMDateRangePickerTexts>): MDateRangePreset[] {
    const today = stripTime(new Date())
    const previousMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, 1)

    return [
        {label: texts.presets.today, value: {start: today, end: today}},
        {label: texts.presets.days2, value: {start: daysAgo(2), end: today}},
        {label: texts.presets.days3, value: {start: daysAgo(3), end: today}},
        {label: texts.presets.days7, value: {start: daysAgo(7), end: today}},
        {label: texts.presets.days14, value: {start: daysAgo(14), end: today}},
        {label: texts.presets.days31, value: {start: daysAgo(31), end: today}},
        {label: texts.presets.thisMonth, value: {start: startOfMonth(today), end: endOfMonth(today)}},
        {
            label: texts.presets.previousMonth,
            value: {start: startOfMonth(previousMonthDate), end: endOfMonth(previousMonthDate)},
        },
        {label: texts.presets.months2, value: {start: monthsAgo(2), end: today}},
        {label: texts.presets.months3, value: {start: monthsAgo(3), end: today}},
        {label: texts.presets.months6, value: {start: monthsAgo(6), end: today}},
        {label: texts.presets.year1, value: {start: monthsAgo(12), end: today}},
    ]
}

function buildCalendarDays(viewDate: Date, firstDayOfWeek: 0 | 1) {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const totalDays = daysInMonth(year, month)
    let startDay = firstDayOfMonth(year, month)

    if (firstDayOfWeek === 1) {
        startDay = startDay === 0 ? 6 : startDay - 1
    }

    const days = [] as Array<{date: Date; currentMonth: boolean}>

    const previousMonth = month === 0 ? 11 : month - 1
    const previousYear = month === 0 ? year - 1 : year
    const previousMonthDays = daysInMonth(previousYear, previousMonth)

    for (let index = startDay - 1; index >= 0; index -= 1) {
        days.push({date: new Date(previousYear, previousMonth, previousMonthDays - index), currentMonth: false})
    }

    for (let day = 1; day <= totalDays; day += 1) {
        days.push({date: new Date(year, month, day), currentMonth: true})
    }

    const remaining = 42 - days.length
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year

    for (let day = 1; day <= remaining; day += 1) {
        days.push({date: new Date(nextYear, nextMonth, day), currentMonth: false})
    }

    return days
}

// Render a single control for start and end date selection inside one calendar popover.
export function MDateRangePicker({
    value,
    defaultValue,
    onChange,
    format = 'dd.MM.yyyy',
    locale: localeOverride,
    min,
    max,
    disabledDates,
    placeholder,
    disabled = false,
    readOnly = false,
    name,
    id,
    variant = 'outlined',
    size = 'md',
    color,
    label,
    helperText,
    errorText,
    error = false,
    required = false,
    clearable = false,
    inline = false,
    showTodayButton = true,
    presets = false,
    presetsSidebar = false,
    firstDayOfWeek = 1,
    fullWidth = false,
    allowSameDay = true,
    className,
    style,
}: MDateRangePickerProps) {
    const locale = useDocumentLocale(localeOverride)
    const controlledRange = value
        ? {
              start: toDate(value.start),
              end: toDate(value.end),
          }
        : null
    const [internalRange, setInternalRange] = useState(() => ({
        start: toDate(defaultValue?.start),
        end: toDate(defaultValue?.end),
    }))
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)

    const selectedRange = controlledRange ?? internalRange
    const startDate = selectedRange.start
    const endDate = selectedRange.end
    const minDate = toDate(min)
    const maxDate = toDate(max)
    const hasError = error || !!errorText
    const texts = useMDateRangePickerTexts()
    const dayNames = getDayNames(locale, firstDayOfWeek)
    const monthNames = getMonthNames(locale)
    const availablePresets = useMemo(() => {
        if (presets === true || (presetsSidebar && !presets)) {
            return getDefaultPresets(texts)
        }

        if (Array.isArray(presets)) {
            return presets
        }

        return []
    }, [presets, presetsSidebar, texts])

    const [viewDate, setViewDate] = useState(() => {
        const baseDate = startDate ?? new Date()
        return new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
    })

    const startTime = startDate?.getTime() ?? null
    useEffect(() => {
        if (!startTime) return
        const d = new Date(startTime)
        setViewDate(new Date(d.getFullYear(), d.getMonth(), 1))
    }, [startTime])

    const isDisabled = useCallback(
        (date: Date): boolean => {
            if (!isDateInRange(date, minDate, maxDate)) return true
            if (Array.isArray(disabledDates)) {
                return disabledDates.some((disabledDate) => isSameDay(disabledDate, date))
            }
            if (typeof disabledDates === 'function') {
                return disabledDates(date)
            }
            return false
        },
        [disabledDates, maxDate, minDate]
    )

    const commitRange = useCallback(
        (nextRange: {start: Date | null; end: Date | null}) => {
            if (value === undefined) {
                setInternalRange(nextRange)
            }
            onChange?.(nextRange)
        },
        [onChange, value]
    )

    const handleDayClick = useCallback(
        (date: Date) => {
            if (isDisabled(date)) return

            if (!startDate || (startDate && endDate)) {
                commitRange({start: date, end: null})
                setHoveredDate(null)
                return
            }

            if (!allowSameDay && isSameDay(date, startDate)) {
                return
            }

            const orderedRange = sortRange(startDate, date)
            commitRange(orderedRange)
            setHoveredDate(null)

            if (!inline) {
                setOpen(false)
            }
        },
        [allowSameDay, commitRange, endDate, inline, isDisabled, startDate]
    )

    const handleClear = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation()
            commitRange({start: null, end: null})
            setHoveredDate(null)
        },
        [commitRange]
    )

    const handleToday = useCallback(() => {
        const today = stripTime(new Date())
        if (isDisabled(today)) return
        commitRange({start: today, end: today})
        setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
        setHoveredDate(null)
        if (!inline) {
            setOpen(false)
        }
    }, [commitRange, inline, isDisabled])

    const handlePresetClick = useCallback(
        (preset: MDateRangePreset) => {
            const start = toDate(preset.value.start)
            const end = toDate(preset.value.end)

            if (!start || !end) {
                return
            }

            const orderedRange = sortRange(start, end)

            if (isDisabled(orderedRange.start) || isDisabled(orderedRange.end)) {
                return
            }

            commitRange(orderedRange)
            setViewDate(new Date(orderedRange.start.getFullYear(), orderedRange.start.getMonth(), 1))
            setHoveredDate(null)

            if (!inline) {
                setOpen(false)
            }
        },
        [commitRange, inline, isDisabled]
    )

    const previewEnd = startDate && !endDate ? hoveredDate : null
    const firstMonth = viewDate
    const secondMonth = addMonths(viewDate, 1)
    const today = stripTime(new Date())

    const displayValue = useMemo(() => formatRangeLabel(startDate, endDate, format), [endDate, format, startDate])

    const calendarMonths = useMemo(
        () =>
            [firstMonth, secondMonth].map((monthDate) => ({
                monthDate,
                days: buildCalendarDays(monthDate, firstDayOfWeek),
            })),
        [firstDayOfWeek, firstMonth, secondMonth]
    )

    const summaryText =
        startDate && endDate
            ? `${formatDate(startDate, format)} - ${formatDate(endDate, format)}`
            : startDate
              ? `${formatDate(startDate, format)} - ...`
              : (placeholder ?? texts.defaultRangePlaceholder)

    const showSidebar = presetsSidebar && availablePresets.length > 0
    const showInlinePresets = !presetsSidebar && availablePresets.length > 0

    const renderPresetsSidebar = () => (
        <div className="presets-sidebar">
            {availablePresets.map((preset) => (
                <button
                    key={preset.label}
                    type="button"
                    className="preset-sidebar-btn"
                    onClick={() => handlePresetClick(preset)}
                >
                    {preset.label}
                </button>
            ))}
        </div>
    )

    const renderCalendarContent = () => (
        <div className="calendar-body">
            <div className="calendar-top">
                <div className="calendar-caption">
                    <span className="caption-title">
                        {monthNames[firstMonth.getMonth()]} {firstMonth.getFullYear()}
                    </span>
                    <span className="caption-subtitle">{texts.rangeSubtitle}</span>
                </div>
                <div className="nav-actions">
                    <button
                        type="button"
                        className="nav-btn"
                        onClick={() => setViewDate(addMonths(viewDate, -1))}
                        aria-label={texts.previousMonth}
                    >
                        <MChevronLeftIcon />
                    </button>
                    <button
                        type="button"
                        className="nav-btn"
                        onClick={() => setViewDate(addMonths(viewDate, 1))}
                        aria-label={texts.nextMonth}
                    >
                        <MChevronRightIcon />
                    </button>
                </div>
            </div>

            {showInlinePresets && (
                <div className="presets">
                    {availablePresets.map((preset) => (
                        <button
                            key={preset.label}
                            type="button"
                            className="preset-btn"
                            onClick={() => handlePresetClick(preset)}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            )}

            <div className="months">
                {calendarMonths.map(({monthDate, days}) => (
                    <div key={monthDate.toISOString()} className="month-panel">
                        <div className="month-title">
                            {monthNames[monthDate.getMonth()]} {monthDate.getFullYear()}
                        </div>
                        <div className="day-names">
                            {dayNames.map((dayName) => (
                                <span key={`${monthDate.toISOString()}-${dayName}`} className="day-name">
                                    {dayName}
                                </span>
                            ))}
                        </div>
                        <div className="day-grid">
                            {days.map(({date, currentMonth}, index) => {
                                const disabledDay = isDisabled(date)
                                const selectedStart = startDate ? isSameDay(date, startDate) : false
                                const selectedEnd = endDate ? isSameDay(date, endDate) : false
                                const inRange = isBetween(date, startDate, endDate)
                                const previewRangeData =
                                    !endDate && startDate && previewEnd ? sortRange(startDate, previewEnd) : null
                                const previewRange = previewRangeData
                                    ? isBetween(date, previewRangeData.start, previewRangeData.end)
                                    : false
                                const previewEdge = previewRangeData
                                    ? isSameDay(date, previewRangeData.start) || isSameDay(date, previewRangeData.end)
                                    : false

                                return (
                                    <button
                                        key={`${monthDate.toISOString()}-${index}`}
                                        type="button"
                                        className={cn(
                                            'day',
                                            !currentMonth && 'other-month',
                                            isSameDay(date, today) && 'today',
                                            selectedStart && 'range-start selected',
                                            selectedEnd && 'range-end selected',
                                            inRange && 'in-range',
                                            previewRange && !previewEdge && 'preview-range',
                                            disabledDay && 'disabled'
                                        )}
                                        onClick={() => handleDayClick(date)}
                                        onMouseEnter={() => startDate && !endDate && setHoveredDate(date)}
                                        onFocus={() => startDate && !endDate && setHoveredDate(date)}
                                        disabled={disabledDay}
                                        tabIndex={-1}
                                    >
                                        {date.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="footer">
                <span className="summary">{summaryText}</span>
                <div className="footer-actions">
                    {clearable && (startDate || endDate) && (
                        <button
                            type="button"
                            className="footer-btn"
                            onClick={(event) => {
                                event.preventDefault()
                                commitRange({start: null, end: null})
                                setHoveredDate(null)
                            }}
                        >
                            {texts.clear}
                        </button>
                    )}
                    {showTodayButton && (
                        <button type="button" className="footer-btn" onClick={handleToday}>
                            {texts.today}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )

    const renderCalendar = () => (
        <div className={cn('date-range-calendar', showSidebar && 'with-sidebar')}>
            {showSidebar && renderPresetsSidebar()}
            {renderCalendarContent()}
        </div>
    )

    if (inline) {
        return (
            <div
                className={cn('date-range-picker', color && `color-${color}`, fullWidth && 'full-width', className)}
                style={style}
            >
                {label && (
                    <label className={cn('field-label', hasError && 'error', required && 'required')}>{label}</label>
                )}
                {renderCalendar()}
            </div>
        )
    }

    return (
        <div
            className={cn('date-range-picker', color && `color-${color}`, fullWidth && 'full-width', className)}
            style={style}
        >
            {label && (
                <label
                    htmlFor={id}
                    className={cn('field-label', open && 'focused', hasError && 'error', required && 'required')}
                >
                    {label}
                </label>
            )}

            <div
                ref={triggerRef}
                className={cn(
                    'trigger',
                    `field-${variant}`,
                    `field-${size}`,
                    open && 'focused',
                    hasError && 'error',
                    disabled && 'disabled'
                )}
                onClick={() => !disabled && !readOnly && setOpen(true)}
            >
                <span className="icon">
                    <MCalendarIcon />
                </span>
                <input
                    type="text"
                    className="input"
                    value={displayValue}
                    placeholder={placeholder ?? texts.defaultRangePlaceholder}
                    disabled={disabled}
                    readOnly
                    id={id}
                    aria-invalid={hasError || undefined}
                />
                {clearable && (startDate || endDate) && !disabled && (
                    <button
                        type="button"
                        className="clear-btn clear-btn-base"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label={texts.clear}
                    >
                        <MCloseIcon />
                    </button>
                )}
            </div>

            {name && startDate && endDate && (
                <input
                    type="hidden"
                    name={name}
                    value={`${startDate.toISOString().split('T')[0]}:${endDate.toISOString().split('T')[0]}`}
                />
            )}

            <MPopover
                className={'date-range-picker-popover'}
                style={{'--color-rgb': colorRgbVar(color)} as React.CSSProperties}
                open={open}
                anchorRef={triggerRef}
                onClose={() => {
                    setOpen(false)
                    setHoveredDate(null)
                }}
                placement="bottom-start"
            >
                {renderCalendar()}
            </MPopover>

            {(errorText || helperText) && (
                <div className="bottom-row">
                    {errorText ? (
                        <span className="field-error" role="alert">
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
