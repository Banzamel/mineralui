import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDashboardIcon = forwardRef<SVGSVGElement, MIconProps>(function MDashboardIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4.2" y="4.2" width="6.2" height="6.2" rx="1.6" />
            <rect x="13.6" y="4.2" width="6.2" height="9.3" rx="1.6" />
            <rect x="4.2" y="13.6" width="9.3" height="6.2" rx="1.6" />
            <rect x="16.7" y="16.7" width="3.1" height="3.1" rx="1.1" />
        </MIcon>
    )
})
