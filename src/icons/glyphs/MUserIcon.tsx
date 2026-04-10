import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MUserIcon = forwardRef<SVGSVGElement, MIconProps>(function MUserIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.5 19c0-3.75 3.2-6 7.5-6s7.5 2.25 7.5 6" />
            <path d="M9.25 7.5h5.5" />
        </MIcon>
    )
})
