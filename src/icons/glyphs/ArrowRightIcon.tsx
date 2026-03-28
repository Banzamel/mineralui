import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ArrowRightIcon = forwardRef<SVGSVGElement, IconProps>(function ArrowRightIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M5 12h14" />
            <path d="M13.5 6.5L19 12l-5.5 5.5" />
        </Icon>
    )
})
