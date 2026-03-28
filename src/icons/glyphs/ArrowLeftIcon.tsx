import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ArrowLeftIcon = forwardRef<SVGSVGElement, IconProps>(function ArrowLeftIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M19 12H5" />
            <path d="M10.5 6.5L5 12l5.5 5.5" />
        </Icon>
    )
})
