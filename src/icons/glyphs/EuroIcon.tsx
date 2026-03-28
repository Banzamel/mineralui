import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const EuroIcon = forwardRef<SVGSVGElement, IconProps>(function EuroIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M16.3 6.9c-1.05-.95-2.35-1.45-3.95-1.45-2.65 0-4.7 1.55-5.7 4.05" />
            <path d="M6.15 10.2h7.1M5.6 13.35h7.1" />
            <path d="M6.65 14.05c1 2.45 3 3.95 5.65 3.95 1.65 0 2.95-.5 4-1.5" />
        </Icon>
    )
})
