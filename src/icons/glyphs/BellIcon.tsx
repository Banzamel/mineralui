import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const BellIcon = forwardRef<SVGSVGElement, IconProps>(function BellIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M8.2 15.9V10.7a3.8 3.8 0 1 1 7.6 0v5.2" />
            <path d="M6.75 16h10.5" />
            <path d="M10.6 18.35a1.4 1.4 0 0 0 2.8 0" />
            <path d="M11.35 5.2h1.3" />
            <path d="M5.1 9.4c.2-1 .65-1.95 1.25-2.7M18.9 9.4c-.2-1-.65-1.95-1.25-2.7" />
        </Icon>
    )
})
