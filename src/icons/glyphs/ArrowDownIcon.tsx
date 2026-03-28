import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>(function ArrowDownIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M12 5v14" />
            <path d="M6.5 13.5L12 19l5.5-5.5" />
        </Icon>
    )
})
