import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const GlobeIcon = forwardRef<SVGSVGElement, IconProps>(function GlobeIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.8 12h16.4" />
            <path d="M12 3.5c2.5 2.4 4 5.3 4 8.5s-1.5 6.1-4 8.5c-2.5-2.4-4-5.3-4-8.5s1.5-6.1 4-8.5z" />
        </Icon>
    )
})
