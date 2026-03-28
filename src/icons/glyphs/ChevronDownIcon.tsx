import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>(function ChevronDownIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M6.5 9.5L12 15l5.5-5.5" />
        </Icon>
    )
})
