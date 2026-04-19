import {useEffect, useState} from 'react'
import type {MHiddenProps} from './MTheme.types'

export const MBreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const

export const MShellBreakpoints = {
    mobile: 768,
    compact: 960,
} as const

export function useMaxWidth(breakpoint: number): boolean {
    const [matches, setMatches] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
    )

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const media = window.matchMedia(`(max-width: ${breakpoint}px)`)
        const sync = () => setMatches(media.matches)

        sync()

        if (typeof media.addEventListener === 'function') {
            media.addEventListener('change', sync)
            return () => media.removeEventListener('change', sync)
        }

        media.addListener(sync)
        return () => media.removeListener(sync)
    }, [breakpoint])

    return matches
}

export function getHiddenProps(hidden?: MHiddenProps['hidden']) {
    if (hidden === undefined || hidden === false) {
        return {}
    }

    if (hidden === true) {
        return {hidden: true}
    }

    return {'data-m-hidden': hidden}
}
