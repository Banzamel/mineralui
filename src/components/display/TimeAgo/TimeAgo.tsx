import {useEffect, useMemo, useState} from 'react'
import type {TimeAgoProps, TimeAgoUpdate} from './TimeAgo.types'
import {cn} from '../../../utils/cn'
import {
    formatAbsoluteTime,
    formatRelativeTime,
    getAutoUpdateInterval,
    parseRelativeThreshold,
    toDate,
} from '../../../utils/relativeTime'
import './TimeAgo.css'

function resolveLocale(): string {
    if (typeof document !== 'undefined') {
        const lang = document.documentElement.lang?.trim()
        if (lang) return lang
    }

    if (typeof navigator !== 'undefined') {
        return navigator.language || navigator.languages?.[0] || 'en'
    }

    return 'en'
}

function getUpdateInterval(update: TimeAgoUpdate, value: Date | string | number, now: number): number | null {
    if (update === 'none') return null
    if (update === 'minute') return 60 * 1000
    if (update === 'hour') return 60 * 60 * 1000
    if (update === 'day') return 24 * 60 * 60 * 1000
    return getAutoUpdateInterval(value, now)
}

// React to lang changes driven by MI18nProvider without forcing the component to live inside the provider.
function useDocumentLocale(explicitLocale?: string): string {
    const [locale, setLocale] = useState(() => explicitLocale || resolveLocale())

    useEffect(() => {
        if (explicitLocale) {
            setLocale(explicitLocale)
            return
        }

        if (typeof document === 'undefined') return

        const update = () => setLocale(resolveLocale())
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

export function TimeAgo({
    value,
    locale: localeOverride,
    maxRelative,
    fallbackFormat = 'date',
    titleAbsolute = true,
    update = 'auto',
    className,
    ...rest
}: TimeAgoProps) {
    const locale = useDocumentLocale(localeOverride)
    const [now, setNow] = useState(() => Date.now())
    const interval = useMemo(() => getUpdateInterval(update, value, now), [now, update, value])

    useEffect(() => {
        if (!interval) return

        const id = window.setInterval(() => setNow(Date.now()), interval)
        return () => window.clearInterval(id)
    }, [interval])

    const date = useMemo(() => toDate(value), [value])
    const maxRelativeMs = useMemo(() => parseRelativeThreshold(maxRelative), [maxRelative])

    const absolute = useMemo(() => formatAbsoluteTime(value, locale, fallbackFormat), [value, locale, fallbackFormat])

    const content = useMemo(() => {
        if (!date) return String(value)

        const diff = Math.abs(date.getTime() - now)
        if (maxRelativeMs != null && diff > maxRelativeMs) {
            return absolute ?? String(value)
        }

        return formatRelativeTime(date, {locale, now}) ?? absolute ?? String(value)
    }, [absolute, date, locale, maxRelativeMs, now, value])

    return (
        <time
            className={cn('time ago', className)}
            dateTime={date?.toISOString()}
            title={titleAbsolute ? (absolute ?? undefined) : undefined}
            {...rest}
        >
            {content}
        </time>
    )
}
