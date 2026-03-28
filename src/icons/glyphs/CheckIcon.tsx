import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CheckIcon = forwardRef<SVGSVGElement, IconProps>(function CheckIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M5.5 12.5l4.25 4.25L18.5 8" />
        </Icon>
    )
})
