import {forwardRef} from 'react'
import {MIcon} from '../MIcon'
import type {MIconProps} from '../MIcon.types'

export const MDeviceMonitorIcon = forwardRef<SVGSVGElement, MIconProps>(function MDeviceMonitorIcon(props, ref) {
    return (
        <MIcon ref={ref} {...props}>
            <rect x="4.25" y="5" width="15.5" height="10.5" rx="1.8" />
            <path d="M12 15.5v3.1M9 19.1h6" />
            <path d="M6.6 7.4h10.8v5.7H6.6z" />
        </MIcon>
    )
})
