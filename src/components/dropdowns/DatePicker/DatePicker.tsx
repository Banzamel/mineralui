import {useState, useRef, useCallback, useMemo, useEffect} from 'react'
import type * as React from 'react'
import type {DatePickerProps} from './DatePicker.types'
import {Popover} from '../../primitives'
import {cn} from '../../../utils/cn'
import {getAppearanceClassNames} from '../../../utils/appearanceProps'
import {getCalendarLocaleText, useDocumentLocale} from '../../../utils/locale'
import {
    CalendarIcon as CalendarGlyphIcon,
    ChevronLeftIcon as ChevronLeftGlyphIcon,
    ChevronRightIcon as ChevronRightGlyphIcon,
    CloseIcon as CloseGlyphIcon,
} from '../../../icons'
import {
    formatDate,
    parseDate,
    daysInMonth,
    firstDayOfMonth,
    isSameDay,
    isDateInRange,
    getDayNames,
    getMonthNames,
    addMonths,
    stripTime,
} from '../../../utils/dateUtils'
import './DatePicker.css'

// Normalize external date inputs into valid Date objects or null.
function toDate(val: Date | string | undefined): Date | null {
    if (!val) return null
    if (val instanceof Date) return val
    const date = new Date(val)
    return isNaN(date.getTime()) ? null : date
}

// Render a date input with calendar navigation, parsing and optional inline mode.
export function DatePicker({
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
    fcolor,
    label,
    helperText,
    errorText,
    error = false,
    required = false,
    clearable = false,
    inline = false,
    showTodayButton = true,
    firstDayOfWeek = 1,
    fullWidth = false,
    className,
    style,
}: DatePickerProps) {
    const locale = useDocumentLocale(localeOverride)
    const [open, setOpen] = useState(false)
    const [internalDate, setInternalDate] = useState<Date | null>(toDate(defaultValue))
    const [inputText, setInputText] = useState('')
    const selectedDate = toDate(value) ?? internalDate
    const [viewDate, setViewDate] = useState(() => {
        const date = selectedDate ?? new Date()
        return new Date(date.getFullYear(), date.getMonth(), 1)
    })
    const [viewMode, setViewMode] = useState<'days' | 'months'>('days')
    const triggerRef = useRef<HTMLDivElement>(null)

    const minDate = toDate(min)
    const maxDate = toDate(max)
    const hasError = error || !!errorText

    useEffect(() => {
        if (!selectedDate) return
        setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1))
    }, [selectedDate])

    const displayText = useMemo(() => {
        if (inputText) return inputText
        return selectedDate ? formatDate(selectedDate, format) : ''
    }, [selectedDate, format, inputText])

    const texts = getCalendarLocaleText(locale)
    const dayNames = getDayNames(locale, firstDayOfWeek)
    const monthNames = getMonthNames(locale)

    // Centralize date disabling so all calendar paths share the same logic.
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
        [minDate, maxDate, disabledDates]
    )

    // Apply the selected date and keep the calendar view aligned with it.
    const handleSelectDate = useCallback(
        (date: Date) => {
            if (isDisabled(date)) return
            if (value === undefined) setInternalDate(date)
            setInputText('')
            setViewDate(new Date(date.getFullYear(), date.getMonth(), 1))
            onChange?.(date)
            if (!inline) setOpen(false)
        },
        [inline, isDisabled, onChange, value]
    )

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }, [])

    // Parse manual input and commit it when it resolves to an allowed date.
    const handleInputBlur = useCallback(() => {
        if (!inputText) return
        const parsed = parseDate(inputText, format)
        if (parsed && !isDisabled(parsed)) {
            handleSelectDate(parsed)
        }
        setInputText('')
    }, [format, handleSelectDate, inputText, isDisabled])

    // Clear the current selection without toggling the popover state first.
    const handleClear = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation()
            if (value === undefined) setInternalDate(null)
            setInputText('')
            onChange?.(null)
        },
        [onChange, value]
    )

    // Jump directly to today's date through the same selection path.
    const handleToday = useCallback(() => {
        const today = stripTime(new Date())
        handleSelectDate(today)
    }, [handleSelectDate])

    // Build the six-week calendar grid including previous and next month fillers.
    const calendarDays = useMemo(() => {
        const year = viewDate.getFullYear()
        const month = viewDate.getMonth()
        const totalDays = daysInMonth(year, month)
        let startDay = firstDayOfMonth(year, month)

        if (firstDayOfWeek === 1) {
            startDay = startDay === 0 ? 6 : startDay - 1
        }

        const days: Array<{date: Date; currentMonth: boolean}> = []

        const prevMonth = month === 0 ? 11 : month - 1
        const prevYear = month === 0 ? year - 1 : year
        const prevDays = daysInMonth(prevYear, prevMonth)
        for (let i = startDay - 1; i >= 0; i--) {
            days.push({date: new Date(prevYear, prevMonth, prevDays - i), currentMonth: false})
        }

        for (let day = 1; day <= totalDays; day++) {
            days.push({date: new Date(year, month, day), currentMonth: true})
        }

        const remaining = 42 - days.length
        const nextMonth = month === 11 ? 0 : month + 1
        const nextYear = month === 11 ? year + 1 : year
        for (let day = 1; day <= remaining; day++) {
            days.push({date: new Date(nextYear, nextMonth, day), currentMonth: false})
        }

        return days
    }, [firstDayOfWeek, viewDate])

    const today = stripTime(new Date())

    // Render the day or month view depending on the current picker mode.
    const renderCalendar = () => (
        <div className="calendar">
            <div className="calendar-header">
                <button
                    type="button"
                    className="nav-btn"
                    onClick={() => setViewDate(addMonths(viewDate, -1))}
                    aria-label={texts.previousMonth}
                >
                    <ChevronLeftGlyphIcon />
                </button>
                <button
                    type="button"
                    className="header-title"
                    onClick={() => setViewMode((current) => (current === 'days' ? 'months' : 'days'))}
                >
                    {monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}
                </button>
                <button
                    type="button"
                    className="nav-btn"
                    onClick={() => setViewDate(addMonths(viewDate, 1))}
                    aria-label={texts.nextMonth}
                >
                    <ChevronRightGlyphIcon />
                </button>
            </div>

            {viewMode === 'days' ? (
                <>
                    <div className="day-names">
                        {dayNames.map((dayName) => (
                            <span key={dayName} className="day-name">
                                {dayName}
                            </span>
                        ))}
                    </div>

                    <div className="day-grid">
                        {calendarDays.map(({date, currentMonth}, index) => {
                            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
                            const isToday = isSameDay(date, today)
                            const disabledDay = isDisabled(date)

                            return (
                                <button
                                    key={`${date.toISOString()}-${index}`}
                                    type="button"
                                    className={cn(
                                        'day',
                                        !currentMonth && 'other-month',
                                        isToday && 'today',
                                        isSelected && 'selected',
                                        disabledDay && 'disabled'
                                    )}
                                    onClick={() => handleSelectDate(date)}
                                    disabled={disabledDay}
                                    tabIndex={-1}
                                >
                                    {date.getDate()}
                                </button>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div className="month-grid">
                    {monthNames.map((monthName, index) => (
                        <button
                            key={monthName}
                            type="button"
                            className={cn('month-cell', viewDate.getMonth() === index && 'selected')}
                            onClick={() => {
                                setViewDate(new Date(viewDate.getFullYear(), index, 1))
                                setViewMode('days')
                            }}
                        >
                            {monthName.slice(0, 3)}
                        </button>
                    ))}
                </div>
            )}

            {showTodayButton && (
                <div className="footer">
                    <button type="button" className="today-btn" onClick={handleToday}>
                        {texts.today}
                    </button>
                </div>
            )}
        </div>
    )

    if (inline) {
        return (
            <div
                className={cn(
                    'date-picker',
                    ...getAppearanceClassNames({fcolor}),
                    fullWidth && 'full-width',
                    className
                )}
                style={style}
            >
                {label && <label className={cn('label', hasError && 'error', required && 'required')}>{label}</label>}
                {renderCalendar()}
            </div>
        )
    }

    return (
        <div
            className={cn('date-picker', ...getAppearanceClassNames({fcolor}), fullWidth && 'full-width', className)}
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
                <span className="icon">
                    <CalendarGlyphIcon />
                </span>
                <input
                    type="text"
                    className="input"
                    value={displayText}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder={placeholder ?? format.toLowerCase()}
                    disabled={disabled}
                    readOnly={readOnly}
                    id={id}
                    aria-invalid={hasError || undefined}
                />
                {clearable && selectedDate && !disabled && (
                    <button
                        type="button"
                        className="clear-btn"
                        onClick={handleClear}
                        tabIndex={-1}
                        aria-label={texts.clear}
                    >
                        <CloseGlyphIcon />
                    </button>
                )}
            </div>

            {name && selectedDate && (
                <input type="hidden" name={name} value={selectedDate.toISOString().split('T')[0]} />
            )}

            <Popover
                className={'date-picker-popover'}
                open={open}
                anchorRef={triggerRef}
                onClose={() => setOpen(false)}
                placement="bottom-start"
            >
                {renderCalendar()}
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
