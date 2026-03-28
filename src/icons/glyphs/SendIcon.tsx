import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const SendIcon = forwardRef<SVGSVGElement, IconProps>(function SendIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M4.5 11.5l14-6-4.75 13-2.35-4.65z" />
            <path d="M11.4 13.85l7.1-8.35" />
        </Icon>
    )
})
