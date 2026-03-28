import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const NeutralIcon = forwardRef<SVGSVGElement, IconProps>(function NeutralIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M8.5 12h7" />
        </Icon>
    )
})
