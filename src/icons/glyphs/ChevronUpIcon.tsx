import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>(function ChevronUpIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6.5 14.5L12 9l5.5 5.5" />
        </Icon>
    )
})
