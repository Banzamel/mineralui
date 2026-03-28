import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DeviceTabletIcon = forwardRef<SVGSVGElement, IconProps>(function DeviceTabletIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="5.75" y="3.25" width="12.5" height="17.5" rx="2.2" />
            <path d="M10.35 5.8h3.3M12 17.85h.01" />
            <rect x="7.85" y="7.15" width="8.3" height="8.2" rx="0.9" />
        </Icon>
    )
})
