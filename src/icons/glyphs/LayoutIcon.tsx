import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const LayoutIcon = forwardRef<SVGSVGElement, IconProps>(function LayoutIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="M9 5v14" />
            <path d="M9 10.25h11" />
        </Icon>
    )
})
