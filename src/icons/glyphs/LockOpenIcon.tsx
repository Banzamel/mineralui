import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const LockOpenIcon = forwardRef<SVGSVGElement, IconProps>(function LockOpenIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="4.75" y="10.5" width="13.5" height="8.75" rx="2.25" />
            <path d="M12.75 10.5V6.75a3.75 3.75 0 1 1 7.5 0v3.5" />
            <path d="M11.5 13.75v2.25" />
        </Icon>
    )
})
