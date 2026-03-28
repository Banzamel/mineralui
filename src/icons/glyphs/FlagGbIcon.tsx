import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagGbIcon = forwardRef<SVGSVGElement, IconProps>(function FlagGbIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#1e3a8a" stroke="none" />
            <path
                d="M4.2 6l6.1 5.05M19.8 6l-6.1 5.05M4.2 18l6.1-5.05M19.8 18l-6.1-5.05"
                stroke="#f8fafc"
                strokeWidth="2.3"
            />
            <path d="M4.2 6l6.1 5.05M19.8 6l-6.1 5.05M4.2 18l6.1-5.05M19.8 18l-6.1-5.05" stroke="#dc2626" />
            <path d="M12 5v14M3.5 12h17" stroke="#f8fafc" strokeWidth="3.3" />
            <path d="M12 5v14M3.5 12h17" stroke="#dc2626" strokeWidth="1.8" />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
