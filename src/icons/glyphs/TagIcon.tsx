import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const TagIcon = forwardRef<SVGSVGElement, IconProps>(function TagIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M11 4.5h6.5l2 2v6.5L10 22.5 1.5 14z" />
            <circle cx="15.25" cy="8.75" r="1" />
        </Icon>
    )
})
