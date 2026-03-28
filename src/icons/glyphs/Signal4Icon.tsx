import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const Signal4Icon = forwardRef<SVGSVGElement, IconProps>(function Signal4Icon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
            <path d="M11 13.5v6" />
            <path d="M14.5 10.5v9" />
            <path d="M18 7.5v12" />
        </Icon>
    )
})
