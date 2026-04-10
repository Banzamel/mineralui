import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MClockIcon = forwardRef<SVGSVGElement, MIconProps>(function MClockIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3.5 2" />
        </MIcon>
    )
})
