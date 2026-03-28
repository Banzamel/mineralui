import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const LinkIcon = forwardRef<SVGSVGElement, IconProps>(function LinkIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="m9.35 14.65-1.2 1.2a4.1 4.1 0 1 1-5.8-5.8l3.2-3.2a4.1 4.1 0 0 1 5.8 0l.95.95" />
            <path d="m14.65 9.35 1.2-1.2a4.1 4.1 0 1 1 5.8 5.8l-3.2 3.2a4.1 4.1 0 0 1-5.8 0l-.95-.95" />
            <path d="M9.25 14.75 14.75 9.25" />
            <path d="M11 8.25v-1.4M11 17.15v-1.4M8.25 11H6.85M17.15 11H15.75" />
        </Icon>
    )
})
