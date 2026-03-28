import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const WarningIcon = forwardRef<SVGSVGElement, IconProps>(function WarningIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 4l8 14H4l8-14z" />
            <path d="M12 9v4.5" />
            <path d="M12 16.5h.01" />
        </Icon>
    )
})
