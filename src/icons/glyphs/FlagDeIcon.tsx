import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagDeIcon = forwardRef<SVGSVGElement, IconProps>(function FlagDeIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#111827" stroke="none" />
            <path d="M3.5 9.65h17v4.7h-17z" fill="#dc2626" stroke="none" />
            <path d="M3.5 14.35h17v4.65A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" fill="#f59e0b" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
