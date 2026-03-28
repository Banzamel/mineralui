import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const EllipsisVerticalIcon = forwardRef<SVGSVGElement, IconProps>(function EllipsisVerticalIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <circle cx="12" cy="6" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
            <circle cx="12" cy="18" r="1.8" fill="currentColor" stroke="none" />
        </Icon>
    )
})
