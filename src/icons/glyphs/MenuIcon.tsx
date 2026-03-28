import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const MenuIcon = forwardRef<SVGSVGElement, IconProps>(function MenuIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M5 7h14" />
            <path d="M5 12h10" />
            <path d="M5 17h14" />
            <path d="M17.5 12h1.5" />
        </Icon>
    )
})
