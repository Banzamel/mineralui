import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ErrorIcon = forwardRef<SVGSVGElement, IconProps>(function ErrorIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M9 9l6 6" />
            <path d="M15 9l-6 6" />
        </Icon>
    )
})
