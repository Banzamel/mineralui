import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MIdCardIcon = forwardRef<SVGSVGElement, MIconProps>(function MIdCardIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="6" width="18" height="12" rx="2.5" />
            <circle cx="8.4" cy="10.8" r="2" />
            <path d="M5.9 15c.7-1.25 1.85-1.95 3.25-1.95s2.55.7 3.25 1.95" />
            <path d="M13.5 10h4M13.5 13h4" />
        </MIcon>
    )
})
