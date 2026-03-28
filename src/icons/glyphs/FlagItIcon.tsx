import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagItIcon = forwardRef<SVGSVGElement, IconProps>(function FlagItIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <path d="M3.5 5h5.65v14H6A2.5 2.5 0 0 1 3.5 16.5z" fill="#16a34a" stroke="none" />
            <path d="M14.85 5h5.65v11.5A2.5 2.5 0 0 1 18 19h-3.15z" fill="#dc2626" stroke="none" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
