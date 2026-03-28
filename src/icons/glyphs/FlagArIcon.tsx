import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagArIcon = forwardRef<SVGSVGElement, IconProps>(function FlagArIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#7dd3fc" stroke="none" />
            <path d="M3.5 9.65h17v4.7h-17z" fill="#f8fafc" stroke="none" />
            <path d="M12 12h.01" stroke="#f59e0b" strokeWidth="2.2" />
            <path
                d="M12 10.4v.55M12 13.05v.55M10.55 12h.55M12.9 12h.55M11 11l.35.35M12.65 12.65l.35.35M13 11l-.35.35M11.35 12.65l-.35.35"
                stroke="#f59e0b"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
