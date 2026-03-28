import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const StarIcon = forwardRef<SVGSVGElement, IconProps>(function StarIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 4.25l2.45 4.96 5.47.79-3.96 3.86.93 5.46L12 16.9l-4.89 2.42.93-5.46L4.08 10l5.47-.79L12 4.25z" />
        </Icon>
    )
})
