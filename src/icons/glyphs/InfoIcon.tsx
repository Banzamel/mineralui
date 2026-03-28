import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const InfoIcon = forwardRef<SVGSVGElement, IconProps>(function InfoIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 10.5v5" />
            <path d="M12 7.5h.01" />
        </Icon>
    )
})
