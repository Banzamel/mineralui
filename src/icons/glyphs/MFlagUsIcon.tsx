import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagUsIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagUsIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <path
                d="M3.5 6.4h17v1.1h-17zM3.5 8.55h17v1.1h-17zM3.5 10.7h17v1.1h-17zM3.5 12.85h17v1.1h-17zM3.5 15h17v1.1h-17zM3.5 17.15h17v1.1H6a2.5 2.5 0 0 1-2.5-1.1z"
                fill="#dc2626"
                stroke="none"
            />
            <path d="M3.5 5h7.3v7.1H3.5z" fill="#1d4ed8" stroke="none" />
            <path
                d="M5.3 7.2h.01M7 7.2h.01M8.7 7.2h.01M6.15 8.8h.01M7.85 8.8h.01M5.3 10.35h.01M7 10.35h.01M8.7 10.35h.01"
                stroke="#f8fafc"
                strokeWidth="1.5"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
