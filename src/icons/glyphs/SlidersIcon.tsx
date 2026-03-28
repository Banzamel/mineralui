import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SlidersIcon = forwardRef<SVGSVGElement, IconProps>(function SlidersIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7 4v16M12 4v16M17 4v16" />
            <rect x="5.25" y="6.5" width="3.5" height="3" rx="1.5" />
            <rect x="10.25" y="11" width="3.5" height="3" rx="1.5" />
            <rect x="15.25" y="7.5" width="3.5" height="3" rx="1.5" />
        </Icon>
    )
})
