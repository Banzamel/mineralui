import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const WindowIcon = forwardRef<SVGSVGElement, IconProps>(function WindowIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4" y="5" width="16" height="14" rx="2.5" />
            <path d="M4 8.75h16" />
            <path d="M7 6.9h.01M9.3 6.9h.01M11.6 6.9h.01" strokeWidth="2.2" />
        </Icon>
    )
})
