import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const FilterIcon = forwardRef<SVGSVGElement, IconProps>(function FilterIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M4 6h16L14 12.5v5l-4 2v-7L4 6z" />
            <path d="M8 6h8" />
        </Icon>
    )
})
