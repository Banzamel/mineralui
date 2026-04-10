import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode} from 'react'
import type {MTheme, MMode, MModePreference} from './MTheme.types'

const STORAGE_KEY = 'mineralui-theme'

// Resolve the final mode once 'system' is allowed.
function resolveMode(pref: MModePreference): MMode {
    if (pref !== 'system') return pref
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Read a persisted mode safely when storage is available.
function readStored(): MModePreference | null {
    try {
        const v = localStorage.getItem(STORAGE_KEY)
        if (v === 'dark' || v === 'light' || v === 'system') return v
    } catch {
        /* SSR / blocked storage */
    }
    return null
}

export interface MThemeContextValue {
    theme: MTheme
    mode: MModePreference
    resolvedMode: MMode
    setMode: (next: MModePreference) => void
    toggleMode: () => void
}

const ThemeContext = createContext<MThemeContextValue>({
    theme: {},
    mode: 'dark',
    resolvedMode: 'dark',
    setMode: () => {},
    toggleMode: () => {},
})

// Map JS theme keys to CSS custom properties.
const varMap: Record<keyof MTheme, string> = {
    primaryRgb: '--mineral-primary-rgb',
    primary: '--mineral-primary',
    primaryDark: '--mineral-primary-dark',
    primaryLight: '--mineral-primary-light',
    neutralRgb: '--mineral-neutral-rgb',
    neutral: '--mineral-neutral',
    dark: '--mineral-dark',
    darkLight: '--mineral-dark-light',
    surface: '--mineral-surface',
    surfaceContrast: '--mineral-surface-contrast',
    pageBg: '--mineral-page-bg',
    pageText: '--mineral-page-text',
    text: '--mineral-text',
    textSecondary: '--mineral-text-secondary',
    textHeading: '--mineral-text-heading',
    border: '--mineral-border',
    borderHover: '--mineral-border-hover',
    borderFocus: '--mineral-border-focus',
    successRgb: '--mineral-success-rgb',
    success: '--mineral-success',
    errorRgb: '--mineral-error-rgb',
    error: '--mineral-error',
    warningRgb: '--mineral-warning-rgb',
    warning: '--mineral-warning',
    infoRgb: '--mineral-info-rgb',
    info: '--mineral-info',
    fontFamily: '--mineral-font-family-sans',
    fontFamilySans: '--mineral-font-family-sans',
    fontFamilyMono: '--mineral-font-family-mono',
    fontFamilyHeading: '--mineral-font-family-heading',
    fontColorDefault: '--mineral-fcolor-default',
    fontColorMuted: '--mineral-fcolor-muted',
    fontColorHeading: '--mineral-fcolor-heading',
    fontColorInverted: '--mineral-fcolor-inverted',
    fontColorPrimary: '--mineral-fcolor-primary',
    fontColorNeutral: '--mineral-fcolor-neutral',
    fontColorSuccess: '--mineral-fcolor-success',
    fontColorError: '--mineral-fcolor-error',
    fontColorWarning: '--mineral-fcolor-warning',
    fontColorInfo: '--mineral-fcolor-info',
    radiusSm: '--mineral-radius-sm',
    radiusMd: '--mineral-radius-md',
    radiusLg: '--mineral-radius-lg',
}

export type MThemeScope = 'body' | 'wrapper'

export interface MThemeProviderProps {
    theme?: MTheme
    mode?: MModePreference
    persist?: boolean
    scope?: MThemeScope
    children: ReactNode
}

// Sync theme tokens and mode classes with either the body or a local wrapper.
export function MThemeProvider({
    theme,
    mode: modeProp = 'dark',
    persist = true,
    scope = 'body',
    children,
}: MThemeProviderProps) {
    const ref = useRef<HTMLDivElement>(null)
    const safeTheme = useMemo(() => theme ?? {}, [theme])

    const [mode, setModeState] = useState<MModePreference>(() => {
        if (persist) {
            const stored = readStored()
            if (stored) return stored
        }
        return modeProp
    })

    const resolved = resolveMode(mode)

    const setMode = useCallback(
        (next: MModePreference) => {
            setModeState(next)
            if (persist) {
                try {
                    localStorage.setItem(STORAGE_KEY, next)
                } catch {
                    /* noop */
                }
            }
        },
        [persist]
    )

    const toggleMode = useCallback(() => {
        setMode(resolved === 'dark' ? 'light' : 'dark')
    }, [resolved, setMode])

    // Listen for system theme changes when mode is 'system'.
    useEffect(() => {
        if (mode !== 'system') return
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => setModeState('system')
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [mode])

    // Apply token overrides and light/dark class.
    useEffect(() => {
        const target = scope === 'body' ? document.body : ref.current
        if (!target) return

        for (const [key, value] of Object.entries(safeTheme)) {
            const cssVar = varMap[key as keyof MTheme]
            if (cssVar && value) {
                target.style.setProperty(cssVar, value)
                if (cssVar === '--mineral-font-family-sans') {
                    target.style.setProperty('--mineral-font-family', value)
                }
            }
        }

        target.classList.toggle('theme-light', resolved === 'light')

        return () => {
            for (const key of Object.keys(safeTheme)) {
                const cssVar = varMap[key as keyof MTheme]
                if (cssVar) {
                    target.style.removeProperty(cssVar)
                    if (cssVar === '--mineral-font-family-sans') {
                        target.style.removeProperty('--mineral-font-family')
                    }
                }
            }
            target.classList.remove('theme-light')
        }
    }, [resolved, safeTheme, scope])

    const ctx = useMemo<MThemeContextValue>(
        () => ({
            theme: safeTheme,
            mode,
            resolvedMode: resolved,
            setMode,
            toggleMode,
        }),
        [safeTheme, mode, resolved, setMode, toggleMode]
    )

    return (
        <ThemeContext.Provider value={ctx}>
            {scope === 'wrapper' ? (
                <div ref={ref} className={resolved === 'light' ? 'theme-light' : undefined}>
                    {children}
                </div>
            ) : (
                children
            )}
        </ThemeContext.Provider>
    )
}

export function useMTheme(): MThemeContextValue {
    return useContext(ThemeContext)
}
