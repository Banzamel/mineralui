import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUsersIcon = forwardRef<SVGSVGElement, MIconProps>(function MUsersIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="15.5" cy="8.25" r="3.25" />
            <path d="M10.75 19c0-3.15 2.2-5.1 5.25-5.1s5.25 1.95 5.25 5.1" />
            <circle cx="8" cy="9.25" r="2.5" />
            <path d="M2.75 18.5c0-2.5 1.85-4.15 4.4-4.15 1.15 0 2.05.25 2.85.8" />
            <path d="M13.2 7.75h4.6" />
            <path d="M6.3 8.9h3.4" />
        </MIcon>
    )
})
