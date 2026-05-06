import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagKrIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagKrIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <circle cx="12" cy="12" r="2.7" fill="#cd2e3a" stroke="none" />
            <path
                d="M9.3 12a2.7 2.7 0 0 1 5.4 0a1.35 1.35 0 0 1-2.7 0a1.35 1.35 0 0 0-2.7 0z"
                fill="#0047a0"
                stroke="none"
            />
            <path d="M5.5 8h1.6M5.5 8.7h1.6M5.5 9.4h1.6" stroke="#111" strokeWidth="0.35" strokeLinecap="round" />
            <path d="M17 8h1.6M17 9.4h1.6M17 8.7h0.65M17.95 8.7h0.65" stroke="#111" strokeWidth="0.35" strokeLinecap="round" />
            <path
                d="M5.5 14.6h0.65M6.45 14.6h0.65M5.5 15.3h1.6M5.5 16h0.65M6.45 16h0.65"
                stroke="#111"
                strokeWidth="0.35"
                strokeLinecap="round"
            />
            <path
                d="M17 14.6h0.65M17.95 14.6h0.65M17 15.3h0.65M17.95 15.3h0.65M17 16h0.65M17.95 16h0.65"
                stroke="#111"
                strokeWidth="0.35"
                strokeLinecap="round"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
