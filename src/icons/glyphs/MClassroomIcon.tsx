import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MClassroomIcon = forwardRef<SVGSVGElement, MIconProps>(function MClassroomIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3" y="3.5" width="18" height="17" rx="0.5" />
            <rect x="7" y="3.5" width="10" height="2" fill="currentColor" stroke="none" />
            <circle cx="8" cy="11" r="1" />
            <circle cx="12" cy="11" r="1" />
            <circle cx="16" cy="11" r="1" />
            <circle cx="8" cy="16" r="1" />
            <circle cx="12" cy="16" r="1" />
            <circle cx="16" cy="16" r="1" />
        </MIcon>
    )
})
