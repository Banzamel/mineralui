import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MCalendarIcon = forwardRef<SVGSVGElement, MIconProps>(function MCalendarIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
            <path d="M7.5 3.5v3" />
            <path d="M16.5 3.5v3" />
            <path d="M3.5 9.5h17" />
            <path d="M8 13h.01" />
            <path d="M12 13h.01" />
            <path d="M16 13h.01" />
        </MIcon>
    )
})
