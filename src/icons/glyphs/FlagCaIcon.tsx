import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FlagCaIcon = forwardRef<SVGSVGElement, IconProps>(function FlagCaIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="#f8fafc" stroke="none" />
            <path
                d="M3.5 5h3.55v14H6a2.5 2.5 0 0 1-2.5-2.5zM16.95 5h3.55v11.5A2.5 2.5 0 0 1 18 19h-1.05z"
                fill="#dc2626"
                stroke="none"
            />
            <path
                d="M12 8.55l.45 1.25 1.1-.45-.55 1.1 1.15.45h-1.1l.4 1.4-1.45-.7v2.25h-.01v-2.25l-1.45.7.4-1.4h-1.1l1.15-.45-.55-1.1 1.1.45z"
                fill="#dc2626"
                stroke="none"
            />
            <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        </Icon>
    )
})
