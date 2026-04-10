import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MInfoIcon = forwardRef<SVGSVGElement, MIconProps>(function MInfoIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 10.5v5" />
            <path d="M12 7.5h.01" />
        </MIcon>
    )
})
