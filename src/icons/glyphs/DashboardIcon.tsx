import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DashboardIcon = forwardRef<SVGSVGElement, IconProps>(function DashboardIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4.2" y="4.2" width="6.2" height="6.2" rx="1.6" />
            <rect x="13.6" y="4.2" width="6.2" height="9.3" rx="1.6" />
            <rect x="4.2" y="13.6" width="9.3" height="6.2" rx="1.6" />
            <rect x="16.7" y="16.7" width="3.1" height="3.1" rx="1.1" />
        </Icon>
    )
})
