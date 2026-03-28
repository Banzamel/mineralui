import {forwardRef} from 'react'
import type {ReactNode} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

function makeBrandIcon(name: string, body: ReactNode) {
    const BrandIcon = forwardRef<SVGSVGElement, IconProps>(function BrandIcon(props, ref) {
        return (
            <Icon ref={ref} {...props}>
                {body}
            </Icon>
        )
    })

    BrandIcon.displayName = name

    return BrandIcon
}

export const AppleIcon = makeBrandIcon(
    'AppleIcon',
    <>
        <path
            d="M15.1 12.15c.02 2.1 1.84 2.8 1.86 2.81-.02.06-.29.98-.95 1.94-.57.83-1.16 1.66-2.1 1.68-.93.01-1.23-.55-2.3-.55s-1.41.53-2.27.57c-.91.03-1.6-.91-2.17-1.73-1.17-1.7-2.07-4.8-.87-6.88.6-1.03 1.66-1.69 2.81-1.71.88-.02 1.7.59 2.3.59.6 0 1.72-.73 2.9-.62.49.02 1.88.2 2.77 1.51-.07.04-1.65.96-1.63 2.39z"
            fill="currentColor"
            stroke="none"
        />
        <path
            d="M13.5 5.7c.48-.57.81-1.35.72-2.15-.69.03-1.52.46-2.01 1.03-.45.52-.84 1.32-.73 2.09.77.06 1.54-.39 2.02-.97z"
            fill="currentColor"
            stroke="none"
        />
    </>
)

export const AppleColorIcon = makeBrandIcon(
    'AppleColorIcon',
    <>
        <path
            d="M15.1 12.15c.02 2.1 1.84 2.8 1.86 2.81-.02.06-.29.98-.95 1.94-.57.83-1.16 1.66-2.1 1.68-.93.01-1.23-.55-2.3-.55s-1.41.53-2.27.57c-.91.03-1.6-.91-2.17-1.73-1.17-1.7-2.07-4.8-.87-6.88.6-1.03 1.66-1.69 2.81-1.71.88-.02 1.7.59 2.3.59.6 0 1.72-.73 2.9-.62.49.02 1.88.2 2.77 1.51-.07.04-1.65.96-1.63 2.39z"
            fill="#111827"
            stroke="none"
        />
        <path
            d="M13.5 5.7c.48-.57.81-1.35.72-2.15-.69.03-1.52.46-2.01 1.03-.45.52-.84 1.32-.73 2.09.77.06 1.54-.39 2.02-.97z"
            fill="#111827"
            stroke="none"
        />
    </>
)

export const AmazonIcon = makeBrandIcon(
    'AmazonIcon',
    <>
        <path
            d="M8.1 9.45c1.06-.68 2.47-.95 3.88-.95 1.22 0 2.45.2 3.41.57v4.58c0 .48.18.68.52.91v.37c-.43.37-1 .62-1.62.62-.52 0-.89-.2-1.2-.62-.8.52-1.52.62-2.44.62-1.54 0-2.48-.93-2.48-2.36 0-1.13.62-1.93 1.84-2.34.95-.31 2.17-.37 3.08-.5v-.31c0-.26-.02-.58-.18-.8-.16-.2-.43-.29-.7-.29-.53 0-1.03.25-1.15.8-.03.13-.12.25-.27.26l-1.53-.17c-.13-.03-.27-.13-.24-.37.23-1.43 1.56-2.07 3.08-2.07zM13.05 12.1c-.46.1-.98.15-1.38.35-.47.24-.76.59-.76 1.18 0 .6.37.98.94.98.43 0 .84-.2 1.12-.52.34-.4.31-.8.31-1.3z"
            fill="currentColor"
            stroke="none"
        />
        <path
            d="M6.05 16.2c1.84 1.1 3.82 1.65 5.95 1.65 2.54 0 4.8-.75 6.7-2.25.3-.24.75-.02.45.35-1.62 1.95-4.08 3.1-6.9 3.1-2.03 0-4.37-.77-6.22-2.22-.3-.23-.03-.55.02-.63z"
            fill="currentColor"
            stroke="none"
        />
        <path
            d="M16.8 15.8c.69.08 1.43.22 1.7.55.26.3-.04 1.01-.24 1.47-.06.14.08.21.19.12.7-.59.89-1.83.74-2.1-.15-.27-1.35-.5-2.16-.44-.12.01-.15.32-.03.4z"
            fill="currentColor"
            stroke="none"
        />
    </>
)

export const AmazonColorIcon = makeBrandIcon(
    'AmazonColorIcon',
    <>
        <path
            d="M8.1 9.45c1.06-.68 2.47-.95 3.88-.95 1.22 0 2.45.2 3.41.57v4.58c0 .48.18.68.52.91v.37c-.43.37-1 .62-1.62.62-.52 0-.89-.2-1.2-.62-.8.52-1.52.62-2.44.62-1.54 0-2.48-.93-2.48-2.36 0-1.13.62-1.93 1.84-2.34.95-.31 2.17-.37 3.08-.5v-.31c0-.26-.02-.58-.18-.8-.16-.2-.43-.29-.7-.29-.53 0-1.03.25-1.15.8-.03.13-.12.25-.27.26l-1.53-.17c-.13-.03-.27-.13-.24-.37.23-1.43 1.56-2.07 3.08-2.07zM13.05 12.1c-.46.1-.98.15-1.38.35-.47.24-.76.59-.76 1.18 0 .6.37.98.94.98.43 0 .84-.2 1.12-.52.34-.4.31-.8.31-1.3z"
            fill="#111827"
            stroke="none"
        />
        <path
            d="M6.05 16.2c1.84 1.1 3.82 1.65 5.95 1.65 2.54 0 4.8-.75 6.7-2.25.3-.24.75-.02.45.35-1.62 1.95-4.08 3.1-6.9 3.1-2.03 0-4.37-.77-6.22-2.22-.3-.23-.03-.55.02-.63z"
            fill="#f59e0b"
            stroke="none"
        />
        <path
            d="M16.8 15.8c.69.08 1.43.22 1.7.55.26.3-.04 1.01-.24 1.47-.06.14.08.21.19.12.7-.59.89-1.83.74-2.1-.15-.27-1.35-.5-2.16-.44-.12.01-.15.32-.03.4z"
            fill="#f59e0b"
            stroke="none"
        />
    </>
)

export const MastercardIcon = makeBrandIcon(
    'MastercardIcon',
    <>
        <circle cx="10" cy="12" r="4.2" fill="currentColor" stroke="none" opacity="0.9" />
        <circle cx="14" cy="12" r="4.2" fill="currentColor" stroke="none" opacity="0.65" />
    </>
)

export const MastercardColorIcon = makeBrandIcon(
    'MastercardColorIcon',
    <>
        <circle cx="10" cy="12" r="4.2" fill="#eb001b" stroke="none" />
        <circle cx="14" cy="12" r="4.2" fill="#f79e1b" stroke="none" />
        <path d="M12 8a4.2 4.2 0 0 1 0 8 4.2 4.2 0 0 1 0-8z" fill="#ff5f00" stroke="none" />
    </>
)

export const VisaIcon = makeBrandIcon(
    'VisaIcon',
    <path
        d="M6.2 15.9 8.1 8.1h1.9l-1.9 7.8zM16.85 8.3a4.7 4.7 0 0 0-1.7-.3c-1.88 0-3.2 1-3.21 2.43-.02 1.06.95 1.65 1.67 2 .73.36 1 .59 1 .91 0 .49-.59.72-1.14.72-.76 0-1.17-.12-1.8-.4l-.25-.12-.27 1.65c.44.2 1.25.37 2.1.38 1.99 0 3.28-.98 3.3-2.5.01-.84-.5-1.47-1.6-2-.66-.33-1.07-.55-1.07-.88.01-.29.33-.61 1.04-.61.59-.01 1.03.12 1.36.26l.16.08zM19.8 8.1h-1.46c-.45 0-.79.13-.98.6l-2.8 7.2h1.98l.39-1.1h2.42l.23 1.1h1.75zM17.45 13.35l1-2.77.58 2.77z"
        fill="currentColor"
        stroke="none"
    />
)

export const VisaColorIcon = makeBrandIcon(
    'VisaColorIcon',
    <>
        <path d="M5.75 8.1h1.72l1.24 6.1 1.62-6.1h1.76l-2.18 7.8H7.78z" fill="#1a1f71" stroke="none" />
        <path d="M12.85 8.1h1.63l-1.43 7.8h-1.64z" fill="#1a1f71" stroke="none" />
        <path
            d="M18.6 8.45c-.34-.14-.88-.3-1.55-.3-1.72 0-2.93.91-2.94 2.22-.02.96.86 1.5 1.51 1.82.68.34.91.55.91.85 0 .46-.55.66-1.06.66-.72 0-1.1-.11-1.69-.36l-.23-.11-.25 1.5c.41.2 1.2.37 2 .38 1.83 0 3.03-.9 3.04-2.29.01-.76-.46-1.35-1.44-1.82-.6-.3-.98-.5-.98-.81.01-.28.31-.57.94-.57.54 0 .93.12 1.23.24l.15.07z"
            fill="#1a1f71"
            stroke="none"
        />
        <path
            d="M18.5 15.9h1.49l-.92-7.8h-1.37c-.42 0-.73.12-.89.51l-3.03 7.29h1.8l.43-1.19h2.2zm-1.88-2.56.92-2.54.53 2.54z"
            fill="#1a1f71"
            stroke="none"
        />
        <path d="m5.4 8.1 1.02 1.16.57-1.16z" fill="#f59e0b" stroke="none" />
    </>
)

export const LetsEncryptIcon = makeBrandIcon(
    'LetsEncryptIcon',
    <>
        <path d="M8 6.3h8l2.4 2.4v6.6L16 17.7H8l-2.4-2.4V8.7z" />
        <path d="M9.3 9.4h5.4v5.2H9.3z" />
        <path d="M12 6.3v-2M7.45 7.45 6 6M16.55 7.45 18 6M12 19.7v-2M7.45 16.55 6 18M16.55 16.55 18 18" />
    </>
)

export const LetsEncryptColorIcon = makeBrandIcon(
    'LetsEncryptColorIcon',
    <>
        <path d="M8 6.3h8l2.4 2.4v6.6L16 17.7H8l-2.4-2.4V8.7z" stroke="#2563eb" />
        <path d="M9.3 9.4h5.4v5.2H9.3z" stroke="#f59e0b" />
        <path
            d="M12 6.3v-2M7.45 7.45 6 6M16.55 7.45 18 6M12 19.7v-2M7.45 16.55 6 18M16.55 16.55 18 18"
            stroke="#2563eb"
        />
    </>
)

export const MicrosoftIcon = makeBrandIcon(
    'MicrosoftIcon',
    <>
        <rect x="5" y="5" width="6.2" height="6.2" fill="currentColor" stroke="none" />
        <rect x="12.8" y="5" width="6.2" height="6.2" fill="currentColor" stroke="none" />
        <rect x="5" y="12.8" width="6.2" height="6.2" fill="currentColor" stroke="none" />
        <rect x="12.8" y="12.8" width="6.2" height="6.2" fill="currentColor" stroke="none" />
    </>
)

export const MicrosoftColorIcon = makeBrandIcon(
    'MicrosoftColorIcon',
    <>
        <rect x="5" y="5" width="6.2" height="6.2" fill="#f25022" stroke="none" />
        <rect x="12.8" y="5" width="6.2" height="6.2" fill="#7fba00" stroke="none" />
        <rect x="5" y="12.8" width="6.2" height="6.2" fill="#00a4ef" stroke="none" />
        <rect x="12.8" y="12.8" width="6.2" height="6.2" fill="#ffb900" stroke="none" />
    </>
)

export const PinterestIcon = makeBrandIcon(
    'PinterestIcon',
    <>
        <circle cx="12" cy="12" r="7.9" fill="currentColor" stroke="none" />
        <path
            d="M10.4 17.2c.2-.72.4-1.48.56-2.07-.37-.75-.56-1.53-.56-2.34 0-2.27 1.53-4.1 3.77-4.1 1.89 0 3.09 1.22 3.09 2.9 0 2.18-.96 3.66-2.44 3.66-.65 0-1.2-.36-1.4-.92l-.37 1.46"
            stroke="#fff"
        />
        <path
            d="M9.8 15.75c-1.42-.47-2.35-1.7-2.35-3.6 0-2.62 1.95-4.7 4.95-4.7 2.62 0 4.35 1.72 4.35 4 0 2.95-1.65 5.18-4.08 5.18-.77 0-1.5-.4-1.74-1.13"
            stroke="#fff"
        />
    </>
)

export const PinterestColorIcon = makeBrandIcon(
    'PinterestColorIcon',
    <>
        <circle cx="12" cy="12" r="7.9" fill="#e60023" stroke="none" />
        <path
            d="M12.65 7.35c-2.82 0-4.55 1.94-4.55 4.13 0 1.57.88 2.93 2.28 3.45.09.03.14.01.16-.06l.3-1.17c.04-.13.02-.18-.09-.31-.25-.32-.45-.92-.45-1.49 0-1.44 1.09-2.83 2.95-2.83 1.61 0 2.74 1.09 2.74 2.65 0 1.77-.89 2.99-2.05 2.99-.64 0-1.12-.53-.96-1.17.18-.76.52-1.57.52-2.11 0-.49-.26-.9-.81-.9-.64 0-1.15.66-1.15 1.55 0 .56.19.95.19.95l-.75 3.14c-.13.56-.02 1.48.02 1.6.02.07.09.09.14.03.08-.11 1.03-1.43 1.19-2.09l.26-1.02c.24.46.95.85 1.69.85 2.23 0 3.85-2.05 3.85-4.59 0-2.43-1.98-4.25-4.54-4.25z"
            fill="#fff"
            stroke="none"
        />
    </>
)

export const PayPalIcon = makeBrandIcon(
    'PayPalIcon',
    <>
        <path
            d="M9 17.1 10.7 6.9h4.05c1.96 0 3.15 1.03 3.15 2.72 0 2.15-1.45 3.36-3.9 3.36h-2l-.57 4.03z"
            fill="currentColor"
            stroke="none"
            opacity="0.7"
        />
        <path
            d="M7.15 17.1 8.8 6.9h3.85c1.75 0 2.85.95 2.85 2.5 0 1.98-1.35 3.15-3.62 3.15H9.9l-.58 4.55z"
            fill="currentColor"
            stroke="none"
        />
    </>
)

export const PayPalColorIcon = makeBrandIcon(
    'PayPalColorIcon',
    <>
        <path
            d="M8.15 18.1 9.9 6.9h4.55c1.7 0 2.9.3 3.6 1 .58.58.82 1.4.7 2.38-.24 2.06-1.83 3.3-4.12 3.3h-1.9l-.5 3.27c-.04.22-.22.38-.45.38z"
            fill="#003087"
            stroke="none"
        />
        <path
            d="M6.7 18.1 8.45 6.9h4.05c1.3 0 2.25.25 2.86.76.66.55.95 1.36.83 2.4-.2 1.88-1.66 2.98-3.84 2.98H10.5l-.64 4.45c-.03.34-.32.61-.67.61z"
            fill="#009cde"
            stroke="none"
        />
        <path
            d="M10.9 8.25h2.42c1.8 0 2.78.78 2.78 2.18 0 1.62-1.17 2.56-3.14 2.56h-1.7z"
            fill="#012169"
            stroke="none"
            opacity="0.32"
        />
    </>
)

export const SpotifyIcon = makeBrandIcon(
    'SpotifyIcon',
    <>
        <circle cx="12" cy="12" r="8.2" fill="currentColor" stroke="none" />
        <path
            d="M8.3 10.15c2.6-.6 5.48-.4 7.95.63M8.8 12.65c2.13-.44 4.4-.26 6.35.54M9.45 15c1.58-.28 3.16-.16 4.6.38"
            stroke="#fff"
        />
    </>
)

export const SpotifyColorIcon = makeBrandIcon(
    'SpotifyColorIcon',
    <>
        <circle cx="12" cy="12" r="8.2" fill="#1ed760" stroke="none" />
        <path
            d="M8.3 10.15c2.6-.6 5.48-.4 7.95.63M8.8 12.65c2.13-.44 4.4-.26 6.35.54M9.45 15c1.58-.28 3.16-.16 4.6.38"
            stroke="#111827"
        />
    </>
)

export const TumblrIcon = makeBrandIcon(
    'TumblrIcon',
    <path
        d="M13.55 18.2c-.73.35-1.7.48-2.5.48-2.44 0-3.54-1.72-3.54-3.56V11.1H5.95V9.2c1.4-.5 2.23-1.67 2.47-3.4h1.83v3.1h3.02v2.2h-3.02v3.8c0 .88.45 1.4 1.3 1.4.48 0 1-.14 1.3-.29z"
        fill="currentColor"
        stroke="none"
    />
)

export const TumblrColorIcon = makeBrandIcon(
    'TumblrColorIcon',
    <path
        d="M13.55 18.2c-.73.35-1.7.48-2.5.48-2.44 0-3.54-1.72-3.54-3.56V11.1H5.95V9.2c1.4-.5 2.23-1.67 2.47-3.4h1.83v3.1h3.02v2.2h-3.02v3.8c0 .88.45 1.4 1.3 1.4.48 0 1-.14 1.3-.29z"
        fill="#001935"
        stroke="none"
    />
)

export const UnityIcon = makeBrandIcon(
    'UnityIcon',
    <>
        <path d="m12 5.2 3.15 1.82v3.63L12 12.47 8.85 10.65V7.02z" fill="none" />
        <path d="m12 5.2 5.4 3.12v6.36L12 17.8 6.6 14.68V8.32z" />
        <path d="M12 5.2v6.1M6.6 8.32l5.4 3.12 5.4-3.12M12 17.8v-6.1" />
    </>
)

export const UnityColorIcon = makeBrandIcon(
    'UnityColorIcon',
    <>
        <path d="m12 5.2 5.4 3.12v6.36L12 17.8 6.6 14.68V8.32z" stroke="#111827" />
        <path d="M12 5.2v6.1M6.6 8.32l5.4 3.12 5.4-3.12M12 17.8v-6.1" stroke="#111827" />
    </>
)

export const VimeoIcon = makeBrandIcon(
    'VimeoIcon',
    <path
        d="M6.55 10.3c.79-.69 1.5-1.04 2.13-1.06.55-.02.92.32 1.11 1.04.12.47.31 1.46.57 2.96.26 1.48.54 2.22.83 2.22.23 0 .59-.37 1.06-1.12.48-.75.73-1.32.76-1.7.07-.64-.18-.96-.74-.96-.26 0-.53.06-.81.18.54-1.78 1.58-2.65 3.11-2.6 1.14.04 1.68.82 1.62 2.35-.04 1-.6 2.1-1.67 3.32-1.12 1.27-2.06 1.9-2.82 1.9-.47 0-.87-.43-1.2-1.3-.22-.58-.53-1.68-.93-3.3-.15-.58-.37-.86-.66-.86-.18 0-.49.19-.94.58z"
        fill="currentColor"
        stroke="none"
    />
)

export const VimeoColorIcon = makeBrandIcon(
    'VimeoColorIcon',
    <path
        d="M6.55 10.3c.79-.69 1.5-1.04 2.13-1.06.55-.02.92.32 1.11 1.04.12.47.31 1.46.57 2.96.26 1.48.54 2.22.83 2.22.23 0 .59-.37 1.06-1.12.48-.75.73-1.32.76-1.7.07-.64-.18-.96-.74-.96-.26 0-.53.06-.81.18.54-1.78 1.58-2.65 3.11-2.6 1.14.04 1.68.82 1.62 2.35-.04 1-.6 2.1-1.67 3.32-1.12 1.27-2.06 1.9-2.82 1.9-.47 0-.87-.43-1.2-1.3-.22-.58-.53-1.68-.93-3.3-.15-.58-.37-.86-.66-.86-.18 0-.49.19-.94.58z"
        fill="#1ab7ea"
        stroke="none"
    />
)

export const VkIcon = makeBrandIcon(
    'VkIcon',
    <path
        d="M6.1 8.35h2.1c.08 4 1.85 5.7 2.41 6.04V8.35h1.98v3.45c.55-.06 2.25-1.7 2.45-3.45h1.97c-.15 1.14-.82 2.3-1.44 3.07-.8 1-1.16 1.38-1.13 1.7.03.36.44.69 1.06 1.3.82.8 1.48 1.5 1.64 2.23h-2.18c-.23-.65-.98-1.6-1.57-2.17-.43-.42-.63-.54-.8-.54-.22 0-.26.12-.26.73v1.98H11.8c-3.96 0-6.22-2.72-6.35-8.33z"
        fill="currentColor"
        stroke="none"
    />
)

export const VkColorIcon = makeBrandIcon(
    'VkColorIcon',
    <path
        d="M6.1 8.35h2.1c.08 4 1.85 5.7 2.41 6.04V8.35h1.98v3.45c.55-.06 2.25-1.7 2.45-3.45h1.97c-.15 1.14-.82 2.3-1.44 3.07-.8 1-1.16 1.38-1.13 1.7.03.36.44.69 1.06 1.3.82.8 1.48 1.5 1.64 2.23h-2.18c-.23-.65-.98-1.6-1.57-2.17-.43-.42-.63-.54-.8-.54-.22 0-.26.12-.26.73v1.98H11.8c-3.96 0-6.22-2.72-6.35-8.33z"
        fill="#0077ff"
        stroke="none"
    />
)
