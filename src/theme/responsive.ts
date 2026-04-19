import type {MHiddenProps} from './MTheme.types'

export const MBreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const

export function getHiddenProps(hidden?: MHiddenProps['hidden']) {
    if (hidden === undefined || hidden === false) {
        return {}
    }

    if (hidden === true) {
        return {hidden: true}
    }

    return {'data-m-hidden': hidden}
}
