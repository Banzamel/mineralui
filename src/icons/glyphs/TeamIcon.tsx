import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const TeamIcon = forwardRef<SVGSVGElement, IconProps>(function TeamIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="9" r="3" />
            <circle cx="6.75" cy="10.1" r="2" />
            <circle cx="17.25" cy="10.1" r="2" />
            <path d="M7.75 18.5c0-2.8 1.8-4.5 4.25-4.5s4.25 1.7 4.25 4.5" />
            <path d="M3.75 18c0-1.95 1.25-3.2 3.05-3.2.8 0 1.45.2 2.05.65" />
            <path d="M15.15 15.45c.6-.45 1.25-.65 2.05-.65 1.8 0 3.05 1.25 3.05 3.2" />
        </Icon>
    )
})
