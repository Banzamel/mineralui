import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagSkIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagSkIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <path d="M3.5 9.65h17v4.7h-17z" fill="#2563eb" stroke="none" />
            <path d="M3.5 14.35h17v4.65A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" fill="#dc2626" stroke="none" />
            <path
                d="M7.1 8.8h2.55a1 1 0 0 1 1 1v2.75a2.25 2.25 0 0 1-1.3 2.05L8.4 15l-.95-.4a2.25 2.25 0 0 1-1.35-2.05V9.8a1 1 0 0 1 1-1z"
                fill="#f8fafc"
                stroke="none"
            />
            <path d="M8.4 9.7v3.8M7.2 11.05h2.4M6.95 12.3h2.9" stroke="#dc2626" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
