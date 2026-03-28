import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CameraIcon = forwardRef<SVGSVGElement, IconProps>(function CameraIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7.25 7.5l1.2-2h7.1l1.2 2H18a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Z" />
            <circle cx="12" cy="13" r="3.1" />
        </Icon>
    )
})
