import {useEffect, useState} from 'react'

export function resolveRuntimeLocale(): string {
    if (typeof document !== 'undefined') {
        const lang = document.documentElement.lang?.trim()
        if (lang) return lang
    }

    if (typeof navigator !== 'undefined') {
        return navigator.language || navigator.languages?.[0] || 'en'
    }

    return 'en'
}

// React to MI18nProvider lang updates without requiring direct provider access.
export function useDocumentLocale(explicitLocale?: string): string {
    const [locale, setLocale] = useState(() => explicitLocale || resolveRuntimeLocale())

    useEffect(() => {
        if (explicitLocale) {
            setLocale(explicitLocale)
            return
        }

        if (typeof document === 'undefined') return

        const update = () => setLocale(resolveRuntimeLocale())
        update()

        const observer = new MutationObserver(update)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang'],
        })

        window.addEventListener('languagechange', update)

        return () => {
            observer.disconnect()
            window.removeEventListener('languagechange', update)
        }
    }, [explicitLocale])

    return locale
}

export function getLocaleLanguage(locale: string): string {
    return locale.split('-')[0]?.toLowerCase() || 'en'
}

export interface CalendarLocaleText {
    today: string
    clear: string
    previousMonth: string
    nextMonth: string
    selectDateRange: string
    rangeSubtitle: string
    defaultRangePlaceholder: string
}

const CALENDAR_TEXT: Record<string, CalendarLocaleText> = {
    en: {
        today: 'Today',
        clear: 'Clear',
        previousMonth: 'Previous month',
        nextMonth: 'Next month',
        selectDateRange: 'Select date range...',
        rangeSubtitle: 'Select start and end dates in one panel.',
        defaultRangePlaceholder: 'Select date range...',
    },
    pl: {
        today: 'Dzisiaj',
        clear: 'Wyczyść',
        previousMonth: 'Poprzedni miesiąc',
        nextMonth: 'Następny miesiąc',
        selectDateRange: 'Wybierz zakres dat...',
        rangeSubtitle: 'Wybierz datę początkową i końcową w jednym panelu.',
        defaultRangePlaceholder: 'Wybierz zakres dat...',
    },
}

export function getCalendarLocaleText(locale: string): CalendarLocaleText {
    return CALENDAR_TEXT[getLocaleLanguage(locale)] ?? CALENDAR_TEXT.en
}
