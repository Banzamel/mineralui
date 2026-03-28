import {forwardRef} from 'react'
import {Icon} from '../Icon'
import type {IconProps} from '../Icon.types'

export const MinusIcon = forwardRef<SVGSVGElement, IconProps>(function MinusIcon(props, ref) {
    return (
        <Icon ref={ref} {...props}>
            <path d="M5 12h14" />
        </Icon>
    )
})
