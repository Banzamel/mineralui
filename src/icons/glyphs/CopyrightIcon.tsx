import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const CopyrightIcon = forwardRef<SVGSVGElement, IconProps>(function CopyrightIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M14.8 9.5a3.35 3.35 0 1 0 0 5" />
        </Icon>
    )
})
