import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DeviceMonitorIcon = forwardRef<SVGSVGElement, IconProps>(function DeviceMonitorIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4.25" y="5" width="15.5" height="10.5" rx="1.8" />
            <path d="M12 15.5v3.1M9 19.1h6" />
            <path d="M6.6 7.4h10.8v5.7H6.6z" />
        </Icon>
    )
})
