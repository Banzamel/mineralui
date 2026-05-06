import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUserPlusIcon = forwardRef<SVGSVGElement, MIconProps>(function MUserPlusIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="9.5" cy="8" r="3.25" />
            <path d="M3.5 19c0-3.45 2.7-5.75 6-5.75 1.3 0 2.5 0.3 3.5 0.85" />
            <path d="M17.5 14v6" />
            <path d="M14.5 17h6" />
        </MIcon>
    )
})
