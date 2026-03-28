import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const Signal2Icon = forwardRef<SVGSVGElement, IconProps>(function Signal2Icon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
            <path d="M11 13.5v6" />
        </Icon>
    )
})
