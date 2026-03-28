import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SuccessIcon = forwardRef<SVGSVGElement, IconProps>(function SuccessIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.5 12.25l2.5 2.5 4.75-5" />
        </Icon>
    )
})
