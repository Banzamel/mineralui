import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagInIcon = forwardRef<SVGSVGElement, IconProps>(function FlagInIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f59e0b" stroke="none" />
            <path d="M3.5 9.65h17v4.7h-17z" fill="#f8fafc" stroke="none" />
            <path d="M3.5 14.35h17v2.15A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" fill="#16a34a" stroke="none" />
            <circle cx="12" cy="12" r="1.15" fill="none" stroke="#1d4ed8" />
            <path
                d="M12 10.85v2.3M10.85 12h2.3M11.2 11.2l1.6 1.6M12.8 11.2l-1.6 1.6"
                stroke="#1d4ed8"
                strokeWidth="0.9"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
