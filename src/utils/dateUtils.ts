// Return the number of days for a month in a given year.
export function daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate()
}

// Return the first weekday index for the given month.
export function firstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay()
}

// Compare two dates using only the calendar day.
export function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Check whether a date falls inside optional min and max boundaries.
export function isDateInRange(date: Date, min?: Date | null, max?: Date | null): boolean {
    return (!min || date >= stripTime(min)) && (!max || date <= stripTime(max))
}

// Drop the time portion to make date comparisons predictable.
export function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Shift a date by a number of whole months.
export function addMonths(date: Date, count: number): Date {
    const result = new Date(date)
    result.setMonth(result.getMonth() + count)
    return result
}

// Shift a date by a number of whole years.
export function addYears(date: Date, count: number): Date {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + count)
    return result
}

// Pad numeric date parts to two digits.
const pad = (n: number): string => n.toString().padStart(2, '0')

// Format a date with a lightweight token format.
export function formatDate(date: Date, format: string = 'dd.MM.yyyy'): string {
    const day = pad(date.getDate())
    const month = pad(date.getMonth() + 1)
    const year = date.getFullYear().toString()

    return format.replace('dd', day).replace('MM', month).replace('yyyy', year)
}

// Parse a date string according to the provided lightweight token format.
export function parseDate(value: string, format: string = 'dd.MM.yyyy'): Date | null {
    const dayIdx = format.indexOf('dd')
    const monthIdx = format.indexOf('MM')
    const yearIdx = format.indexOf('yyyy')

    if (dayIdx === -1 || monthIdx === -1 || yearIdx === -1) return null

    const day = parseInt(value.slice(dayIdx, dayIdx + 2), 10)
    const month = parseInt(value.slice(monthIdx, monthIdx + 2), 10)
    const year = parseInt(value.slice(yearIdx, yearIdx + 4), 10)

    if (isNaN(day) || isNaN(month) || isNaN(year)) return null
    if (month < 1 || month > 12) return null
    if (day < 1 || day > daysInMonth(year, month - 1)) return null

    return new Date(year, month - 1, day)
}

function normalizeWeekdayLabel(label: string): string {
    return label.replace(/\.$/u, '')
}

// Return localized short day names for calendar headers.
export function getDayNames(locale: string = 'en', firstDayOfWeek: 0 | 1 = 1): string[] {
    const formatter = new Intl.DateTimeFormat(locale, {weekday: 'short'})
    const sunday = new Date(Date.UTC(2021, 7, 1))
    const dayNames = Array.from({length: 7}, (_, index) => {
        const date = new Date(sunday)
        date.setUTCDate(sunday.getUTCDate() + index)
        return normalizeWeekdayLabel(formatter.format(date))
    })

    return firstDayOfWeek === 1 ? [...dayNames.slice(1), dayNames[0]] : dayNames
}

// Return localized month names for pickers and headers.
export function getMonthNames(locale: string = 'en'): string[] {
    const formatter = new Intl.DateTimeFormat(locale, {month: 'long'})

    return Array.from({length: 12}, (_, month) => formatter.format(new Date(Date.UTC(2021, month, 1))))
}

// Parse a time string into numeric hour, minute and second parts.
export function parseTime(value: string): {hours: number; minutes: number; seconds: number} | null {
    const parts = value.split(':')
    if (parts.length < 2) return null

    const hours = parseInt(parts[0], 10)
    const minutes = parseInt(parts[1], 10)
    const seconds = parts.length > 2 ? parseInt(parts[2], 10) : 0

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return null
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) return null

    return {hours, minutes, seconds}
}

// Format time values with optional seconds output.
export function formatTime(hours: number, minutes: number, seconds?: number, showSeconds: boolean = false): string {
    const base = `${pad(hours)}:${pad(minutes)}`
    return showSeconds ? `${base}:${pad(seconds ?? 0)}` : base
}
