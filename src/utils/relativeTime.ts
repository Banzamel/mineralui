export type RelativeTimeUnit = Intl.RelativeTimeFormatUnit

export type RelativeTimeFallbackFormat = 'date' | 'datetime'

export interface RelativeTimeValue {
    value: number
    unit: RelativeTimeUnit
}

export interface FormatRelativeTimeOptions {
    locale?: string
    now?: Date | number
}

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = Math.round(30.44 * DAY)
const YEAR = Math.round(365.25 * DAY)

const thresholdMap = {
    s: SECOND,
    m: MINUTE,
    h: HOUR,
    d: DAY,
    w: WEEK,
    mo: MONTH,
    y: YEAR,
} as const

export function toDate(value: Date | string | number): Date | null {
    const date = value instanceof Date ? value : new Date(value)
    return Number.isNaN(date.getTime()) ? null : date
}

export function parseRelativeThreshold(value?: string | number | null): number | null {
    if (value == null) return null
    if (typeof value === 'number') return value >= 0 ? value : null

    const match = value.trim().match(/^(\d+)\s*(mo|[smhdwy])$/i)
    if (!match) return null

    const amount = Number(match[1])
    const unit = match[2].toLowerCase() as keyof typeof thresholdMap

    return amount * thresholdMap[unit]
}

export function getRelativeTimeValue(
    value: Date | string | number,
    now: Date | number = Date.now()
): RelativeTimeValue | null {
    const date = toDate(value)
    const current = toDate(now)

    if (!date || !current) return null

    const diff = date.getTime() - current.getTime()
    const abs = Math.abs(diff)

    if (abs < MINUTE) {
        return {value: Math.round(diff / SECOND), unit: 'second'}
    }

    if (abs < HOUR) {
        return {value: Math.round(diff / MINUTE), unit: 'minute'}
    }

    if (abs < DAY) {
        return {value: Math.round(diff / HOUR), unit: 'hour'}
    }

    if (abs < WEEK) {
        return {value: Math.round(diff / DAY), unit: 'day'}
    }

    if (abs < MONTH) {
        return {value: Math.round(diff / WEEK), unit: 'week'}
    }

    if (abs < YEAR) {
        return {value: Math.round(diff / MONTH), unit: 'month'}
    }

    return {value: Math.round(diff / YEAR), unit: 'year'}
}

export function formatRelativeTime(
    value: Date | string | number,
    {locale = 'en', now = Date.now()}: FormatRelativeTimeOptions = {}
): string | null {
    const relative = getRelativeTimeValue(value, now)

    if (!relative) return null

    let formatter: Intl.RelativeTimeFormat

    try {
        formatter = new Intl.RelativeTimeFormat(locale, {
            numeric: 'auto',
            style: 'long',
        })
    } catch {
        formatter = new Intl.RelativeTimeFormat('en', {
            numeric: 'auto',
            style: 'long',
        })
    }

    return formatter.format(relative.value, relative.unit)
}

export function formatAbsoluteTime(
    value: Date | string | number,
    locale: string = 'en',
    fallbackFormat: RelativeTimeFallbackFormat = 'date'
): string | null {
    const date = toDate(value)

    if (!date) return null

    let formatter: Intl.DateTimeFormat

    try {
        formatter = new Intl.DateTimeFormat(locale, {
            dateStyle: 'medium',
            ...(fallbackFormat === 'datetime' ? {timeStyle: 'short'} : {}),
        })
    } catch {
        formatter = new Intl.DateTimeFormat('en', {
            dateStyle: 'medium',
            ...(fallbackFormat === 'datetime' ? {timeStyle: 'short'} : {}),
        })
    }

    return formatter.format(date)
}

export function getAutoUpdateInterval(value: Date | string | number, now: Date | number = Date.now()): number {
    const date = toDate(value)
    const current = toDate(now)

    if (!date || !current) return HOUR

    const diff = Math.abs(date.getTime() - current.getTime())

    if (diff < MINUTE) return SECOND
    if (diff < HOUR) return MINUTE
    if (diff < DAY) return HOUR
    return DAY
}
