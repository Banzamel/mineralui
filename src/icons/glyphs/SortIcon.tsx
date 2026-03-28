import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SortIcon = forwardRef<SVGSVGElement, IconProps>(function SortIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M10 6h8" />
            <path d="M10 11h5" />
            <path d="M10 16h3" />
            <path d="M5 5v12" />
            <path d="M3.5 15.5L5 17l1.5-1.5" />
            <path d="M3.5 6.5L5 5l1.5 1.5" />
        </Icon>
    )
})
