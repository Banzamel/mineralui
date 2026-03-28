import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const Signal1Icon = forwardRef<SVGSVGElement, IconProps>(function Signal1Icon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M7.5 16.5v3" />
        </Icon>
    )
})
