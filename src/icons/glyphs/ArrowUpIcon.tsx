import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>(function ArrowUpIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 19V5" />
            <path d="M6.5 10.5L12 5l5.5 5.5" />
        </Icon>
    )
})
