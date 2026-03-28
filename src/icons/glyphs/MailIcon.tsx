import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const MailIcon = forwardRef<SVGSVGElement, IconProps>(function MailIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <rect x="3.5" y="6" width="17" height="12" rx="3" />
            <path d="M4.5 7.5L12 13l7.5-5.5" />
        </Icon>
    )
})
