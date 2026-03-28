import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ZoomInIcon = forwardRef<SVGSVGElement, IconProps>(function ZoomInIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="10.5" cy="10.5" r="5.75" />
            <path d="M10.5 8v5M8 10.5h5" />
            <path d="M15.25 15.25L19.5 19.5" />
        </Icon>
    )
})
