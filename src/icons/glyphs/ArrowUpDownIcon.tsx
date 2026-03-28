import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ArrowUpDownIcon = forwardRef<SVGSVGElement, IconProps>(function ArrowUpDownIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M8.5 8.5L12 5l3.5 3.5" />
            <path d="M8.5 15.5L12 19l3.5-3.5" />
        </Icon>
    )
})
