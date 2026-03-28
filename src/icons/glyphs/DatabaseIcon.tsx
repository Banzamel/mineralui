import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const DatabaseIcon = forwardRef<SVGSVGElement, IconProps>(function DatabaseIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <ellipse cx="12" cy="6.75" rx="6.25" ry="2.25" />
            <path d="M5.75 6.75v5.25c0 1.25 2.8 2.25 6.25 2.25s6.25-1 6.25-2.25V6.75" />
            <path d="M5.75 12v5.25c0 1.25 2.8 2.25 6.25 2.25s6.25-1 6.25-2.25V12" />
        </Icon>
    )
})
