import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ClockIcon = forwardRef<SVGSVGElement, IconProps>(function ClockIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3.5 2" />
        </Icon>
    )
})
