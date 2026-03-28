import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>(function ChevronLeftIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M14.5 6.5L9 12l5.5 5.5" />
        </Icon>
    )
})
