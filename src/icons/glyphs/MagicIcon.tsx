import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const MagicIcon = forwardRef<SVGSVGElement, IconProps>(function MagicIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6 18L18 6" />
            <path d="M14.5 5.5h3M16 4v3" />
            <path d="M6.5 8h2.5M7.75 6.75v2.5" />
            <path d="M15.25 15.25h2.5M16.5 14v2.5" />
        </Icon>
    )
})
