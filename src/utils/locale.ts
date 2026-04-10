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
