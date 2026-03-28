import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CopyIcon = forwardRef<SVGSVGElement, IconProps>(function CopyIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="8.85" y="8.2" width="8.85" height="9.3" rx="1.55" />
            <rect x="6.3" y="5.4" width="8.85" height="9.3" rx="1.55" />
            <path d="M10.2 10.05h4.2" />
            <path d="M9.15 11.95l1.05-1.9 1.05 1.9" />
        </Icon>
    )
})
