import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const HelpIcon = forwardRef<SVGSVGElement, IconProps>(function HelpIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.15" />
            <path d="M9.4 9.2a2.76 2.76 0 0 1 5.2 1.25c0 1.6-1.45 2.15-2.15 2.7-.52.4-.78.77-.78 1.6" />
            <circle cx="11.67" cy="17.3" r="0.7" fill="currentColor" stroke="none" />
        </Icon>
    )
})
