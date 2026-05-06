import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MMakeupIcon = forwardRef<SVGSVGElement, MIconProps>(function MMakeupIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="5" y="3.5" width="14" height="9" rx="0.5" />
            <path d="M3.5 12.5h17" />
            <path d="M5 12.5v7.5" />
            <path d="M19 12.5v7.5" />
            <path d="M5 16.5h14" />
            <circle cx="12" cy="18.25" r="0.5" fill="currentColor" stroke="none" />
        </MIcon>
    )
})
