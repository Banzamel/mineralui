import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const EllipsisHorizontalIcon = forwardRef<SVGSVGElement, IconProps>(function EllipsisHorizontalIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="6" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="18" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </Icon>
    )
})

export const MoreIcon = EllipsisHorizontalIcon
