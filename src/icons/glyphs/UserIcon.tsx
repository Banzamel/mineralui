import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const UserIcon = forwardRef<SVGSVGElement, IconProps>(function UserIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.5 19c0-3.75 3.2-6 7.5-6s7.5 2.25 7.5 6" />
            <path d="M9.25 7.5h5.5" />
        </Icon>
    )
})
