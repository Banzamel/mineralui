import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ExternalLinkIcon = forwardRef<SVGSVGElement, IconProps>(function ExternalLinkIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M9 8.5h-2.5A2.5 2.5 0 0 0 4 11v7a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 16 18v-2.5" />
            <path d="M11 4h9v9" />
            <path d="M20 4 10.75 13.25" />
        </Icon>
    )
})
