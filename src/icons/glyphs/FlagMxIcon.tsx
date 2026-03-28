import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagMxIcon = forwardRef<SVGSVGElement, IconProps>(function FlagMxIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#16a34a" stroke="none" />
            <path d="M9.15 5h5.7v14h-5.7z" fill="#f8fafc" stroke="none" />
            <path d="M14.85 5h5.65v11.5A2.5 2.5 0 0 1 18 19h-3.15z" fill="#dc2626" stroke="none" />
            <circle cx="12" cy="12" r="1" fill="none" stroke="#a16207" />
            <path d="M11.15 12.9c.55.35 1.15.35 1.7 0" stroke="#16a34a" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
