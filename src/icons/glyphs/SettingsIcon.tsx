import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SettingsIcon = forwardRef<SVGSVGElement, IconProps>(function SettingsIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="2.75" />
            <circle cx="15.75" cy="8.75" r="1.85" />
            <circle cx="10.25" cy="15.25" r="1.85" />
            <path d="M17.6 8.75h2.15M7.75 8.75h6.15" />
            <path d="M12.1 15.25h7.65M4.25 15.25h4.15" />
        </Icon>
    )
})
