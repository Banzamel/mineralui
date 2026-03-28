import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>(function ChevronRightIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
        </Icon>
    )
})
