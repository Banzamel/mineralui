import type {ReactNode, SVGProps} from 'react'

type SocialMarkProps = SVGProps<SVGSVGElement>

function createMark(children: ReactNode, props: SocialMarkProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
            {children}
        </svg>
    )
}

export function SocialGoogleMark(props: SocialMarkProps) {
    return createMark(
        <>
            <circle cx="12" cy="12" r="10.2" fill="#fff" stroke="#dadce0" strokeWidth="1.2" />
            <path
                d="M17.95 12.25c0-.48-.04-.83-.13-1.2H12v2.26h3.42c-.07.56-.48 1.4-1.4 1.97l-.01.08 2 1.52.14.02c1.28-1.15 1.8-2.84 1.8-4.65z"
                fill="#4285F4"
            />
            <path
                d="M12 18.2c1.67 0 3.07-.54 4.1-1.48l-2.13-1.62c-.57.39-1.34.67-1.97.67-1.64 0-3.03-1.06-3.53-2.53l-.08.01-2.08 1.58-.03.08c1.02 1.97 3.09 3.29 5.72 3.29z"
                fill="#34A853"
            />
            <path
                d="M8.47 13.24a3.72 3.72 0 0 1-.2-1.24c0-.43.08-.84.19-1.24l-.01-.08-2.1-1.6-.07.03a6.02 6.02 0 0 0 0 5.78l2.19-1.65z"
                fill="#FBBC05"
            />
            <path
                d="M12 8.22c.8 0 1.53.27 2.1.8l1.54-1.48C14.99 6.96 13.67 6.5 12 6.5c-2.63 0-4.7 1.32-5.72 3.29l2.18 1.66c.5-1.47 1.9-2.53 3.54-2.53z"
                fill="#EA4335"
            />
        </>,
        props
    )
}

export function SocialFacebookMark(props: SocialMarkProps) {
    return createMark(
        <>
            <rect x="2.2" y="2.2" width="19.6" height="19.6" rx="6.2" fill="#1877F2" />
            <path
                d="M13.28 20v-6.02h2.02l.31-2.43h-2.33V10c0-.78.27-1.37 1.35-1.37h1.11V6.4c-.4-.06-1.09-.11-2.03-.11-2.3 0-3.64 1.22-3.64 3.76v1.49h-1.9v2.44h1.9V20z"
                fill="#fff"
            />
        </>,
        props
    )
}

export function SocialAppleMark(props: SocialMarkProps) {
    return createMark(
        <>
            <path
                d="M15.38 11.84c.02 2.33 2.04 3.1 2.07 3.12-.03.07-.33 1.09-1.06 2.16-.63.91-1.3 1.84-2.34 1.86-1.03.02-1.37-.61-2.57-.61-1.2 0-1.57.59-2.53.63-1.02.04-1.79-1.01-2.43-1.92-1.3-1.89-2.3-5.33-.97-7.64.67-1.15 1.86-1.88 3.14-1.9.98-.02 1.89.65 2.57.65.67 0 1.92-.81 3.24-.69.55.02 2.1.22 3.09 1.67-.08.05-1.84 1.07-1.81 2.67z"
                fill="currentColor"
            />
            <path
                d="M13.59 4.67c.53-.64.9-1.52.8-2.42-.77.04-1.69.52-2.24 1.15-.5.58-.93 1.49-.82 2.35.86.07 1.72-.44 2.26-1.08z"
                fill="currentColor"
            />
        </>,
        props
    )
}

export function SocialMicrosoftMark(props: SocialMarkProps) {
    return createMark(
        <>
            <rect x="3.5" y="3.5" width="7.8" height="7.8" rx="1.3" fill="#F25022" />
            <rect x="12.7" y="3.5" width="7.8" height="7.8" rx="1.3" fill="#7FBA00" />
            <rect x="3.5" y="12.7" width="7.8" height="7.8" rx="1.3" fill="#00A4EF" />
            <rect x="12.7" y="12.7" width="7.8" height="7.8" rx="1.3" fill="#FFB900" />
        </>,
        props
    )
}

export function SocialPinterestMark(props: SocialMarkProps) {
    return createMark(
        <>
            <circle cx="12" cy="12" r="10.1" fill="#fff" />
            <path
                d="M12.87 6.76c-2.95 0-4.74 2.03-4.74 4.34 0 1.65.92 3.07 2.38 3.62.1.03.14.01.17-.06l.32-1.23c.05-.14.02-.19-.09-.33-.26-.33-.47-.96-.47-1.57 0-1.52 1.14-2.97 3.08-2.97 1.68 0 2.86 1.14 2.86 2.78 0 1.86-.93 3.13-2.14 3.13-.67 0-1.17-.56-1-1.23.18-.8.55-1.64.55-2.2 0-.51-.28-.93-.84-.93-.67 0-1.2.69-1.2 1.62 0 .59.2.99.2.99l-.78 3.28c-.14.58-.03 1.55.01 1.68.02.08.1.1.15.03.09-.11 1.07-1.49 1.24-2.18l.27-1.06c.25.48.99.89 1.77.89 2.34 0 4.04-2.15 4.04-4.79 0-2.54-2.08-4.44-4.78-4.44z"
                fill="#E60023"
            />
        </>,
        props
    )
}

export function SocialLinkedInMark(props: SocialMarkProps) {
    return createMark(
        <>
            <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="4.8" fill="#fff" />
            <path
                d="M8.1 10.02h2.04v7.24H8.1zm1.03-3.22a1.17 1.17 0 1 1 0 2.35 1.17 1.17 0 0 1 0-2.35zm2.68 3.22h1.95v.99c.34-.61 1.08-1.15 2.13-1.15 2.15 0 2.82 1.42 2.82 3.78v3.62h-2.04v-3.26c0-.98-.35-1.67-1.23-1.67-.66 0-1.05.45-1.23.88-.08.16-.08.38-.08.59v3.46h-2.32z"
                fill="#0A66C2"
            />
        </>,
        props
    )
}
