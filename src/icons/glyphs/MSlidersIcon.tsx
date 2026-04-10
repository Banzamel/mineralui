import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MSlidersIcon = forwardRef<SVGSVGElement, MIconProps>(function MSlidersIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <path d="M7 4v16M12 4v16M17 4v16" />
            <rect x="5.25" y="6.5" width="3.5" height="3" rx="1.5" />
            <rect x="10.25" y="11" width="3.5" height="3" rx="1.5" />
            <rect x="15.25" y="7.5" width="3.5" height="3" rx="1.5" />
        </MIcon>
    )
})
