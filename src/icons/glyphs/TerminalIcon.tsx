import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const TerminalIcon = forwardRef<SVGSVGElement, IconProps>(function TerminalIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="M7 9l3 3-3 3" />
            <path d="M11.5 14.5H16" />
        </Icon>
    )
})
