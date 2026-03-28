import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SidebarIcon = forwardRef<SVGSVGElement, IconProps>(function SidebarIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <path d="M8.5 4v16" />
            <path d="M5.5 8h1.5M5.5 11.5h1.5M5.5 15h1.5" />
            <path d="M11 8h6M11 12h4.5M11 16h5.5" />
        </Icon>
    )
})
