import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MFlagTrIcon = forwardRef<SVGSVGElement, MIconProps>(function MFlagTrIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#e30a17" stroke="none" />
            <circle cx="10.5" cy="12" r="2.5" fill="#f8fafc" stroke="none" />
            <circle cx="11.3" cy="12" r="2" fill="#e30a17" stroke="none" />
            <path
                d="M14.6 10.1l0.55 1.13 1.25 0.18-0.9 0.88 0.21 1.24-1.11-0.59-1.11 0.59 0.21-1.24-0.9-0.88 1.25-0.18z"
                fill="#f8fafc"
                stroke="none"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </MIcon>
    )
})
