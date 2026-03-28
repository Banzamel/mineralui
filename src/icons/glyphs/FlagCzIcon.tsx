import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagCzIcon = forwardRef<SVGSVGElement, IconProps>(function FlagCzIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <path d="M3.5 12h17v4.5A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" fill="#dc2626" stroke="none" />
            <path d="M3.5 5l8.25 7-8.25 7z" fill="#2563eb" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
