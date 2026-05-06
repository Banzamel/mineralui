import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MPrinterIcon = forwardRef<SVGSVGElement, MIconProps>(function MPrinterIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M6.5 9V4.5h11V9" />
            <path d="M6.5 17H5a1.5 1.5 0 0 1-1.5-1.5v-5A1.5 1.5 0 0 1 5 9h14a1.5 1.5 0 0 1 1.5 1.5v5A1.5 1.5 0 0 1 19 17h-1.5" />
            <rect x="6.5" y="14" width="11" height="5.5" rx="0.5" />
            <circle cx="17" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
        </MIcon>
    )
})
