import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CheckCircleIcon = forwardRef<SVGSVGElement, IconProps>(function CheckCircleIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.25" />
            <path d="m8.5 12 2.25 2.25L15.6 9.4" />
        </Icon>
    )
})
