import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagAuIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagAuIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#012169" stroke="none" />
            <path d="M3.5 5L11 11.5M11 5L3.5 11.5" stroke="#f8fafc" strokeWidth="0.6" />
            <path d="M7.25 5v6.5M3.5 8h7.5" stroke="#f8fafc" strokeWidth="1.4" />
            <path d="M7.25 5v6.5M3.5 8h7.5" stroke="#c8102e" strokeWidth="0.7" />
            <circle cx="7.25" cy="13.5" r="0.55" fill="#f8fafc" />
            <circle cx="14" cy="9" r="0.45" fill="#f8fafc" />
            <circle cx="17" cy="10" r="0.4" fill="#f8fafc" />
            <circle cx="15" cy="12" r="0.4" fill="#f8fafc" />
            <circle cx="17.5" cy="13.5" r="0.4" fill="#f8fafc" />
            <circle cx="13.5" cy="14.5" r="0.4" fill="#f8fafc" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
